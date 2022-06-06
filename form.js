class Form {
  #fields;
  #currentFieldIndex;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = -1;
  }

  addField(description, type) {
    const field = {
      description, type, input: null
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
      currentField.input = input.slice(',');
      return;
    }
    currentField.input = input;
  }
}

exports.Form = Form;
