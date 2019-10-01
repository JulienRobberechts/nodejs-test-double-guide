
[Javascript test tools types overview](#javascript-test-tools-types-overview)
  - [Test runner](#test-runner)
  - [Assertion](#assertion)
  - [Test Doubles Framework](#test-doubles-framework)
  - [Module interception (by order of popularity)](#module-interception-by-order-of-popularity)
  - [tools](#tools)
  - [Demo of some tool stacks](#demo-of-some-tool-stacks)
  - [Specificity](#specificity)
    - [spy](#spy)
  - [References](#references)
  - [References](#references)

# Overview of javascript test libraries

This matrix sum up the purpose of some major javascript test libraries.

| Library / purpose   | Test runner | Assertion | Test double | Module interception |
| :------------------ | :---------: | :-------: | :---------: | :-----------------: |
| jest                |      X      |     X     |      X      |          X          |
| jasmine             |      X      |     X     |      X      |          -          |
| mocha               |      X      |     -     |      -      |          -          |
| chai                |      -      |     X     |      -      |          -          |
| should.js           |      -      |     X     |      -      |          -          |
| expect.js           |      -      |     X     |      -      |          -          |
| better-assert       |      -      |     X     |      -      |          -          |
| sinon               |      -      |     -     |      X      |          -          |
| testdouble          |      -      |     -     |      X      |          X          |
| proxyquire          |      -      |     -     |      -      |          X          |
| rewire              |      -      |     -     |      -      |          X          |
| mock-require        |      -      |     -     |      -      |          X          |
| babel-plugin-rewire |      -      |     -     |      -      |          X          |
| mockery             |      -      |     -     |      -      |          X          |
| rewiremock          |      -      |     -     |      -      |          X          |
| super-agent         |      -      |     -     |      -      |          -          |
| chai-http           |      -      |     x     |      -      |          -          |
| supertest           |      -      |     x     |      -      |          -          |
| Nock                |      -      |     x     |      -      |          -          |

Some tool are like a swiss army knife for tests (like Jest) doing a lot of different task so you'll find them in multiple categories. There are also some compatibility between tools and platform (ES and CommonJS).

Let's define each test task...

## Test runner

The test runner helps to find tests in your code, launch test, generate and display test progress and results.
The main one are: Jest, Mocha, Jasmine.

## Assertion

The assertion helps to check the test results.
It's already included in Jest and Jasmine. If you don't use those library you (and probably mocha as test runner) you can pick _chai_ or should.js, expect.js, better-assert.The most popular stack are Jest or mocha+chai. 

## Test Doubles

We are arriving to our main subject: test doubles.
In this section we are only talking about way to provide spies and stubs.

 Full test doubles are often used with javascript module interception but it's an add-on.
The main libraries are: Jest, Sinon, Jasmine, Testdouble (the library, not the concept).

## Module interception


 (by order of popularity)

Other name for the same concept:

- Dependency mocking
- overriding dependencies during testing
- mocking of Node.js modules
- mock require statements in Node.js
- 

Tools:

- proxyquire
- rewire
- mock-require
- babel-plugin-rewire
- mockery
- testdouble
- rewiremock

## tools

[Sinon](https://www.npmjs.com/package/sinon)  
[Jest](https://www.npmjs.com/package/jest)  
[Jasmine](https://www.npmjs.com/package/jasmine)  
[testdouble](https://www.npmjs.com/package/testdouble)

| Tool       |    spy/fake     |            stub |          mock |
| ---------- | :-------------: | --------------: | ------------: |
| Sinon      |   sinon.spy()   |    sinon.stub() |  sinon.mock() |
| Jest       |  jest.spyOn()   |       jest.fn() | no / use stub |
| Jasmine    | jasmine.spyOn() | jasmine.spyOn() | no / use stub |
| testdouble |    td.func()    |       td.func() | no / use stub |

## Demo of some tool stacks

| Tool                                 | Test runner | Assertion | Test double | Module interception |
| :----------------------------------- | :---------: | :-------: | :---------: | :-----------------: |
| 1. Jasmine                           |      X      |     X     |      X      |          -          |
| 2. Jest no interception              |      X      |     X     |      X      |          -          |
| 3. Jest with interception            |      X      |     X     |      X      |          X          |
| 4. Mocha + Chai + Sinon              |      X      |     X     |      X      |          -          |
| 5. Mocha + Chai + Sinon + proxyquire |      X      |     X     |      X      |          X          |
| 6. Mocha + Chai + Sinon + rewire     |      X      |     X     |      X      |          X          |
| 7. Mocha + Chai + Sinon + rewiremock |      X      |     X     |      X      |          X          |
| 8. Mocha + Chai + testdouble         |      X      |     X     |      X      |          X          |

## Specificity

For spies:

- Spy implementation: Real Spy
  1. [OK] Real spy the behavior is the same
  2. [FAKE] Just empty stub: return undefined.

For spy and stubs:

- Siblings method call: Is it possible to call other function in the same module. (defintion of Partial/Full)

  1. [OK] possible everything is ok, It's a partial test double.
  1. [EMPTY] return undefined. It's a wired mix between a partial and a full test double.
  1. [ERROR] throw an exception the method doesn't exist. It's a full test double. You are sure that any method of your dependency is used.

- Dependency Path in the test

  1. [r/test] Relative to the test. It's the best.
  2. [r/sut] Relative to the module under test. It's a bad idea!
  3. [name] The name of the variable in the system under test. It's a bad idea!

### spy

PATHS:

(.\jasmine-no-interception\test\moduleAspySpec.js#L9)
(.\jasmine-no-interception\test\moduleAspySpec.js#L19)

(.\jest-no-interception\test\moduleA.spy.spec.js 7/ 18
(.\jest-with-interception\test\moduleA.spy.spec.js 13 /24
(.\sinon-no-interception\test\moduleA.spy.spec.js 9 / 19
(.\sinon-with-interception-proxyquire\test\moduleA.spy.spec.js 8 /31
(.\sinon-with-interception-rewire\test\moduleA.spy.spec.js
(.\sinon-with-interception-rewiremock\test\moduleA.spy.spec.js
(.\testdouble-with-interception\test\moduleA.spy.spec.js

| Tool                                 | Module interception | Spy implementation | Siblings method call | Dependency Path |
| :----------------------------------- | :-----------------: | :----------------: | :------------------: | :-------------: |
| 1. Jasmine                           |         NO          |       [FAKE]       |         [OK]         |    [r/test]     |
| 2. Jest no interception              |         NO          |        [OK]        |         [OK]         |    [r/test]     |
| 3. Mocha + Chai + Sinon              |         NO          |        [OK]        |         [OK]         |    [r/test]     |
| 4. Jest with interception            |         YES         |       [FAKE]       |       [ERROR]        |    [r/test]     |
| 5. Mocha + Chai + Sinon + proxyquire |         YES         |       [FAKE]       |         [OK]         |     [r/sut]     |
| 6. Mocha + Chai + Sinon + rewire     |         YES         |       [FAKE]       |       [ERROR]        |     [name]      |
| 7. Mocha + Chai + Sinon + rewiremock |         YES         |       [FAKE]       |       [ERROR]        |    [r/test]     |
| 8. Mocha + Chai + testdouble         |         YES         |       [FAKE]       |       [EMPTY]        |    [r/test]     |

## References

An Overview of JavaScript Testing in 2019  
https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a

Jest vs Mocha: Which Should You Choose?  
https://blog.usejournal.com/jest-vs-mocha-whats-the-difference-235df75ffdf3

Jasmine vs. Mocha, Chai, and Sinon  
https://davidtang.io/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html
