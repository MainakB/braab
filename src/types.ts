export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = {[x: string]: JsonPrimitive | JsonObject | JsonArray};
export type JsonArray = Array<JsonPrimitive | JsonObject | JsonArray>;
export type JsonCompatible = JsonObject | JsonArray;
