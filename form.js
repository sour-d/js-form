class Form {
  #outputPath;
  #fields;
  #currentField;

  constructor(outputPath) {
    this.#outputPath = outputPath;
    this.#fields = [];
    this.#currentField = -1;
  }

  addField(description) {
    const field = {
      description: description,
      input: null
    }
    this.#fields.push(field);
  }

  nextQuestion() {
    this.#currentField += 1;
    return this.#fields[this.#currentField];
  }

  registerInput(input) {
    this.#fields[this.#currentField].input = input;
  }
}