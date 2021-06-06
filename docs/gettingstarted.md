# Getting Started with development

## Writing and running tests
To run tests using `jest`, you can run
```
npm test
```

Any other tests must be added in `__tests__/`


## Using Linter
Before pushing your commits to remote, it is recommended that you run linters locally so as to avoid faliling pipeline. 
To check for linting errors, use the command: 
```
npm run lint
```

You can fix minute errors automatically by using:
```
npm run lint:fix
```
