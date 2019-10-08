# Test of Sinon + testdouble (with module interception)

https://www.npmjs.com/package/testdouble

## Doc

two different modes:

- Node.js module replacement
  - SPY = td.replace('../path/to/dependency')
  - STUB = td.replace('../path/to/dependency', MyStub)
- object-property replacement = td.replace(someObject, 'nameOfProperty')

td.func(), td.object(), td.constructor(), and td.imitate() to create test doubles

## Notes

- Any relative paths passed to td.replace() are relative from the test to the dependency.

## Best practices

- put td.reset() in after-each method.

