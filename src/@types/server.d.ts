/* eslint-disable no-undef */
interface SharedStoreServer {
  __store: JsonObject;
  startServer: (port: number) => Promise<{port: number; app: PolkaInstance}>;
}
