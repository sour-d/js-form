const { Form } = require('./form.js');
const fs = require('fs');

const nameValidator = (name) => {
  const isValid = /^[\S ]+$/.test(name) && name.length > 4;
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
};

const dobValidator = (dob) => {
  const isValid = /^[\d]+\-[\d]+\-[\d]+$/.test(dob);
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
};

const hobbiesValidator = (hobbies) => {
  const isValid = hobbies.length > 0;
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
};

const phValidator = (phone) => {
  const isValid = phone.length > 9 && /^[\d]+$/.test(phone);
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
};

const addressValidator = (address) => {
  const isValid = address.length > 0;
  if (!isValid) {
    console.error('Invalid Input !!');
  }
  return isValid;
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
  form.addField('name', 'string', 'Enter Your name :', nameValidator);
  form.addField('dob', 'string', 'Enter Your dob :', dobValidator);
  form.addField('hobbies', 'array', 'Enter Your hobbies :', hobbiesValidator);
  form.addField('ph_no', 'string', 'Enter Your phone number :', phValidator);
  form.addField('address', 'string', 'Enter line 1 address :', addressValidator);
  form.addField('address', 'string', 'Enter line 2 address :', addressValidator);

  readData(form);
};

main();