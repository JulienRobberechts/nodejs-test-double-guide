# Mocking different type of imports

## Types of imports

- CommonJS for Node.js: require('my-module')
- ES Modules (ESM):
  - named exports
  - default export

named import:

- import { myFunc, a } from './some-module'
- import \* as moduleY from './module-y'

default import:

- import whateverIsDefault from './moduleY'

## Types of mocking

### 1. Intercept import

It's ok
see the project
https://codewithhugo.com/jest-mock-spy-module-import/

### 2. Intercept internal function

It's a bad practice.

#### 2.1 Intercept internal function in CommonJs

Mockable / non mockable modules:
https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-cjs/lib.fail.jest-test.js

Advices:

1. It's a bad practice, extract it please.
2. You should expose your internal function [AND DO IT RIGHT like this](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-cjs/lib.js), by referring to the same instance everywhere.
3. You should not destructure the function at any time in your test.

#### 2.2 Intercept internal function in ESM

It's really tough !

Advices:

1. It's a bad practice, AND it's difficult. Extract it please.
2. named export are not possible to mock if you follow the normal syntax [code](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-esm/lib.named-export.js)/[test](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-esm/lib.named-export.jest-test.js) but you can still do it like this:

```js
import db from "./db";

const keyPrefix = "todos";
const makeKey = key => `${keyPrefix}:${key}`;

const lib = {
  // Could also define makeKey inline like so:
  // makeKey(key) { return `${keyPrefix}:${key}` },
  makeKey,
  getTodo(id) {
    return db.get(lib.makeKey(id));
  }
};

export default lib;
```

3. default export are not possible to mock if you follow the normal syntax. [code](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-esm/lib.default-export.js)/[test](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-esm/lib.default-export.jest-test.js) but you can still do it [the RIGHT like this](https://github.com/HugoDF/mock-spy-module-import\examples\spy-internal-calls-esm\lib.js)

### 3. Mock or Spy

Mocking internals is the same with ESM/CommonJS for jest.

TODO: How to explain the difference between this 2 ways:

A. Intercepting imports

- You have to care about the original path.
- Jest: jest.mock()

B. Spy/mock on imports or mock part of a module by “referencing the module”

- You have to reference the module
- Jest: jest.spyOn()

### 3.1 Just mock (Jest) = intercept

```js
jest.mock("./path-to-module", () => ({ myMethod: jest.fn() }));
const mock = require("./path-to-module");
expect(mock.myMethod).toHaveBeenCalledWith(param1, param2);
```

### 3.2 Spy with (Jest) = replace the behavior

```js
const myMethod = require("./path-to-module");
const dbSetSpy = jest
  .spyOn(myMethod, "method-name")
  .mockResolvedValueOnce(result); // or mockResolvedValueOnce
```

### Reference

Jest Full and Partial Mock/Spy of CommonJS and ES6 Module Imports  
https://codewithhugo.com/jest-mock-spy-module-import/
