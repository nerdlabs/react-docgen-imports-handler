import test from 'ava';
import Documentation from 'react-docgen/dist/Documentation';
import { statement } from '../tests/utils';
import importsHandler from './index';

let documentation = null;

test.beforeEach(() => {
  documentation = new Documentation();
});

test('For files that contain no imported resources', (t) => {
  const definition = statement(`
    class Foo {
      render() { return <button />; }
    }
  `);
  importsHandler(documentation, definition);

  const actual = documentation.get('imports');
  const expected = [];

  t.deepEqual(actual, expected, 'it should return an empty array');
});

test('For files using ES2015 import syntax', (t) => {
  const definition = statement(`
    import Button from './button';
    import * as React from 'react';
    import { a, b as c } from '../foo';
  `);
  importsHandler(documentation, definition);

  const actual = documentation.get('imports');
  const expected = ['./button', 'react', '../foo'];

  t.deepEqual(actual, expected,
    'it should find the sources for all import statements');
});

test('For files using CommonJS require function calls', (t) => {
  const definition = statement(`
    var Button = require('./button');
    var React = require('re' + 'act');
  `);
  importsHandler(documentation, definition);

  const actual = documentation.get('imports');
  const expected = ['./button'];

  t.deepEqual(actual, expected,
    'it should find the sources for all static require calls');
});
