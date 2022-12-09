/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import got from 'got';

// import type {JsonCompatible, JsonPrimitive, JsonObject, JsonArray} from './@types/types';

const WAIT_INTERVAL = 100;
const pendingValues = new Map<string, any>();
let waitTimeout: NodeJS.Timer;

const errHandler = (err: any) => {
  console.warn(err.code, err.input, err.statusCode, err.statusMessage, err.url, err.body);
};

/**
 * make a request to the server to get a value from the store
 * @param   {string} key
 * @returns {*}
 */
export const getValue = async (
  key: string,
  baseUrl: string
): Promise<string | number | boolean | JsonObject | JsonArray | null | undefined> => {
  const res = await got.post(`${baseUrl}/get`, {json: {key}, responseType: 'json'}).catch(errHandler);
  return res?.body ? (res.body as JsonObject).value : undefined;
};

/**
 * make a request to the server to set a value to the store
 * @param {string}  key
 * @param {*}       value `store[key]` value (plain object)
 */
export const setValue = async (key: string, value: JsonCompatible | JsonPrimitive, baseUrl: string) => {
  /**
   * if someone calls `setValue` in `onPrepare` we don't have a base url
   * set as the launcher is called after user hooks. In this case we need
   * to wait until it is set and flush all messages.
   */
  if (baseUrl) {
    return got.post(`${baseUrl}/set`, {json: {key, value}}).catch(errHandler);
  }

  console.info('Shared store server not yet started, collecting value');
  pendingValues.set(key, value);

  if (waitTimeout) {
    return;
  }

  console.log('Check shared store server to start');
  waitTimeout = setInterval(async () => {
    if (!baseUrl) {
      return;
    }

    console.info(`Shared store server started, flushing ${pendingValues.size} values`);
    clearInterval(waitTimeout);
    await Promise.all(
      [...pendingValues.entries()].map(async ([key, value]) => {
        await got.post(`${baseUrl}/set`, {json: {key, value}}).catch(errHandler);
        pendingValues.delete(key);
      })
    ).then(
      () => console.info('All pending values were successfully stored'),
      err => console.error(`Failed to store all values: ${err.stack}`)
    );
  }, WAIT_INTERVAL);
};
