import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const store = new Store();

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // En desarrollo, carga desde el servidor Vite
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers para operaciones de base de datos
ipcMain.handle('save-invoice', async (event, invoice) => {
  // Implementación de guardado de factura
  return { success: true };
});

// Manejadores para la base de datos SQLite
ipcMain.handle('db-query', async (event, { query, params }) => {
  // Implementación de consultas a la base de datos
  return { success: true };
});