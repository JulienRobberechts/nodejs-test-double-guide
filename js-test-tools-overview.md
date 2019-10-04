
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

## Which Js test lib for which purpose?

| Library / purpose | Test runner | Assertion | Test double | Module interception |
| :---------------- | :---------: | :-------: | :---------: | :-----------------: |
| jest              |      X      |     X     |      X      |          X          |
| jasmine           |      X      |     X     |      X      |          -          |
| mocha             |      X      |     -     |      -      |          -          |
| chai              |      -      |     X     |      -      |          -          |
| should.js         |      -      |     X     |      -      |          -          |
| expect.js         |      -      |     X     |      -      |          -          |
| better-assert     |      -      |     X     |      -      |          -          |
| sinon             |      -      |     -     |      X      |          -          |
| testdouble        |      -      |     -     |      X      |          X          |
| proxyquire        |      -      |     -     |      -      |          X          |
| rewire            |      -      |     -     |      -      |          X          |
| mock-require      |      -      |     -     |      -      |          X          |
| rewiremock        |      -      |     -     |      -      |          X          |

Some tool are like a swiss army knife for tests (like Jest) doing a lot of different task so you'll find them in multiple categories. There are also some compatibility between tools and platform (ES and CommonJS).

Let's define each test purpose...

## Javascript test features?

### Test runner

The test runner helps to find tests in your code, launch test, generate and display test progress and results.
The main one are: Jest, Mocha, Jasmine.

### Assertion

The assertion helps to check the test results.
It's already included in Jest and Jasmine. If you don't use those library you (and probably mocha as test runner) you can pick _chai_ or should.js, expect.js, better-assert.The most popular stack are Jest or mocha+chai. 

### Test Doubles

We are arriving to our main subject: test doubles.
In this section we are only talking about way to provide spies and stubs.

 Full test doubles are often used with javascript module interception but it's an add-on.
The main libraries are: Jest, Sinon, Jasmine, Testdouble (the library, not the concept).

### Module interception
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
- testdouble
- rewiremock

## Test Doubles implementations across libraries

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

[jasmine]: ./jasmine-no-interception
[jest-no-int]: ./jest-no-interception
[sinon]: ./sinon-no-interception
[jest-int]: ./jest-with-interception
[proxyquire]: ./sinon-with-interception-proxyquire
[rewire]: ./sinon-with-interception-rewire
[rewiremock]: ./sinon-with-interception-rewiremock
[testdouble]: ./testdouble-with-interception

| Tool                                               | Test runner | Assertion | Test double | Module interception |
| :------------------------------------------------- | :---------: | :-------: | :---------: | :-----------------: |
| 1. [Jasmine][jasmine]                              |      X      |     X     |      X      |          -          |
| 2. [Jest no interception][jest-no-int]             |      X      |     X     |      X      |          -          |
| 3. [Mocha + Chai + Sinon][sinon]                   |      X      |     X     |      X      |          -          |
| 4. [Jest with interception][jest-int]              |      X      |     X     |      X      |          X          |
| 5. [Mocha + Chai + Sinon + proxyquire][proxyquire] |      X      |     X     |      X      |          X          |
| 6. [Mocha + Chai + Sinon + rewire][rewire]         |      X      |     X     |      X      |          X          |
| 7. [Mocha + Chai + Sinon + rewiremock][rewiremock] |      X      |     X     |      X      |          X          |
| 8. [Mocha + Chai + testdouble][testdouble]         |      X      |     X     |      X      |          X          |

## Specificity of each stack

[jasmine-spy]: ./jasmine-no-interception/test/moduleAspySpec.js#L9
[jasmine-sib]: ./jasmine-no-interception/test/moduleAspySpec.js#L19
[jasmine-dep]: ./jasmine-no-interception/test/moduleAspySpec.js#L19

[jest-no-int-spy]: ./jest-no-interception/test/moduleA.spy.spec.js#L7
[jest-no-int-sib]: ./jest-no-interception/test/moduleA.spy.spec.js#L18
[jest-no-int-dep]: ./jest-no-interception/test/moduleA.spy.spec.js#L18

[sinon-spy]: ./sinon-no-interception/test/moduleA.spy.spec.js#L9
[sinon-sib]: ./sinon-no-interception/test/moduleA.spy.spec.js#L9
[sinon-dep]: ./sinon-no-interception/test/moduleA.spy.spec.js#L19

[jest-int-spy]: ./jest-with-interception/test/moduleA.spy.spec.js#L13
[jest-int-sib]: ./jest-with-interception/test/moduleA.spy.spec.js#L24
[jest-int-dep]: ./jest-with-interception/test/moduleA.spy.spec.js#L24

[proxyquire-spy]: ./sinon-with-interception-proxyquire/test/moduleA.spy.spec.js#L8
[proxyquire-sib]: ./sinon-with-interception-proxyquire/test/moduleA.spy.spec.js#L31
[proxyquire-dep]: ./sinon-with-interception-proxyquire/test/moduleA.spy.spec.js#L31

[rewire-spy]: ./sinon-with-interception-rewire/test/moduleA.spy.spec.js
[rewire-sib]: ./sinon-with-interception-rewire/test/moduleA.spy.spec.js
[rewire-dep]: ./sinon-with-interception-rewire/test/moduleA.spy.spec.js

[rewiremock-spy]: ./sinon-with-interception-rewiremock/test/moduleA.spy.spec.js
[rewiremock-sib]: ./sinon-with-interception-rewiremock/test/moduleA.spy.spec.js
[rewiremock-dep]: ./sinon-with-interception-rewiremock/test/moduleA.spy.spec.js

[testdouble-spy]: ./testdouble-with-interception/test/moduleA.spy.spec.js
[testdouble-sib]: ./testdouble-with-interception/test/moduleA.spy.spec.js
[testdouble-dep]: ./testdouble-with-interception/test/moduleA.spy.spec.js

| Tool                                 | Module interception |   Spy implementation   |  Siblings method call   |      Dependency Path      |
| :----------------------------------- | :-----------------: | :--------------------: | :---------------------: | :-----------------------: |
| 1. Jasmine                           |         NO          |  [FAKE][jasmine-spy]   |    [OK][jasmine-sib]    |   [r/test][jasmine-dep]   |
| 2. Jest no interception              |         NO          | [OK][jest-no-int-spy]  |  [OK][jest-no-int-sib]  | [r/test][jest-no-int-dep] |
| 3. Mocha + Chai + Sinon              |         NO          |    [OK][sinon-spy]     |     [OK][sinon-sib]     |    [r/test][sinon-dep]    |
| 4. Jest with interception            |         YES         |  [FAKE][jest-int-spy]  |  [ERROR][jest-int-sib]  |  [r/test][jest-int-dep]   |
| 5. Mocha + Chai + Sinon + proxyquire |         YES         | [FAKE][proxyquire-spy] |  [OK][proxyquire-sib]   |  [r/sut][proxyquire-dep]  |
| 6. Mocha + Chai + Sinon + rewire     |         YES         |   [FAKE][rewire-spy]   |   [ERROR][rewire-sib]   |    [name][rewire-dep]     |
| 7. Mocha + Chai + Sinon + rewiremock |         YES         | [FAKE][rewiremock-spy] | [ERROR][rewiremock-sib] | [r/test][rewiremock-dep]  |
| 8. Mocha + Chai + testdouble         |         YES         | [FAKE][testdouble-spy] | [EMPTY][testdouble-sib] | [r/test][testdouble-dep]  |

- Spy implementation: real or fake spy
  1. [OK] Real spy the behavior is the same
  2. [FAKE] Just empty stub: return undefined.

- Siblings method call: Is it possible to call other function in the same module. (definition of Partial/Full) (for spy and stubs)

  1. [OK] possible everything is ok, It's a partial test double.
  2. [EMPTY] return undefined. It's a wired mix between a partial and a full test double.
  3. [ERROR] throw an exception the method doesn't exist. It's a full test double. You are sure that any method of your dependency is used.

- Dependency Path in the test (for spy and stubs)

  1. [r/test] Relative to the test. It's the best.
  2. [r/sut] Relative to the module under test. It's a bad idea!
  3. [name] The name of the variable in the system under test. It's a bad idea!

## References

An Overview of JavaScript Testing in 2019  
https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a

Jest vs Mocha: Which Should You Choose?  
https://blog.usejournal.com/jest-vs-mocha-whats-the-difference-235df75ffdf3

Jasmine vs. Mocha, Chai, and Sinon  
https://davidtang.io/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html
