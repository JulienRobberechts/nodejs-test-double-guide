# Dev notes

## Current focus

- only nodejs = commonJS
- only good practices : no anti patterns
- no api test double anymore.
- only for your own dependencies NOW

## Additional subjects

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
