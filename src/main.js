const { Form } = require("./form.js");
const fs = require("fs");
const { Field } = require("./fields.js");
const { multiLineField } = require("./multiLineField.js");

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
    console.error("Invalid Input !!");
  }
  return result;
};

const identity = (text) => text;
const split = (text) => text.split(",");
const join = (text) => text.join('\n');

const storeFormData = (form) => {
  fs.writeFileSync(
    './formData.json', JSON.stringify(form.getAllResponses()), 'utf8'
  );
};

const exitProcess = (form) => {
  storeFormData(form);
  console.log("Thank you");
  process.exit(0);
};

const displayQuestion = (form) => {
  if (!form.hasRemainingField()) {
    exitProcess(form);
  }
  console.log(form.currentFieldLabel());
};

const readData = (form) => {
  process.stdin.setEncoding("utf8");

  displayQuestion(form);
  process.stdin.on("data", (input) => {
    form.registerResponse(input.trim());
    displayQuestion(form);
  });
};

const createForm = () => {
  const nameField = new Field('name', 'Enter name :', nameValidator, identity);
  const dobField = new Field('dob', 'Enter dob :', dateValidator, identity);
  const hobbiesField = new Field(
    'hobbies', 'Enter hobbies :', hobbiesValidator, split
  );

  const phField = new Field(
    'phone', 'Enter phone number :', phNoValidator, identity
  );

  const addressField = new multiLineField(
    'address',
    ['Enter address line 1', 'Enter address line 2'],
    addressValidator, join
  );

  const form = new Form(nameField, dobField, hobbiesField, phField, addressField);
  return form;
};

const main = () => {
  const form = createForm();
  readData(form);
};

main();

module.exports = {};
