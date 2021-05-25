# [Use Regular CSS & remove Tailwind]

* Status: Accepted  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 05-25-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With the online format of a BuJo, it should appear visually pleasing, but not too over the top, and have a good design and UI. With that in mind, should we continue with tailwind or switch to regular CSS


## Considered Options

1. Continue with Tailwind
2. Switch to Regular CSS


## Decision Outcome

[option 2] regular CSS allows us to easily integrate styles with web components and not include any unneeded external dependencies which may hinder the project.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
localStorage Web API

* Good, because its snyactically simpler and could include more styles
* Bad, because it may not integrate well with the project.

### [option 2]
external Database

* Good, because it works with web components and is sufficient for the project
* Bad, because it involves a lot more css styling and is not able to have extra styles 



