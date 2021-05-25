# [Use Dexie.js as a wrapper for IndexedDB storage]

* Status: Accepted  <!-- optional -->
* Deciders: All Team <!-- optional -->
* Date: 05-25-2021 <!-- optional -->


## Context and Problem Statement

BuJo's are intended to store all types of data, and our BuJo is designed to store bullets for tasks/notes/events, collections, as well as habits. With that in mind and the nature of a BuJo persisting data over time, how should we store the information & data and how do we retrieve and present it to the user?


## Considered Options

1. Use IndexedDB
2. Use Dexie Wrapper


## Decision Outcome

[option 2] the Dexie.js wrapper for IndexedDB provides the same functionalities on a simpler level and is a easier interface to integrate.

## Pros and Cons of the Options <!-- optional -->

### [option 1]
IndexedDB

* Good, because it is a core API
* Bad, because it may be complicated

### [option 2]
Dexie Wrapper

* Good, because it is easy to work with IndexedDB
* Bad, because it is an external API



