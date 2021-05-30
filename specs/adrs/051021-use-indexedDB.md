# [Data Storage Method]

* Status: Superseded by [ADR-05-25-21-dexie-storage](./052521-dexie-storage.md)  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 05-10-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With that in mind and the nature of a BuJo persisting data over time, how should we store the information & data and how do we retrieve and present it to the user?


## Considered Options

1. localStorage Web API
2. external Database
3. indexedDB Web API

## Decision Outcome

[option 3] indexedDB offers a middle ground between having an external Database and having client-side data persistence using the web api.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
localStorage Web API

* Good, because it is very easy and simple to use
* Bad, because it can only store strings and there are other limitations like being synchronous.

### [option 2]
external Database

* Good, because we can sync data for users across devices
* Bad, because it may take more time to learn and implement

### [option 3]
indexedDB Web API

* Good, because it has most of the functionalities of a database and additional features
* Alright, because it may be a little more complicated than localStorage 


