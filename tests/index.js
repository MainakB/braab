const {Launcher, getValue, setValue} = require('../dist/index.js');

async function setData() {
  await setValue('mykey', 'Test Value 123');
}

const launcher = new Launcher();

launcher
  .init()
  .then(() => setData())
  .then(() => getValue('*'))
  .then(val => {
    console.log('Returned data from store: ', val);
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => resolve());
  })
  .then(() => launcher.onComplete())
  .then(() => console.log('Server stopped'));
