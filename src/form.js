const { Field } = require('./fields.js');

class Form {
  #fields;
  #currentFieldIndex;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = 0;
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  addField(name, description, validator, parser) {
    this.#fields.push(new Field(name, description, validator, parser));
  }

  currentFieldLabel() {
    const currentField = this.#currentField();
    return currentField.getLabel();
  }

  registerInput(response) {
    const currentField = this.#currentField();
    if (currentField.validate(response)) {
      currentField.storeResponse(response);
      this.#currentFieldIndex++;
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
