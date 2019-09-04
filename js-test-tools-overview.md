# Javascript test tools types overview

This list of tools try to sum up which tool you can use for each task. Some tool are doing a lot of different task like Jest so you'll find them in multiple categories. There are also some compatiblite between tools and platform (ES and CommonJS). We'll not cover all but give some stack that you can use to do the job.

CANDIDATES TO LOOK
- jsdom / (Node.js + jsdom) 

## Tests types
- Unit Tests - Testing of individual component by supplying input and making sure the output is as expected.
- Integration Tests - Testing processes across several component.
- Functional Tests (e2e tests) - Testing on the website by browser automation.

## Test runner
helps to find test in your code, launch test, Generate and display test progress and results.

- Mocha (Very flexible) | node.js and browser
- Jest (out of the box)
- Jasmine | node.js and browser
- Karma??
- testcafe??
- Cypress??

## Assertion
helps to check the test results.

- Chai (3 flavors: should, expect, assert)
- Jest
- Jasmine
- should.js
- expect.js
- better-assert

## Snapshot testing
- Jest
- Ava

## Code coverage
- Istanbul
- Jest
- Blanket

## End to end tests (test on the browser)
- Cypress
- Selenium

## Mocking and spy / Test Doubles??
- Sinon (mock, stub, spy, fake server)
- Jest (mock)
- Jasmine (spies)
- testdouble

## Module interception (by order of popularity)
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



Vocabulary:
- Test Doubles
- stunt doubles

# References

An Overview of JavaScript Testing in 2019  
https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a

Jest vs Mocha: Which Should You Choose?  
https://blog.usejournal.com/jest-vs-mocha-whats-the-difference-235df75ffdf3

Jasmine vs. Mocha, Chai, and Sinon  
https://davidtang.io/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html