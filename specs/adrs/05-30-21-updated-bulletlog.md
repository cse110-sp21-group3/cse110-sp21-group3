# [Template, Design, and Implementation of Daily Log Bullet Logging]

* Status: Accepted  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 05-31-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With that in mind and the core feature of BuJo's being logging, how should we design and implement the bullet logging in the daily log? We had previously had a notion of having a separate component for each log, adding one through a modal and submiting. In addition, the nesting feature was a bit complicated and underwhelming, so how do we improve on that?

## Considered Options

1. New tree-based, input-based bullet logging, with bulletList component
   Have all bullet logs stored in a tree, where each bullet log is simply made up of an editable, focused input field and a box for toggling the type of the bullet. Each bullet has keyboard shortcuts for creating, deleting, nesting, and un-nesting a bullet, as well as shortcuts for adding modifiers and completing bullets. Each bullet will store its respective data within its index in the tree, as well as information about parents and children for nesting. Then, we will have the bulletList, which will store all the individual bulletLogs. This component will contain the tree structure, the bullet elements, and other info pertaining to the bullet logs. In addition, this component will be responsible for handling all the funciton callbacks for the bullets, in terms of creating, deleting, adn performing operations on the bullets. This will allow saving data and rendering & persisting saved data on reload.


2. Continue with previous design
   mentioned in [previous bullet log design](052521-bulletlog-design.md)


## Decision Outcome

[option 1] The new design allows for better and more seamless implementation and integration with the daily log, and also is the best decision for the users as it is more connected to the theme of "rapid logging" and the nature of a bullet journal.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
New Design

* Good, because it has a vastly better user interface and is more seamless for the users.
* Bad, because it may involve a little more inherent complexity

### [option 2]
Old Design

* Bad, because it started to become to complicated with many moving components
* Bad, because it is not user-friendly and had a not-so-good UI



