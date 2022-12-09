type JsonPrimitive = string | number | boolean | null;
type JsonObject = {[x: string]: JsonPrimitive | JsonObject | JsonArray};
type JsonArray = Array<JsonPrimitive | JsonObject | JsonArray>;
type JsonCompatible = JsonObject | JsonArray;
