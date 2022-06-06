class Form {
  #fields;
  #currentFieldIndex;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = 0;
  }

  addField(name, type, description, validator) {
    const field = {
      name, description, type, validator, input: null
    }
    this.#fields.push(field);
  }

  currentFieldDescription() {
    const currentField = this.#currentField();
    if (currentField) {
      return currentField.description;
    }
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  registerInput(input) {
    const currentField = this.#currentField();
    if (!currentField.validator(input)) {
      console.error('Invalid Input !!');
      return;
    }

    this.#currentFieldIndex++;
    currentField.input = input;

    if (currentField.type === 'array') {
      currentField.input = input.split(',');
    }
  }

  hasRemainingField() {
    return this.#currentFieldIndex < this.#fields.length;
  }

  toJSON() {
    const formData = this.#fields.map(field => {
      const data = {};
      data[field.name] = field['input'];
      return data;
    });
    return JSON.stringify(formData);
  }
}

exports.Form = Form;
