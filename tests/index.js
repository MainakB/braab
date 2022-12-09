const {launcher, getValue, setValue} = require('../build/index.js');

const Launcher = new launcher();

Launcher.init().then(val => console.log('Started: ', val));

async function setData() {
  await setValue('mykey', 'someValue');
}

setData()
  .then(() => {
    return getValue('*');
  })
  .then(val => console.log('abcd', val));
