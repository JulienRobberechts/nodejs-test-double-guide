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
| testdouble          |      -      |     -     |      X      |         !!?         |          -           |
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

Demo of some tool stacks:

| Tool                                 | Test runner | Assertion | Test double | Module interception |
| :----------------------------------- | :---------: | :-------: | :---------: | :-----------------: |
| 1. Jest no interception              |      X      |     X     |      X      |          -          |
| 2. Jest with interception            |      X      |     X     |      X      |          X          |
| 3. Jasmine                           |      X      |     X     |      X      |          -          |
| 4. Mocha + Chai + Sinon              |      X      |     X     |      X      |          -          |
| 5. Mocha + Chai + Sinon + proxyquire |      X      |     X     |      X      |          X          |
| 6. Mocha + Chai + Sinon + rewire     |      X      |     X     |      X      |          X          |
| 7. Mocha + Chai + Sinon + rewiremock |      X      |     X     |      X      |          X          |
| 8. Mocha + Chai + Sinon + testdouble |      X      |     X     |      X      |          X          |

## References

An Overview of JavaScript Testing in 2019  
https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a

Jest vs Mocha: Which Should You Choose?  
https://blog.usejournal.com/jest-vs-mocha-whats-the-difference-235df75ffdf3

Jasmine vs. Mocha, Chai, and Sinon  
https://davidtang.io/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html
