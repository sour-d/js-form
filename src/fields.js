class Field {
  #name;
  #label;
  #validator;
  #parser;
  #response;

  constructor(name, label, validator = () => true, parser = (x) => x) {
    this.#name = name;
    this.#label = label;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  getLabel() {
    return this.#label;
  }

  validate(input) {
    return this.#validator(input);
  }

  storeResponse(response) {
    if (this.validate(response)) {
      this.#response = response;
    }
  }

  isFilled() {
    return this.#response !== null;
  }

  getEntry() {
    return [this.#name, this.#parser(this.#response)];
  }
}

module.exports = { Field };
