import {
    app,
    BrowserWindow,
    Menu,
    shell,
    ipcMain,
    IpcMainEvent,
} from 'electron';
import log from 'electron-log';
import { exec } from 'child_process';
import path from 'node:path';
import { checkUpdate } from './app-version';
import electronReloader from 'electron-reloader';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

// 禁用菜单，一般情况下，不需要禁用
Menu.setApplicationMenu(null);

// 代码热更新
try {
    electronReloader(module);
} catch (_) {
    console.log('electron-reloader error');
}

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 760,
        icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send(
            'main-process-message',
            new Date().toLocaleString(),
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'));
    }

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.env.NODE_ENV !== 'development') {
        closeServer();
    }
    if (process.platform !== 'darwin') {
        app.quit();
        win = null;
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 默认浏览器打开链接
app.on('web-contents-created', (_e, webContents) => {
    webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
});

app.whenReady().then(() => {
    if (process.env.NODE_ENV !== 'development') {
        startServer();
    } else {
        // 设置控制台语言
        const url = path.join(__dirname, 'setting.bat');
        console.log(url);
        exec(url, (err: any, stdout: any) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    }
    createWindow();
});

const startServer = () => {
    const batPath = path.resolve(app.getAppPath(), '../server/start.bat');
    const workerProcess = exec(batPath);
    // 打印正常的后台可执行程序输出
    workerProcess.stdout?.on('data', function (data) {
        log.info('start stdout: ', data);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr?.on('data', function (data) {
        log.error('start stderr: ', data);
    });

    // 退出之后的输出
    workerProcess.on('close', function (code) {
        log.info('start out code：', code);
    });
};

const closeServer = () => {
    const batPath = path.resolve(app.getAppPath(), '../server/stop.bat');
    const workerProcess = exec(batPath);
    // 打印正常的后台可执行程序输出
    workerProcess.stdout?.on('data', function (data) {
        log.info('stdout: ', data);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr?.on('data', function (data) {
        log.error('stderr: ', data);
    });

    // 退出之后的输出
    workerProcess.on('close', function (code) {
        log.info('out code：', code);
    });
};

/**
 * 版本更新检测
 */
ipcMain.handle('check-update', (e: any) => {
    // 获取发送通知的渲染进程窗口
    const currentWin = getWindowByEvent(e);
    // 升级校验
    checkUpdate(currentWin);
});

/**
 * 通过窗口事件获取发送者的窗口
 * @param event ipc发送窗口事件
 */
function getWindowByEvent(event: IpcMainEvent): BrowserWindow | undefined {
    const webContentsId = event.sender.id;
    for (const currentWin of BrowserWindow.getAllWindows()) {
        if (currentWin.webContents.id === webContentsId) {
            return currentWin;
        }
    }
    return undefined;
}

// 开发模式已打包配置
Object.defineProperty(app, 'isPackaged', {
    get() {
        return true;
    },
});
