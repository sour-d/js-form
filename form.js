class Form {
  #fields;
  #currentFieldIndex;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = 0;
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

    this.incrementCurrentFieldIndex();
    this.#storeInput(input);
  }

  #storeInput(currentField, input) {
    const currentField = this.#currentField();
    if (currentField.type === 'array') {
      currentField.input = input.split(',');
      return;
    }
    currentField.input = input;
  }

  hasRemainingField() {
    return this.#currentFieldIndex < this.#fields.length;
  }

  toJSON() {
    const formData = this.#fields.map(({ name, input }) => {
      const data = {};
      data[name] = input;
      return data;
    });
    return JSON.stringify(formData);
  }
}

exports.Form = Form;
