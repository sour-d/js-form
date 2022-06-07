class Form {
  #fields;
  #currentFieldIndex;
  #formData;

  constructor() {
    this.#fields = [];
    this.#currentFieldIndex = 0;
    this.#formData = {};
  }

  #currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  #incrementCurrentFieldIndex() {
    this.#currentFieldIndex++;
  }

  addField(name, description, validator, parser) {
    this.#fields.push({ name, description, parser, validator });
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
    const parsedInput = currentField.parser(input);
    currentField.input = parsedInput;

    const oldData = this.#formData[currentField.name];
    if (oldData) {
      this.#formData[currentField.name] = oldData.concat(parsedInput);
    } else {
      this.#formData[currentField.name] = parsedInput;
    }
    this.#incrementCurrentFieldIndex();
  }

  hasRemainingField() {
    return this.#currentFieldIndex < this.#fields.length;
  }

  toJSON() {
    return JSON.stringify(this.#formData);
  }
}

exports.Form = Form;
