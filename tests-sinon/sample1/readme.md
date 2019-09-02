# Mock methods with Sinon and Mocha

## Which technic to use to stub?

According to the [Sinon documentation](https://sinonjs.org/how-to/stub-dependency/),
there is 2 types of libraries: stubbing library and module interception library.

- Sinon is simply a stubbing library. Only for simple cases.
- module interception library: solutions targetting link seams or explicit dependency injection

## Stubbing with Sinon

### Setup

The [Sinon documentation](https://sinonjs.org/how-to/stub-dependency/) is saying this:

To stub a dependency (imported module) of a module under test you have to

1. import it explicitly in your test.

```js
const moduleB = require("./moduleB");
```

2. stub the desired method.

```js
const spy = sinon.stub(moduleB, "DoItB").returns("beta");
```

For the stubbing to work, the stubbed method cannot be destructured, neither in the module under test nor in the test. Like in this file: [moduleA.mistake.spec.js](./moduleA.mistake.spec.js)

### Conclusion

- your target code have to not use destructuring syntax for import (big constraint)
- you have to import the module in your test without destructuring syntax (could be done)
