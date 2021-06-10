# End to End Testing Notes

Notes on how our manual end to end tests ran.


## BuJo App



## Welcome Page


## Journal Creation Pages


## Home Page & Daily Logs/Habits




## Habits Page



## Past Logs Page



## Monthly Logs Page



## Collections Page
- On page load/reload, verify that each collection that was saved in storage appears on the screen. Also verify that each collection has the previously saved bullets when clicking into a collection.  
- When viewing a collection's contents, verify that clicking the x button closes that collection's contents.
- When viewing the add collection form, verify that clicking the x button closes the form.  
- When creating a new collection:  
    - If the name already exists, after trimming both sides for whitespace, verify that a new collection doesn't get created and it isn't put into storage. Also verify that the error text appears.  
    - If the name is empty or only contains whitespace, verify that a new collection doesn't get created and it isn't put into storage. Also verify that the error text appears.  
    - Otherwise, verify that a new collection does get created and that its name is added to the `collections` array in storage.  
    - Verify that collections can be made by both pressing the enter key and by clicking the submit button.  
- If there was an error when making a new collection, then verify that if we close the creation form and reopen it, then the error text won't appear.
- When adding content to a collection, verify that a new key with the collection's name gets created, where its value is an object containing the content's info.  
- When editing a collection's content, verify that the content gets auto-saved/updated storage.  
- On collection deletion, verify that the collection's name is removed from the `collections` array and verify that the collection's name, as a key, and the bullets, as its value, are removed from storage.  

## Settings Page




## Components


### Navbar & Menu



### Habit Trackers


### TextEditor, BulletList, Bullets



