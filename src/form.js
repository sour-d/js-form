// const { Field } = require('./fields.js');

class Form {
  #fields;
  #currentFieldIndex;

  constructor(...fields) {
    this.#fields = fields;
    this.#currentFieldIndex = 0;
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  currentFieldLabel() {
    const currentField = this.#currentField();
    return currentField.getLabel();
  }

  registerResponse(response) {
    const currentField = this.#currentField();
    if (currentField.validate(response)) {
      currentField.storeResponse(response);
      if (currentField.isFilled()) {
        this.#currentFieldIndex++;
      }
    }
  }

  hasRemainingField() {
    return this.#fields.some(field => {
      return field.isFilled() === false;
    });
  }

  getAllResponses() {
    const fieldResponses = {};
    this.#fields.forEach(field => {
      const [name, response] = field.getEntry();
      fieldResponses[name] = response;
    });
    return fieldResponses;
  }
}

exports.Form = Form;
