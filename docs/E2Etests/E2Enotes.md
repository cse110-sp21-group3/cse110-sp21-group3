# End to End Testing Notes

Notes on how our manual end to end tests ran.


## BuJo App

- Tested deploy (previews) on netlify 


## Welcome Page

- first clear localStorage, then load up the site
- verify that the welcome page appears and there are no errors in the console
- click `ready to continue` and then load up the site again (setting the url to the root)
  - the welcome page should show up again because the journal wasn't yet created
- continue through the journal creation process until you get to the home page
  - now, look at localStorage and ensure that `journalCreated` is set to True
- load up the site again (setting the url to the root) and ensure that the welcome page redirected to the home page


## Journal Creation Pages




## Home Page & Daily Logs

- load up the app and verify that the home page is shown, with the correct journal title, theme, and date
- verfiy that the daily log shows an empty input field with a bullet with placeholder text and the habit trackers is empty, the shortcut tooltip appears, and there are no errors in the console

- add a bullet by typing into the input field and verify the text is correct
- nest a bullet and verify it's nested and can't be nested another level
- verify un-nesting a bullet
- verify the toggling of the bullet types displays the expected types
- delete both a regular bullet and a nested bullet and verify they are deleted and the focus transfers to the previous bullet
- add lots of bullets to ensure the container scrolls
- use the up and down arrows to ensure focus is transferred properly
- use the keyoboard shortcuts for bolding and italcizing a bullet and toggle them, and then use the shortcut for a regular style bullet
- continually check if the bullet content (type, modifier, content, completed) is saving and appearing correctly by reloading the page at various points
- continually check localStorage to ensure that the bullets are being stored properly with their keys and the values are being updated


## Habits/Trends Page & Daily Habits



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




## Routing
