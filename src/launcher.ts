/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import {PORT} from './constants';

let server: SharedStoreServer;

export default class SharedStoreLauncher {
  private _app?: PolkaInstance;

  private static _instance: SharedStoreLauncher;

  constructor() {
    console.log('Creating new object');
  }

  static getInstance() {
    if (!SharedStoreLauncher._instance) {
      SharedStoreLauncher._instance = new SharedStoreLauncher();
    }
    return SharedStoreLauncher._instance;
  }

  async init() {
    /**
     * import during runtime to avoid unnecessary dependency loading
     */
    server = (await import('./server')) as SharedStoreServer;
    const {port, app} = await server.startServer(PORT);
    this._app = app;

    console.log(`Started shared server on port ${port}`);
    return new Promise<boolean>(resolve => resolve(true));
  }

  async onComplete() {
    return new Promise<void>(resolve => {
      if (this._app && this._app.server.close) {
        this._app.server.close(() => resolve());
      }
      return resolve();
    });
  }
}
