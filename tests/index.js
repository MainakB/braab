const {Launcher, getValue, setValue} = require('../dist/index.js');

async function setData(baseUrl) {
  await setValue('mykey', 'Test Value 123', baseUrl);
}

const launcher = new Launcher();

launcher
  .init()
  .then(() => setData(launcher.getBaseUrl()))
  .then(() => getValue('*', launcher.getBaseUrl()))
  .then(val => {
    console.log('Returned data from store: ', val);
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => resolve());
  })
  .then(() => launcher.onComplete())
  .then(() => console.log('Server stopped'));
