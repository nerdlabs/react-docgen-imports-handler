# react-docgen-imports-handler [![Build Status](https://travis-ci.org/nerdlabs/react-docgen-imports-handler.svg?branch=master)](https://travis-ci.org/nerdlabs/react-docgen-imports-handler)
A handler for react-docgen that finds the names of all imported modules.

## Rationale
[react-docgen](https://github.com/reactjs/react-docgen) is a CLI and API toolbox
to help extract information from [React](http://facebook.github.io/react/)
components and generate documentation from it.

`react-docgen-imports-handler` is a custom handler for `react-docgen` and can be
used to extract a list of all the module dependencies for a given component.

In its current state it only extracts the name of the module / file, but ideas
for a future version include to also extract the exported names (e.g. is it a
`default` export? is it a `named` export? which names are being imported?).

## Installation
Install `react-docgen-imports-handler` from [npm](https://www.npmjs.com/package/react-docgen-imports-handler)

```shell
npm install --save react-docgen-imports-handler
```

## Usage
Unfortunately there is currently no easy way to use custom handlers with the
[react-docgen CLI](https://github.com/reactjs/react-docgen#cli).

Discussions and Ideas about how to make this easier are happening in the
[react-docgen issue discussions](https://github.com/reactjs/react-docgen/issues/115).

If you want to use this module programmatically check out the [react-docgen API docs](https://github.com/reactjs/react-docgen#api) for more information about
the `react-docgen` API.  
Below is a small example that demonstrates how to
integrate `react-docgen-imports-handler`.

```javascript
import reactDocs from 'react-docgen';
import importsHandler from 'react-docgen-imports-handler';
const resolver = reactDocs.resolver.findExportedComponentDefinition;
const handlers = reactDocs.handlers.concat(importsHandler);
const documentation = reactDocs.parse(src, resolver, handlers);
```

## Examples
When using this custom handler with `react-docgen` it will find the names of
every `import`ed or `require()`ed file and add them to the resulting
documentation.

```javascript
import React from 'react';
import MyButton from '../mybutton';
export default function MyComponent() { return <MyButton />; }
```

```json
{
  "imports": ["react", "../mybutton"],
  "props": {...}
}
```

For more information about the data format see the [react-docgen readme](https://github.com/reactjs/react-docgen#result-data-structure)
