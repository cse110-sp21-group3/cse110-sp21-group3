# [Template, Design, and Implementation of Daily Log Bullet Logging]

* Status: Accepted  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 05-24-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With that in mind and the core feature of BuJo's being logging, how should we design and implement the bullet logging in the daily log?

## Considered Options

1. Use web components
    - each bullet log is a separate component, customized from the bullet entry template
    - each bullet has all of the features contained within itself (edit, delete, complete)
    - nested bullets are part of the component, but separate in terms of content & organization
    - adding bullets is done on a page level, and a new component gets inserted into the DOM
    - bullets are structured with having a key, entry, modifier, content, type, completed, nestedContent, nestedContentAdded, nestedContentCompleted
    - the entry object will contain JSON notation for the main bullet log, while the nested bullet log is in the form of an input field (due to complexity)

2. No Web Components
    - the daily logs page would contain all info about the logs, and would be responsible for modifying each one
    - each bullet would be some sort of template added to the DOM
    - not sure how to integrate/implement logging features


## Decision Outcome

[option 1] web components allows better implementation and more possible features making it easier to add all the features.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
Web Components

* Good, because it allows for implementation of all features, and better design overall
* Bad, because it may involve more complexity

### [option 2]
No Web Components

* Good, because it may be much simpler
* Bad, because it may not result in the smooth implementation of all features



