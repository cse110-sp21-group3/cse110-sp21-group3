# Remove Dexie.js and usage of indexedDB

* Status: accepted
* Deciders: All Team
* Date: 06-08-2021


## Context and Problem Statement

Using Dexie.js, and by extension indexedDB, requires an asynchronous way of managing HTML element rendering, as well as any operation that requires I/O with the database. Due to our previous usage of `localStorage` being composed entirely of synchronous calls, this requires a complete refactor of the majority of our codebase. Unfortunately, due to our constraint in time, this is not feasable.

## Decision Drivers

* Deadline approaching
* No significant benefit from implementing indexedDB for MVP

## Considered Options

* Rewrite entire codebase
* Create additional custom wrapper to turn all DB calls synchronous
* Remove Dexie.js and usage of indexedDB

## Decision Outcome

[option 3] due to our time constraint, we'll need to remove this. However, we'll reconsider adding indexedDB back in the future.

## Pros and Cons of the Options

### Rewrite entire codebase

* Good, because we might catch a few more bugs along the way
* Good, because it allows to do a cursory run-through over other system decisions as well
* Bad, because it takes a significant amount of time

### Create additional custom wrapper to turn all DB calls synchronous

* Good, because ideally it'd simplify usage of Dexie
* Bad, because complexity of wrapper is added on top of effectively an entirely different storage design decision

### Remove Dexie.js and usage of indexedDB

* Good, because it lets us iterate on other pertinent issues faster
* Bad, because this will likely still need to be done when adding media in bullets