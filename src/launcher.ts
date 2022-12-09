/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import {setPort} from './client';

let server: SharedStoreServer;

export default class SharedStoreLauncher {
  private _app?: PolkaInstance;

  async init() {
    /**
     * import during runtime to avoid unnecessary dependency loading
     */
    server = (await import('./server')) as SharedStoreServer;
    const {port, app} = await server.startServer();
    this._app = app;
    setPort(port);

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
