const { Form } = require('./form.js');
const fs = require('fs');
const { text } = require('stream/consumers');

const nameValidator = (name) => {
  const isValid = /^[\S ]+$/.test(name) && name.length > 4;
  return assertResult(isValid);
};

const dobValidator = (dob) => {
  const isValid = /^[\d]+\-[\d]+\-[\d]+$/.test(dob);
  return assertResult(isValid);
};

const hobbiesValidator = (hobbies) => {
  const isValid = hobbies.length > 0;
  return assertResult(isValid);
};

const phValidator = (phone) => {
  const isValid = phone.length > 9 && /^[\d]+$/.test(phone);
  return assertResult(isValid);
};

const addressValidator = (address) => {
  const isValid = address.length > 0;
  return assertResult(isValid);
};

const assertResult = (isValid) => {
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
}

const storeFormData = (form) => {
  fs.writeFileSync('./formData.json', form.toJSON(), 'utf8');
};

const exitProcess = (form) => {
  storeFormData(form);
  console.log('Thank you');
  process.exit(0);
};

const parseString = text => text
const parseArray = text => text.split(',');
const parseAddress = text => [text];

const readData = (form) => {
  process.stdin.setEncoding('utf8');

  let desc = form.currentFieldDescription();
  console.log(desc);

  process.stdin.on('data', (input) => {
    form.registerInput(input.trim());
    if (!form.hasRemainingField()) {
      exitProcess(form);
    }
    desc = form.currentFieldDescription();
    console.log(desc);
  });
};

const main = () => {
  const form = new Form();
  form.addField('name', 'Enter Your name :', nameValidator, parseString);
  form.addField('dob', 'Enter Your dob :', dobValidator, parseString);
  form.addField('hobbies', 'Enter Your hobbies :', hobbiesValidator, parseArray);
  form.addField('ph_no', 'Enter Your phone number :', phValidator, parseString);
  form.addField('address', 'Enter line 1 address :', addressValidator, parseAddress);
  form.addField('address', 'Enter line 2 address :', addressValidator, parseAddress);

  readData(form);
};

main();
