class Form {
  #fields;
  #currentFieldIndex;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = -1;
  }

  addField(name, type, description) {
    const field = {
      name, description, type, input: null
    }
    this.#fields.push(field);
  }

  nextFieldDescription() {
    this.#currentFieldIndex++;

    const nextField = this.#currentField();
    if (nextField) {
      return nextField.description;
    }
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  registerInput(input) {
    const currentField = this.#currentField();
    if (currentField.type === 'array') {
      currentField.input = input.split(',');
      return;
    }
    currentField.input = input;
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
