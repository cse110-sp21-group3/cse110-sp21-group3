# [Breakdown of Pages and Components]

* Status: Accepted  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 06-09-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With that in mind and the variety of pages in the BuJo, how should we organize the pages and components?


## Considered Options

1. Organize by pages and have components that all pages can pull from. So, have different directories for the home page, creation page, etc, and also have a separate directory for the components.

2. Organize by file type having all html, js, css, and component files in separate directories. So, include all html files in one dir, all js files in another and all css files in another.


## Decision Outcome

[option 1] Chose to organize by pages because it was a lot cleaner and made more sense in terms of breaking down the different sections of our app.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
Organize by pages

* Good, because it is a lot cleaner and more structured
* Good because it makes it easier to work with delegation of tasks in terms of version control and merging and pushing branches

### [option 2]
Organize by file type

* Bad because it can become too cluttered with too many different files in one place 
* Bad because there can end up being some unecessary complications when working on different tasks


### Note:

Page and component breakdown can be accessed through the appropriate links in the root readme.
