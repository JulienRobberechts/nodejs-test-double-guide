# Demo Mocking in javascript

## introduction

Mocking your dependencies in order to test it is not so easy. You need to make some choices about:

1. How you should organize your production code to make it easy to mock.
2. What you want to mock.
3. Which mocking tool should I use?
4. Integrate the mocking tool in your solution

The goal is to help you to pick the right solution for you and to copy past it into your code.

## 0. Vocabulary

- Test double
- stub
- spy
- mock

## 1. How you should organize your production code to make it easy to mock.

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

On top of this, intercept an internal function is tricky [See the chapter Intercept internal function](./summary-import-types.md)

## 2. What you want to mock

### 2.1. Type of component to mock

Depending of your component and your test case, you will be interested to mock different type of dependencies:

- some of your own dependencies
- some system dependencies
- some api calls
- some variables
- some database call

### 2.2. Level of mocking

There is 2 types of libraries: stubbing library and module interception library. (See [Sinon documentation](https://sinonjs.org/how-to/stub-dependency/))

- Sinon is simply a stubbing library. Only for simple cases.
- module interception library: solutions targeting link seams or explicit dependency injection
  - For module interception, the type of import is really important. Depending of your project the type of import is really important to choose your mock tool. [see this page](./summary-import-types.md)

#### With module interception

= simple stubbing
= Full mock

#### Without module interception

= Partial mock

## 3. Which mocking tool should I use?

There plenty of test libraries in javascript for different purpose. Some are made to be used together some not. See [Javascript test tools types overview](./js-test-tools-overview.md) for more details.

For Mocking purpose we'll be interested by only those types of tools: Test Doubles library and Module interception library.

### Test Doubles

### Module interception

#### proxyquire

[The Sinon guide](https://sinonjs.org/how-to/link-seams-commonjs/) explains that for bigger need and when you use NodeJs (with CommonJS) using [proxyquire](https://github.com/thlorenz/proxyquire) to construct our seams is the way to go.

See the directory 'sinon-proxyquire' for Module interception by proxyquire and stubing by sinon.

#### rewiremock

todo

#### others

Alternatives to this library are: (by order of popularity)

Some people are against this technic:
https://medium.com/@antonkorzunov/please-stop-playing-with-proxyquire-923fe6009a0a
by the creator of rewiremock

### Api Mock

## 4. Integrate the mocking tool in your solution

This collection of demo try to find the pro and cons of different approaches.

## References

to read:  
https://medium.com/codeclan/mocking-es-and-commonjs-modules-with-jest-mock-37bbb552da43

Please, stop playing with proxyquire  
https://dev.to/thekashey/please-stop-playing-with-proxyquire-11j4
