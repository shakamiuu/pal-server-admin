import { app, BrowserWindow, Menu, shell } from 'electron';
import { exec } from 'child_process';
import path from 'path';
import log from 'electron-log';
import reloader from 'electron-reloader';

const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 760,
        icon: path.join(__dirname, '/src/assets/image/logo.png'),
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (isDev) {
        win.webContents.openDevTools();
        win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
    } else {
        win.loadFile('dist/index.html');
    }
};

// 禁用菜单，一般情况下，不需要禁用
Menu.setApplicationMenu(null);

app.whenReady().then(() => {
    if (!isDev) {
        startServer();
    }
    createWindow();
});

app.on('window-all-closed', () => {
    if (!isDev) {
        closeServer();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 默认浏览器打开链接
app.on('web-contents-created', (e, webContents) => {
    webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
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

reloader(module);
