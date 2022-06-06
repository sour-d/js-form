const { Form } = require('./form.js');
const fs = require('fs');

const main = () => {
  const form = new Form();
  form.addField('name', 'string', 'Please Enter Your name :');
  form.addField('dob', 'string', 'Please Enter Your dob :');
  form.addField('hobbies', 'array', 'Please Enter Your hobbies :');

  readData(form);
}

const storeFormData = (form) => {
  fs.writeFileSync('./formData.json', form.toJSON(), 'utf8');
}

const readData = (form) => {
  process.stdin.setEncoding('utf8');

  let field = form.nextFieldDescription();
  console.log(field);
  process.stdin.on('data', (input) => {
    form.registerInput(input);
    field = form.nextFieldDescription();
    if (!field) {
      storeFormData(form);
      process.exit(0);
    }
    console.log(field);
  });
}

main();