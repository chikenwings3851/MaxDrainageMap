const { app, BrowserWindow, dialog, shell } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

// The official Ontario AgMaps viewer issues a fresh access token automatically
// within seconds of loading, no login and no click required (verified by
// watching its network traffic directly). We load it in an invisible window,
// grab the token from the first request it fires against arcgis4 (the same
// server our app's PARCEL_URL/AIA_URL use), then feed it straight into the
// visible app window via the agmapsTokenUpdated event it already listens for.
const AGMAPS_VIEWER_URL = 'https://www.lioapplications.lrc.gov.on.ca/AgMaps/Index.html?viewer=AgMaps.AgMaps&locale=en-CA';
const TOKEN_REFRESH_MS = 50 * 60 * 1000; // refresh 10 min before the ~60min token expiry
let mainWindow = null;

function fetchAgMapsToken(onToken) {
  const probe = new BrowserWindow({
    show: false,
    webPreferences: { offscreen: true },
  });
  let done = false;
  const finish = (token) => {
    if (done) return;
    done = true;
    probe.webContents.session.webRequest.onBeforeRequest(null); // clear filter
    if (!probe.isDestroyed()) probe.destroy();
    onToken(token);
  };

  probe.webContents.session.webRequest.onBeforeRequest(
    { urls: ['*://ws.lioservices.lrc.gov.on.ca/arcgis4/*'] },
    (details, callback) => {
      callback({});
      if (done) return;
      const m = details.url.match(/[?&]token=([^&]+)/);
      if (m) finish(decodeURIComponent(m[1]));
    }
  );

  probe.loadURL(AGMAPS_VIEWER_URL).catch(() => finish(null));
  setTimeout(() => finish(null), 20000); // give up gracefully if nothing shows up
}

function applyTokenToApp(token) {
  if (!token || !mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.executeJavaScript(
    `window.dispatchEvent(new CustomEvent('agmapsTokenUpdated', { detail: { token: ${JSON.stringify(token)} } }));`
  ).catch(() => {});
}

// Three ways this wrapper can find the app, checked in order: (1) Max's personal
// live-update copy, so he can update the app by just overwriting one file, no
// rebuild; (2) a sibling `data/MaxDrainageMap.html` one level up — this is what
// resolves for anyone who clones the GitHub repo and runs `npm start` from
// `electron/`, without needing a second copy of the (large) HTML file checked
// into git; (3) the copy bundled inside `app/`, only present in a packaged
// standalone build sent to someone with neither of the above.
const PERSONAL_HTML_PATH = path.join(os.homedir(), 'OneDrive', 'DrainageMapApp', 'data', 'MaxDrainageMap.html');
const REPO_HTML_PATH = path.join(__dirname, '..', 'data', 'MaxDrainageMap.html');
const BUNDLED_HTML_PATH = path.join(__dirname, 'app', 'MaxDrainageMap.html');
const HTML_PATH = fs.existsSync(PERSONAL_HTML_PATH) ? PERSONAL_HTML_PATH
  : fs.existsSync(REPO_HTML_PATH) ? REPO_HTML_PATH
  : BUNDLED_HTML_PATH;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, 'icon.ico'),
    title: "Max's Drainage Map",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  mainWindow = win;

  if (!fs.existsSync(HTML_PATH)) {
    dialog.showErrorBox(
      'Drainage Map file not found',
      `Expected the app file at one of:\n${PERSONAL_HTML_PATH}\n${REPO_HTML_PATH}\n${BUNDLED_HTML_PATH}\n\nReinstall the app, or copy MaxDrainageMap.html to one of those locations and relaunch.`
    );
  }

  win.loadFile(HTML_PATH);

  // Grab a fresh AgMaps token automatically as soon as the app is up, then
  // keep quietly refreshing it in the background so it never expires on Max.
  // The "paste your token" onboarding modal is redundant in the desktop app
  // now, so dismiss it immediately (still appears if the raw HTML is opened
  // directly in a plain browser, which has no auto-capture to rely on).
  win.webContents.once('did-finish-load', () => {
    win.webContents.executeJavaScript(`if (typeof dismissToken === 'function') dismissToken();`).catch(() => {});
    fetchAgMapsToken(applyTokenToApp);
  });
  if (!global._tokenRefreshTimer) {
    global._tokenRefreshTimer = setInterval(() => fetchAgMapsToken(applyTokenToApp), TOKEN_REFRESH_MS);
  }

  // Route external links (e.g. ontario.ca/agmaps) to the real browser, not a new Electron window
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  // Native Save-As dialog for every export (DXF/XLS/TIFF/CSV all use blob + <a download>)
  win.webContents.session.on('will-download', (event, item) => {
    const suggested = item.getFilename();
    const savePath = dialog.showSaveDialogSync(win, {
      defaultPath: path.join(app.getPath('downloads'), suggested),
    });
    if (!savePath) {
      item.cancel();
      return;
    }
    item.setSavePath(savePath);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
