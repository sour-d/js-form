const { Form } = require('../src/form.js');
const { Field } = require('../src/fields.js');
const assert = require('assert');

describe('Form', () => {
  describe('currentFieldLabel', () => {
    it('Should return the current field label', () => {
      const field = new Field('name', 'Enter name', () => true, (x) => x);
      const form = new Form(field);

      assert.deepStrictEqual(form.currentFieldLabel(), 'Enter name');
    });
  });

  describe('hasRemainingField', () => {
    it('Should true if there is remaining fields', () => {
      const field = new Field('name', 'Enter name', () => true, (x) => x);
      const form = new Form(field);

      assert.deepStrictEqual(form.hasRemainingField(), true);
    });

    it('Should false if there is no remaining fields', () => {
      const field = new Field('name', 'Enter name', () => true, (x) => x);
      const form = new Form(field);
      form.registerResponse('sourav');

      assert.deepStrictEqual(form.hasRemainingField(), false);
    });
  });

  describe('registerResponse', () => {
    it('Should add response to the field', () => {
      const field = new Field('name', 'Enter name', () => true, (x) => x);
      const form = new Form(field);
      form.registerResponse('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: 'sourav' });
    });

    it('Should not add response if it is not valid', () => {
      const field = new Field('name', 'Enter name', () => false, (x) => x);
      const form = new Form(field);
      form.registerResponse('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: null });
    });
  });

  describe('getAllResponses', () => {
    it('Should return response as object', () => {
      const field = new Field('name', 'Enter name', () => true, (x) => x);
      const form = new Form(field);
      form.registerResponse('sourav');

      assert.deepStrictEqual(form.getAllResponses(), { name: 'sourav' });
    });

    it('Should return all response as object', () => {
      const field1 = new Field('name', 'Enter name', () => true, (x) => x);
      const field2 = new Field('age', 'Enter age', () => true, (x) => x);
      const form = new Form(field1, field2);

      form.registerResponse('sourav');
      form.registerResponse('20');

      assert.deepStrictEqual(
        form.getAllResponses(), { name: 'sourav', age: "20" }
      );
    });
  });
});