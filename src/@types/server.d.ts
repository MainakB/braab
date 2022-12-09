interface SharedStoreServer {
  __store: JsonObject;
  startServer: () => Promise<{port: number; app: PolkaInstance}>;
}
