/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */

let server: SharedStoreServer;

export default class SharedStoreLauncher {
  private _app?: PolkaInstance;

  private static _instance: SharedStoreLauncher;

  private baseUrl: string | undefined;

  private port: number | undefined;

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
    const {port, app} = await server.startServer();
    this._app = app;
    this.port = port;
    this.baseUrl = this.setPort(port);

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

  setPort(port: number) {
    return `http://localhost:${port}`;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
