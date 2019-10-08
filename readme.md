# Guide to test double your nodeJS code

- [Guide to test double your nodeJS code](#guide-to-test-double-your-nodejs-code)
  - [1. introduction](#1-introduction)
    - [Are you mocking me?](#are-you-mocking-me)
    - [Scope](#scope)
    - [Vocabulary](#vocabulary)
    - [General definition](#general-definition)
    - [Types of test double](#types-of-test-double)
    - [Test double in real life](#test-double-in-real-life)
  - [2. Decide what you want to mock](#2-decide-what-you-want-to-mock)
    - [2.1. Type of component to mock](#21-type-of-component-to-mock)
    - [2.2. Make your code easy to test](#22-make-your-code-easy-to-test)
    - [2.3. Level of mocking](#23-level-of-mocking)
      - [Partial test double](#partial-test-double)
      - [Full test double](#full-test-double)
  - [3. Choose the right tool](#3-choose-the-right-tool)
    - [Choose the right type of Javascript test library](#choose-the-right-type-of-javascript-test-library)
      - [Test runner](#test-runner)
      - [Assertion Lib](#assertion-lib)
      - [Test doubles creator](#test-doubles-creator)
      - [Module interception](#module-interception)
    - [Deep dive into each libraries](#deep-dive-into-each-libraries)
      - [Test Doubles implementations across libraries](#test-doubles-implementations-across-libraries)
      - [Specificities of each libraries](#specificities-of-each-libraries)
        - [What is '*Module interception*'](#what-is-module-interception)
        - [What is '*Spy implementation*'](#what-is-spy-implementation)
        - [What is '*Siblings method call*'](#what-is-siblings-method-call)
        - [What is '*Dependency Path*'](#what-is-dependency-path)
  - [References](#references)

## 1. introduction

### Are you mocking me?

== Vocabulary ==

Mock = test double in fact.



== Crap:
Mocking your dependencies in order to test it is not so easy. You need to make some choices about:

1. How you should organize your production code to make it easy to mock.
2. Choose what you want to mock.
3. Choose the mocking library should I use?
4. Integrate the mocking tool in your solution


### Scope

My goal in this document is to answer to the most general question we can have when we want to create some tests double in Node.JS and have a code example for each framework.

### Vocabulary

### General definition

Mock is sometimes used to refer to all type of **test doubles**, but in fact **mock** is just one type of test doubles.

Definition of Test doubles (from Wikipedia):

```
In automated unit testing, it may be necessary to use objects or procedures that look and behave like their release-intended counterparts, but are actually simplified versions that reduce the complexity and facilitate testing. A test double is a generic (meta) term used for these objects or procedures.
```

### Types of test double

Test doubles is a general term to refer to different type of objects. This list describe 5 of the most used by order of complexity: 

- Dummies: simple implementation of an interface. It's not intended to be used. It's not really useful in Javascript.
- spy: (or Test Spy) get information on dependency usage without changing the behavior. (Number of call, arguments)
- stub: (= Dummy + static implementation) test double with modification of the behavior in order to test your component.
- Fakes: (= stub + simple implementation)
- Mock: (= stub + internal test) test double which is aware about the test (with some test assertion for example).

**Be carful**: Mock as this type of specific type of test double built specifically for your test is in fact consider as an ___anti-pattern___ most of the time. It breaks the AAA (Arrange Act Assert) test structure. You should probably consider other types of test double before.

### Test double in real life

In javascript, __Dummies__ are not really useful because there is no need to implement any fixed interface. Therefore you'll never have to implement test doubles if it's not intended to be used in your component under test.

__Spies__ are non invasive test double provided by almost all the testing frameworks. You could technically implement a spy yourself but it's really not worth it.

__Stubs__ are invasive test double provided by almost all the testing frameworks. You could technically implement a stub yourself but it's really not worth it.

__Fakes__ are just smart stubs, their implementation is smarter and fully functional in contrast to a stub which have a very basic implementation (static most of the time). We'll consider Fakes and stub as one category.

__Mocks__ are just stubs with some awareness of your test. Mocks are not the first type of test double to consider. Sinon have special objects for this, on other frameworks you need to use stubs.



## 2. Decide what you want to mock

### 2.1. Type of component to mock

Depending of your component and your test case, you will be interested to mock different type of dependencies:

- some of your own dependencies
- some system dependencies

=> TO CHECK: Mocking everywhere or just my code !!!!

### 2.2. Make your code easy to test

How you should organize your production code to make it easy to mock.

The basic structure of javascript is the module.
Your test should stay independent from internal details of the module.

```
In order to test your component in isolation, which dependencies do you need to replace?
```

Once you have identify those dependencies (functions, modules) they'll become the seams of your component. The seams are the places where two parts of the software meet and where something else can be injected/replaced.

In javascript the good ways to expose your seams are as

- 1. Module dependencies (to an other module or a package)
- 2. Function parameters (including constructor)

Of course, some tools can help you to modify some implementation details like [rewire
](https://github.com/jhnns/rewire) but using them to create your test is a very bad practice. It breaks the all the encapsulation principle and lead to a lot of problems. So the best practice is to stick to this 3 way of creating seams.

If to test your component you would need to replace an internal function, you need first to refactor your component to expose this function as a seam before thinking of mocking anything.

On top of this, intercept an internal function is tricky (To Explain)

### 2.3. Level of mocking

Test doubles in javascript can be achieved at 2 different levels. Those 2 different level are often named Partial test double and full test double.

To remove: I propose to name them: POST-import test doubles and import-interception test doubles.

no-interception vs partial-testdouble

There is 2 types of libraries: stubbing library and module interception library.

- Sinon is simply a stubbing library. Only for simple cases.
- module interception library: solutions targeting link seams or explicit dependency injection
  - For module interception, the type of import is really important. Depending of your project the type of import is really important to choose your mock tool. [see this page](./summary-import-types.md)
  

[This very good article and project explain how it's tricky to make partial import in ES6](https://codewithhugo.com/jest-mock-spy-module-import/)

#### Partial test double

![test double partial](./out/_schemas/test-double-partial/test-double-partial.svg)

This is the only way to get a real spy and a simple ack to to get a stub (for stubs prefer Full test double).

Step by step:

1. Import your component under test (of course)
2. Import the component dependency
3. Replace each method dependency with your method spy or stub.

For this you just need a test doubles library. It's named __partial test double__ because you are keeping the behavior of all your dependency except the part you want to spy or stub. You can also name it 'test double without module interception'.

This is the way to go to spy your dependency. You can also stub it but partial stub is consider as an __anti-pattern__ (REF NEEDED), it's simple but could lead to some problems. (TO COMPLETE)

#### Full test double

![test double full](./out/_schemas/test-double-full/test-double-full.svg)

This is the best way to stub your dependency in a clean way.
To make a full stub you need a javascript module interception library. (SEE Different options HERE...)

__Step by step__: The way to intercept the module dependency in your component under test will not be the same depending on the library but the only common point is that you SHOULD NOT import the component dependency directly.

See example with:
 [Jest](./jest-with-interception/test/moduleA.stub.spec.js),
 [proxyquire](./sinon-with-interception-proxyquire/test/moduleA.stub.spec.js),
 [rewire](./sinon-with-interception-rewire/test/moduleA.stub.spec.js),
 [rewiremock](./sinon-with-interception-rewiremock/test/moduleA.stub.spec.js),
 [testdouble](./testdouble-with-interception/test/moduleA.stub.spec.js),

It's named __full test double__ because you are not keeping anything of your original dependency behavior.

Spying in a __full test double__ is not possible, because by intercepting the javascript dependent module you are not  importing the original module at all. You have to stub it fully to be able to test your component.

## 3. Choose the right tool

There plenty of test libraries in javascript for different purpose. Some are made to be used together some not. See [Javascript test tools types overview](./js-test-tools-overview.md) for more details.

For Mocking purpose we'll be interested by only those types of tools: Test Doubles library and Module interception library.


This matrix sum up the purpose of some major javascript test libraries.

### Choose the right type of Javascript test library

To perform your 'test double' tests, you'll need those 4 features: a test runner, an assertion library, a test double creator, Module interceptor. If you just want to create spies, you just need the 3 firsts ones.

| Library / purpose | Test runner | Assertion Lib | Test double creator | Module interceptor |
| :---------------- | :---------: | :-----------: | :-----------------: | :----------------: |
| jest              |      X      |       X       |          X          |         X          |
| jasmine           |      X      |       X       |          X          |         -          |
| mocha             |      X      |       -       |          -          |         -          |
| chai              |      -      |       X       |          -          |         -          |
| should.js         |      -      |       X       |          -          |         -          |
| expect.js         |      -      |       X       |          -          |         -          |
| better-assert     |      -      |       X       |          -          |         -          |
| sinon             |      -      |       -       |          X          |         -          |
| testdouble        |      -      |       -       |          X          |         X          |
| proxyquire        |      -      |       -       |          -          |         X          |
| rewire            |      -      |       -       |          -          |         X          |
| mock-require      |      -      |       -       |          -          |         X          |
| rewiremock        |      -      |       -       |          -          |         X          |

Some tool are like a swiss army knife for tests (like Jest) doing a lot of different task so you'll find them in multiple categories. There are also some compatibility between tools and platform (ES and CommonJS).

Let's define each test purpose...

#### Test runner

The test runner helps to find tests in your code, launch test, generate and display test progress and results.
The main one are: Jest, Mocha, Jasmine.

#### Assertion Lib

The assertion helps to check the test results.
It's already included in Jest and Jasmine. If you don't use those library you (and probably mocha as test runner) you can pick _chai_ or should.js, expect.js, better-assert.The most popular stack are Jest or mocha+chai. 

#### Test doubles creator

We are arriving to our main subject: test doubles.
In this section we are only talking about way to provide spies and stubs.

 Full test doubles are often used with javascript module interception but it's an add-on.
The main libraries are: Jest, Sinon, Jasmine, Testdouble (the library, not the concept).

#### Module interception
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

### Deep dive into each libraries

In order to understand all the different combination of libraies and how to use them together, I have created the same basic example with 8 different stacks.  

[jasmine]: ./jasmine-no-interception
[jest-no-int]: ./jest-no-interception
[sinon]: ./sinon-no-interception
[jest-int]: ./jest-with-interception
[proxyquire]: ./sinon-with-interception-proxyquire
[rewire]: ./sinon-with-interception-rewire
[rewiremock]: ./sinon-with-interception-rewiremock
[testdouble]: ./testdouble-with-interception

| Stack tested in this project / features            | Test runner | Assertion | Test double | Module interception |
| :------------------------------------------------- | :---------: | :-------: | :---------: | :-----------------: |
| 1. [Jasmine][jasmine]                              |      X      |     X     |      X      |          -          |
| 2. [Jest no interception][jest-no-int]             |      X      |     X     |      X      |          -          |
| 3. [Mocha + Chai + Sinon][sinon]                   |      X      |     X     |      X      |          -          |
| 4. [Jest with interception][jest-int]              |      X      |     X     |      X      |          X          |
| 5. [Mocha + Chai + Sinon + proxyquire][proxyquire] |      X      |     X     |      X      |          X          |
| 6. [Mocha + Chai + Sinon + rewire][rewire]         |      X      |     X     |      X      |          X          |
| 7. [Mocha + Chai + Sinon + rewiremock][rewiremock] |      X      |     X     |      X      |          X          |
| 8. [Mocha + Chai + testdouble][testdouble]         |      X      |     X     |      X      |          X          |

Each solutions will test the following basic code. The goal is to test the module A which reference the module B. We'll do it with spy and stub with partial or full test double.

*`ModuleB.js`*

```js
function DoItB() {
  return "B";
}

module.exports = { DoItB };
```

*`ModuleA.js`*

```js
var moduleB = require("./moduleB");

function DoItA() {
  return "A(" + moduleB.DoItB() + ")";
}

module.exports = { DoItA };
```

#### Test Doubles implementations across libraries

This present on overview of spy, stub and mock in different libraries:

| Tool                                                   |             spy |            stub |          mock |
| :----------------------------------------------------- | --------------: | --------------: | ------------: |
| [Sinon](https://www.npmjs.com/package/sinon)           |     sinon.spy() |    sinon.stub() |  sinon.mock() |
| [Jest](https://www.npmjs.com/package/jest)             |    jest.spyOn() |       jest.fn() | no / use stub |
| [Jasmine](https://www.npmjs.com/package/jasmine)       | jasmine.spyOn() | jasmine.spyOn() | no / use stub |
| [testdouble](https://www.npmjs.com/package/testdouble) |       td.func() |       td.func() | no / use stub |

#### Specificities of each libraries

Let's now look at some implementation details about how each libraries (use in each stacks) deal with some specific requirements.

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

[req1]: #what-is-module-interception
[req2]: #what-is-spy-implementation
[req3]: #what-is-siblings-method-call
[req4]: #what-is-dependency-path


| Tool                                 | [Module interception][req1] |     [Spy implementation][req2] |         [Siblings method call][req3] |              [Dependency Path][req4] |
| :----------------------------------- | --------------------------: | -----------------------------: | -----------------------------------: | -----------------------------------: |
| 1. Jasmine                           |                          NO | :confused: [FAKE][jasmine-spy] |                  [SAME][jasmine-sib] |                [r/test][jasmine-dep] |
| 2. Jest no interception              |                          NO |        [SAME][jest-no-int-spy] |              [SAME][jest-no-int-sib] |            [r/test][jest-no-int-dep] |
| 3. Mocha + Chai + Sinon              |                          NO |              [SAME][sinon-spy] |                    [SAME][sinon-sib] |                  [r/test][sinon-dep] |
| 4. Jest with interception            |                         YES |           [FAKE][jest-int-spy] |                [ERROR][jest-int-sib] |               [r/test][jest-int-dep] |
| 5. Mocha + Chai + Sinon + proxyquire |                         YES |         [FAKE][proxyquire-spy] |  :dizzy_face: [SAME][proxyquire-sib] | :thumbsdown: [r/sut][proxyquire-dep] |
| 6. Mocha + Chai + Sinon + rewire     |                         YES |             [FAKE][rewire-spy] |                  [ERROR][rewire-sib] |   :thumbsdown: [VarName][rewire-dep] |
| 7. Mocha + Chai + Sinon + rewiremock |                         YES |         [FAKE][rewiremock-spy] |              [ERROR][rewiremock-sib] |             [r/test][rewiremock-dep] |
| 8. Mocha + Chai + testdouble         |                         YES |         [FAKE][testdouble-spy] | :dizzy_face: [EMPTY][testdouble-sib] |             [r/test][testdouble-dep] |

Let's explain the meaning of each column.

##### What is '*Module interception*'

You have proper module interception library when you don't have to import the original dependency in your test. But in fact there is multiple way to do module interception and each library is doing this differently.

##### What is '*Spy implementation*'

Is the behavior of the original dependency stay the same? If the answer is yes, it's a real spy. If not, it's a fake spy, it's just an empty stub returning undefined. You can't expect any Module interception library to keep the behavior of the original dependency because by nature, Module interception will NEVER use your original dependency at all.

##### What is '*Siblings method call*'

Once you have stubbed a method in your dependency, The question is to understand if calling a sibling method has the expected behavior. You can expect 3 types of behavior:

  1. **SAME**: The original behavior of the sibling method is not modified, It's generally what people call a partial test double.
  2. **EMPTY** The sibling method return undefined. It's a wired mix between a partial and a full test double.
  3. **ERROR** The sibling method throw an exception "the method doesn't exist". It's what you can expect from a full test double. It's probably the best option  because you are sure that no other method of your dependency is used.

Exceptions:

- *Proxyquire* is supposed to be a module interception library (for full test double) but the sibling method will stay unchanged!
- *Testdouble* is supposed to be a module interception library (for full test double) but the sibling method will still exists with an undefined behavior!

##### What is '*Dependency Path*'

In your test code you'll have to specify the path to the dependency you want to test double. You can expect 3 types of behavior:

  1. **r/test** The path is relative to the test file. It's the best option.
  2. **r/sut** The path is relative to the module under test. It's a bad idea! In some case it will be tricky.
  3. **VarName** The name of the variable in the system under test. It's a bad idea!

## References

[Understanding Test Doubles (Mock vs Stub)](https://adamcod.es/2014/05/15/test-doubles-mock-vs-stub.html)

[mocking ES and commonJS modules with jest mock](http://www.google.com)

[clean code](https://medium.com/codeclan)

[Please stop playing with proxyquire](https://dev.to/thekashey/please-stop-playing-with-proxyquire-11j4)
[Please stop playing with proxyquire](https://medium.com/@antonkorzunov/please-stop-playing-with-proxyquire-923fe6009a0a)
by the creator of rewiremock

[Sinon documentation](https://sinonjs.org/how-to/stub-dependency/)

[An Overview of JavaScript Testing in 2019](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2019-264e19514d0a)

[Jest vs Mocha: Which Should You Choose?](https://blog.usejournal.com/jest-vs-mocha-whats-the-difference-235df75ffdf3)

[Jasmine vs. Mocha, Chai, and Sinon](https://davidtang.io/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html)
