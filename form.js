class Form {
  #fields;
  #currentFieldIndex;
  #formData;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = 0;
    this.#formData = {};
  }

  incrementCurrentFieldIndex() {
    this.#currentFieldIndex++;
  }

  addField(name, type, description, validator) {
    const input = null;
    this.#fields.push({ name, description, type, validator, input });
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  currentFieldDescription() {
    const currentField = this.#currentField();
    return currentField ? currentField.description : null;
  }

  registerInput(input) {
    const currentField = this.#currentField();
    if (!currentField.validator(input)) {
      return;
    }

    this.#storeInput(input);
  }

  #storeInput(input) {
    const currentField = this.#currentField();
    const parsedInput = this.#parseInput(input);

    if (this.#formData[currentField.name]) {
      this.#formData[currentField.name] += '\n' + parsedInput;
    } else {
      this.#formData[currentField.name] = parsedInput;
    }
    this.incrementCurrentFieldIndex();
  }

  #parseInput(input) {
    const currentField = this.#currentField();
    if (currentField.type === 'array') {
      return input.split(',');
    }
    return input;
  }

  hasRemainingField() {
    return this.#currentFieldIndex < this.#fields.length;
  }

  toJSON() {
    // const formData = {};
    // for (const key in this.#formData) {
    //   formData[key] = this.#formData[key].join('\n');
    // }
    return JSON.stringify(this.#formData);
  }
}

exports.Form = Form;
