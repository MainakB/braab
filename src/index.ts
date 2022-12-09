// import type {JsonPrimitive, JsonCompatible, JsonObject} from './types';
import * as Types from './types';

import SharedStoreLauncher from './launcher.js';

export {getValue, setValue} from './client.js';
export const launcher = SharedStoreLauncher;

declare global {
  namespace BraabStorage {
    interface JsonObject extends Types.JsonObject {}
  }
}
