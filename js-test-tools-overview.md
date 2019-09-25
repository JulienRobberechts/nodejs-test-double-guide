# Javascript test tools types overview

This list of tools try to sum up which tool you can use for each task. Some tool are doing a lot of different task like Jest so you'll find them in multiple categories. There are also some compatiblite between tools and platform (ES and CommonJS). We'll not cover all but give some stack that you can use to do the job.

| Tool                | Test runner | Assertion | Test double | Module interception | Test doubles for api |
| :------------------ | :---------: | :-------: | :---------: | :-----------------: | :------------------: |
| Jest                |      X      |     X     |      X      |          X          |          -           |
| Jasmine             |      X      |     X     |      X      |          -          |          -           |
| Mocha               |      X      |     -     |      -      |          -          |          -           |
| Chai                |      -      |     X     |      -      |          -          |          -           |
| should.js           |      -      |     X     |      -      |          -          |          -           |
| expect.js           |      -      |     X     |      -      |          -          |          -           |
| better-assert       |      -      |     X     |      -      |          -          |          -           |
| Sinon               |      -      |     -     |      X      |          -          |          X           |
| testdouble          |      -      |     -     |      X      |          X          |          -           |
| proxyquire          |      -      |     -     |      -      |          X          |          -           |
| rewire              |      -      |     -     |      -      |          X          |          -           |
| mock-require        |      -      |     -     |      -      |          X          |          -           |
| babel-plugin-rewire |      -      |     -     |      -      |          X          |          -           |
| mockery             |      -      |     -     |      -      |          X          |          -           |
| rewiremock          |      -      |     -     |      -      |          X          |          -           |
| super-agent         |      -      |     -     |      -      |          -          |          X           |
| Chai-http           |      -      |     x     |      -      |          -          |          X           |
| supertest           |      -      |     x     |      -      |          -          |          X           |
| Nock                |      -      |     x     |      -      |          -          |          X           |

## Test runner

helps to find test in your code, launch test, Generate and display test progress and results.

- Jest
- Mocha
- Jasmine

## Assertion

helps to check the test results.

- Jest
- Jasmine
- Chai (3 flavors: should, expect, assert)
- should.js
- expect.js
- better-assert

## Test Doubles Framework

= Mocking Framework

- Jest (mock)
- Sinon (mock, stub, spy, fake server)
- Jasmine (spies)
- testdouble

## Module interception (by order of popularity)

Other name for the same concept:

- Dependency mocking
- Proxies nodejs require to overriding dependencies during testing
- mocking of Node.js modules
- mock require statements in Node.js

Tools:

- proxyquire
- rewire
- mock-require
- babel-plugin-rewire
- mockery
- testdouble
- rewiremock

## Api Mock

- super-agent
- Sinon (fake server)??

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

- Siblings method call: Is it possible to call other function in the same module.

  1. [OK] possible everything is ok
  1. [EMPTY] return undefined
  1. [ERROR] throw an exception the method doesn't exist.

- If I call the same dependency from an other object. Is it counted/stubed. (Todo)

  1. Yes
  1. No
  1. Error

- Dependency Path in the test

  1. [r/test] Relative to the test
  2. [name] Just the module name (???? TO understand)
  3. [r/sut] Relative to the module under test

- Can the dependency be destructured in the module under test? (Todo)

  1. Yes
  1. No, silently fail
  1. No, error

- Can the import of the module under test be destrustured in the test code? (Todo)
  1. Yes
  1. No, silently fail
  1. No, error

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
