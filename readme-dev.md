# Dev notes

## Current focus

- only nodejs = commonJS
- only good practices : no anti patterns
- no api test double anymore.
- only for your own dependencies NOW

## Additional content

### features to test

- Can the dependency be destructured in the module under test? (Todo)

  1. Yes
  2. No, silently fail
  3. No, error

- Can the import of the module under test be destrustured in the test code? (Todo)

  1. Yes
  1. No, silently fail
  1. No, error

- If I call the same dependency from an other object. Is it counted/stubed. (Todo)

  1. Yes
  1. No
  1. Error
  
### Make your code easy to test (draft)

How you should organize your production code to make it easy to test double?

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

If to test your component you would need to replace an internal function, you need first to refactor your component to expose this function as a seam before thinking of test double anything.

On top of this, intercept an internal function is tricky (To Explain)