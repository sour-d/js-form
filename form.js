class Form {
  #fields;
  #currentField;

  constructor() {
    this.#fields = [];
    this.#currentField = -1;
  }

  addField(description, type) {
    const field = {
      description, type, input: null
    }
    this.#fields.push(field);
  }

  nextFieldDescription() {
    this.#currentField++;

    const nextField = this.#currentField();
    if (nextField) {
      return nextField.description;
    }
  }

  #currentField() {
    return this.#fields[this.#currentField]
  }

  registerInput(input) {
    const currentField = this.#currentField();
    if (currentField.type === 'array') {
      currentField.input = input.slice(',');
      return;
    }
    currentField.input = input;
  }
}

exports.Form = Form;
