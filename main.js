const { Form } = require('./form.js');
const fs = require('fs');

const nameValidator = (name) => {
  return /^[\S ]+$/.test(name) && name.length > 4;
};

const dobValidator = (dob) => {
  return /^[\d]+\-[\d]+\-[\d]+$/.test(dob);
};

const hobbiesValidator = (hobbies) => {
  return hobbies.length > 0;
};

const storeFormData = (form) => {
  fs.writeFileSync('./formData.json', form.toJSON(), 'utf8');
};

const readData = (form) => {
  process.stdin.setEncoding('utf8');

  let desc = form.currentFieldDescription();
  console.log(desc);
  process.stdin.on('data', (input) => {
    form.registerInput(input.trim());
    if (!form.hasRemainingField()) {
      storeFormData(form);
      console.log('Thank you');
      process.exit(0);
    }
    desc = form.currentFieldDescription();
    console.log(desc);
  });
};

const main = () => {
  const form = new Form();
  form.addField('name', 'string', 'Please Enter Your name :', nameValidator);
  form.addField('dob', 'string', 'Please Enter Your dob :', dobValidator);
  form.addField('hobbies', 'array', 'Please Enter Your hobbies :', hobbiesValidator);

  readData(form);
};

main();