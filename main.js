const { Form } = require('./form.js');

const main = () => {
  const form = new Form();
  form.addField('Please Enter Your name :', 'string');
  form.addField('Please Enter Your dob :', 'string');
  form.addField('Please Enter Your hobbies :', 'array');

  readData(form);
}

const readData = (form) => {
  process.stdin.setEncoding('utf8');

  let field = form.nextFieldDescription();
  console.log(field);
  process.stdin.on('data', (input) => {
    form.registerInput(input);
    field = form.nextFieldDescription();
    if (!field) {
      process.exit(0);
    }
    console.log(field);
  });
}

main();