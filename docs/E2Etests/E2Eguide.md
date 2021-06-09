# End to End Testing Guide/Procedures

Procedures we used when performing manual end to end tests.
Procedure for E2E tests can be found at [E2Enotes](E2Enotes.md)

## Setup

1. Push feature branch & validate building, linting, testing, and Codacity analysis checks were successful. If not, first fix those errors. 
2. Either use VSCode's Live Server or Netlify's deploy preview to check branch site is running.
3. Open a Pull Request and request reviews through Github and/or team's Slack pull-requests channel, or ask for a branch review in team's general channel.

# Procedures

Before you merge any changes to `main`, please ensure you pass these end to end tests for the app.

1. Open the netlify deploy preview
2. Ensure page does not redirect until you hit `Ready to Continue?`
3. Hit `Ready to Continue?`
4. Pick any journal style, enter journal name and select/enter a theme
5. Ensure you are at the daily logs page. On the daily log page test the text editor:
   - Add text into the daily log bullets using functionalities like forward/backward nesting, creating new bullet, bold/italicise text
   - Use `Up` and `Down` arrows to navigate between your bullets
   - After the `saving...` text disappears reload the page and ensure all the text was retained
6. Next we will test the past log functionality
   - Open local storage and modify the entry with the key `DL{month}-{day}-{year}` to a previous month. 
   - Use navbar to go to previous logs page and select date you modified the entry to and ensure it displays the text content you added previously
   - Ensure you are not able to edit it
7. Now, use the navbar to go to the trends page and create a new habit tracker
8. Move back to the daily log page and ensure you see the new habit tracker on the right container
9.  Next, click the habit tracker circle and ensure it turns into a different color
10. To finish testing habit trackers, move to the trends page and ensure the circle for the current day is filled with the selected color
11. Move to monthly log page and ensure you are able to scroll both panes, task editor and event editor seperately.
12. Add text to event and task editors and ensure it is retained on reload
13. Change the month and ensure it displays empty editors (because you haven't written any other monthly log)
14. Return to the current month and ensure the text you added appears
15. Move to settings page and ensure your journal-name/theme/style changes are updated on daily log
16. Move to collections page and follow these steps
    - Add a new collection
    - Click on the collection and add text to it
    - Close the collection and reload the page
    - Open the new collection again and ensure your text is retained
    - Repeat this process with a second new collection and ensure retained text is accurate

If you have **passed** all these manual tests succesfully, you don't seem to have broken the basic functionality of the app.
However, in case you **failed** any of the tests, fix the issue before you merge. 

Disclaimer: It should be noted that these E2E tests help you quickly check basic functionalities of all the components. Apart from these tests, please make sure you are testing the specific component/page you are modifying in the PR thoroughly. Notes on these are included in [E2ENotes](E2Enotes.md)



## General Notes

- test in multiple browsers, if possible
- test resizing window and screen size
- test if data is persisted after reloads
- do checks of localStorage to ensure that the correct keys and data are stored
- test different functionalities in different orders for any possible edge cases





