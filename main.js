const { Form } = require('./form.js');
const fs = require('fs');

const nameValidator = (name) => {
  const result = /^[\S ]+$/.test(name) && name.length > 4;
  return assert(result);
};

const dateValidator = (date) => {
  const result = /^\d{4}\-\d{2}\-\d{2}$/.test(date);
  return assert(result);
};

const hobbiesValidator = (hobbies) => {
  const result = hobbies.length > 0;
  return assert(result);
};

const phNoValidator = (phone) => {
  const result = phone.length > 9 && /^[\d]+$/.test(phone);
  return assert(result);
};

const addressValidator = (address) => {
  const result = address.length > 0;
  return assert(result);
};

const assert = (result) => {
  if (!result) {
    console.error('Invalid Input !!');
  }
  return result;
};

const parseString = text => text
const parseArray = text => text.split(',');
const parseAddress = text => [text];

const storeFormData = (form) => {
  fs.writeFileSync('./formData.json', form.toJSON(), 'utf8');
};

const exitProcess = (form) => {
  storeFormData(form);
  console.log('Thank you');
  process.exit(0);
};

const displayQuestion = form => {
  if (!form.hasRemainingField()) {
    exitProcess(form);
  }
  console.log(form.currentFieldDescription());
};

const readData = (form) => {
  process.stdin.setEncoding('utf8');

  displayQuestion(form);
  process.stdin.on('data', (input) => {
    form.registerInput(input.trim());
    displayQuestion(form);
  });
};

const createForm = () => {
  const form = new Form();
  form.addField('name', 'Enter Your name :', nameValidator, parseString);
  form.addField('dob', 'Enter Your dob :', dateValidator, parseString);
  form.addField('hobbies', 'Enter Your hobbies :', hobbiesValidator, parseArray);
  form.addField('ph_no', 'Enter Your phone number :', phNoValidator, parseString);
  form.addField('address', 'Enter line 1 address :', addressValidator, parseAddress);
  form.addField('address', 'Enter line 2 address :', addressValidator, parseAddress);

  return form;
};

const main = () => {
  const form = createForm();
  readData(form);
};

main();
