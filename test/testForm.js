const { Form } = require('../src/form.js');
const assert = require('assert');

describe('Form', () => {
  describe('currentFieldLabel', () => {
    it('Should return the current field label', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);

      assert.deepStrictEqual(form.currentFieldLabel(), 'Enter name');
    });
  });

  describe('hasRemainingField', () => {
    it('Should true if there is remaining fields', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);

      assert.deepStrictEqual(form.hasRemainingField(), true);
    });

    it('Should false if there is no remaining fields', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);
      form.registerInput('sourav');

      assert.deepStrictEqual(form.hasRemainingField(), false);
    });
  });

  describe('registerInput', () => {
    it('Should add response to the field', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);
      form.registerInput('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: 'sourav' });
    });

    it('Should not add response if it is not valid', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => false, (x) => x);
      form.registerInput('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: null });
    });
  });

  describe('getAllResponses', () => {
    it('Should return response as object', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);
      form.registerInput('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: 'sourav' });
    });

    it('Should return all response as object', () => {
      const form = new Form();
      form.addField('name', 'Enter name', () => true, (x) => x);
      form.addField('age', 'Enter age', () => true, (x) => x);
      form.registerInput('sourav');
      form.registerInput('20');

      assert.deepStrictEqual(
        form.getAllResponses(), { name: 'sourav', age: "20" }
      );
    });
  });
});