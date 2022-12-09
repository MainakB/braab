interface SharedStoreServer {
  __store: BraabStorage.JsonObject;
  startServer: () => Promise<{port: number; app: PolkaInstance}>;
}
