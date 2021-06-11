# CI/CD Pipeline Phase 2 Status

In order to proceed with proper development of our web application, we require a
CI/CD pipeline that can help us increase developer velocity as well as reduce
the number of bugs introduced into the codebase, along with the potential of
inconsistent code style. Since our project consists entirely of a frontend
implementation, all that is required is for us to properly manage and deliver
static HTML, CSS and JS files using a CDN, potentially Netlify or GitHub Pages.

We'll cover the specifics of our selected CI pipeline, what has been already implemented,
and what may change in the future.


## Overview

Our CI/CD pipeline has two general phases, one which involves the preparatory
health check phase, run on all code to be merged to the main branch, along with
the deploy phase, depending on our method of delivery for the application.

The health check phase of our CI/CD pipeline goes through general health checks
in order to make sure our codebase stays clean, healthy. This phase includes
three general jobs run, all run concurrently in order to find as many bugs
across the codebase as possible. These phases include the lint and testing jobs.
The testing phases simply runs our test suite, which
will include code coverage reporting to ensure as much of our codebase as
possible is covered by useful unit tests. Lastly, the linting phase makes sure
that our code follows our imposed style guide, to maintain a consistent code
style across all our source JS files.

Additionally, Codacy has been added as a "second opinion" to manage our code status.
On top of that, JSDoc generation has also been added, and uploaded to GH Pages.

Finally, the deploy phase will only run once the two previous checks pass. It will
simply take the files in our repo and upload them to the CDN of our
choice.

A diagram has been included in our repository of this CI/CD pipeline and can be
found below:

![Image of our CI pipeline](phase2.drawio.png)

## Status

As of now, most of the health check phase is implemented fully, done using `npm`
scripts that can be run locally as well. The test
job runs Jest on our `__tests__` directory, which will, in the future, include a
comprehensive test suite. Our lint job simply runs ESLint across all of our
source JS files, using the previously decided upon style guide made by Airbnb,
since it establishes sane best practices for front-end development.

In the next sprint, we will certainly implement the deploy job in the future, as
soon as we get a Netlify account and a base website running. This will likely
happen within the next sprint.


## Future Considerations

Bear in mind that, as of now, there are some action items that may require
further development for our pipeline. For instance, we have not yet set branch
protection rules for our repository, but unfortunately these may not be possible to set,
since GitHub does not allow free branch protection rules for private repositories.
Additionally, there might be some benefit to adjusting the CI/CD pipeline in order
to more clearly integrate Codacy into the workflow, but our trial unfortunately expired.
