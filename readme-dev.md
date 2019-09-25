# Dev notes

## focus

- only nodejs = commonJS
- only good practices : no internal mocking demonstration
- no api mock anymore.

## Questions to solve

- when there is interception, it's not a spy anymore it's a mock (at least with Jest)

## in progress

- Review all tests

  - move logic into before-each

## todo

- readme: explanation of moduleA/moduleB as System under test / dependency
- readme: inventory of relative paths: relative from the test to the dependency OR NOT???
  =>
- readme: talk about : The AAA (Arrange, Act, Assert) pattern is a common way of writing unit tests for a method under test.
- readme: talk about : side effects of each framework.
- readme: multiple way to use sinon: reset vs restore
- readme: no-interception vs partial-testdouble

## Additional content:

- Can the dependency be destructured in the module under test? (Todo)

  1. Yes
  1. No, silently fail
  1. No, error

- Can the import of the module under test be destrustured in the test code? (Todo)

  1. Yes
  1. No, silently fail
  1. No, error

- If I call the same dependency from an other object. Is it counted/stubed. (Todo)

  1. Yes
  1. No
  1. Error
