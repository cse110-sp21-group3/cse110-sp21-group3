# Getting Started with development

## Install TailwindCSS on local machine
Run the following command to install `jest`, `tailwindcss` and there dependencies.

```
npm install
``` 
Note: Should run this command from the root of the repo

## To generate tailwindcss stylesheet
While developing, use the following command to generate tailwindcss stylesheet
```
npm run build
```
This command builds `source/public/styles.css` which can be linked to your html files for using tailwindcss classes

## Writing and running tests
To run tests using `jest`, you can run
```
npm test
```

Any other tests must be added in `__tests__/`


## Using Linter
To run linter locally, use the following command:
```
npm run lint /path/to/file
```
Note: Run this command from the root of the repo