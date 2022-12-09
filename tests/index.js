const {launcher, getValue, setValue} = require('../dist/index.js');

const Launcher = new launcher();

async function setData() {
  await setValue('mykey', 'Test Value 123');
}

Launcher.init()
  .then(() => {
    return setData();
  })
  .then(() => {
    return getValue('*');
  })
  .then(val => console.log('Returned data from store: ', val));
