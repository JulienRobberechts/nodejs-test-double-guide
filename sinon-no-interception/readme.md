# Mock with Sinon (Simple stubbing)

## When to use this approach

When you have to mock a module quickly??

## Setup

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

## Conclusion

- your target code have to not use destructuring syntax for import. (big constraint no!)
- you have to import the module in your test without destructuring syntax.

