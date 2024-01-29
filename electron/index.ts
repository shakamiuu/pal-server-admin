import { app, BrowserWindow } from 'electron';
import path from 'path';

// 定义全局变量，获取窗口实例
let win: BrowserWindow | null;

/**
 * 创建一个窗口
 */
const createWindow = () => {
    win = new BrowserWindow({
        icon: path.join(__dirname, 'src/assets/image/logo.png'),
        width: 1280,
        height: 720,
        webPreferences: {
            devTools: true,
            // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // 隐藏顶部菜单
    win.setMenu(null);

    win.webContents.openDevTools({ mode: 'detach' });

    if (process.env.NODE_ENV !== 'development') {
        win.loadFile(path.join(__dirname, './index.html'));
    } else {
        win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
    }
};

app.whenReady().then(() => {
    createWindow(); // 创建窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
