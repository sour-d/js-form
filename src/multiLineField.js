class multiLineField {
  #name;
  #labels;
  #validator;
  #parser;
  #responses;

  constructor(name, labels, validator = () => true, parser = (x) => x) {
    this.#name = name;
    this.#labels = labels;
    this.#validator = validator;
    this.#parser = parser;
    this.#responses = [];
  }

  getLabel() {
    return this.#labels[this.#responses.length];
  }

  validate(response) {
    return this.#validator(response);
  }

  storeResponse(response) {
    if (this.validate(response)) {
      this.#responses.push(response);
    }
  }

  isFilled() {
    return this.#responses.length === this.#labels.length;
  }

  getEntry() {
    return [this.#name, this.#parser(this.#responses)];
  }
}

module.exports = { multiLineField };
