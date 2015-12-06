# Feed Reader Testing Project

## Introduction

Submission for Project #6 in Udacity's Front-end Wed Developer Nanodegree course.

This project covers the writing of test suite and test cases for a javascript app using the Jasmine framework.

## Project File & Directory Structure

######css/

Contains all required Cascading Style Sheet files

######fonts/

Contains all required Fonts used for certain text and icons

######jasmine/

Contains Jasmine testing framework (v2.1.2) library files

######js/

Contains all required Javascript files and dependencies

######index.html

HTML file for Feed Reader application

## Running the application

Run local server on the code residing in the project folder and access the website through localhost:8080

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

Wait for the page to load and all tests to complete by checking for the presence of **_finished in NN.NN s_** text on the right side of the page that is inline with where the **_Jasmine_** icon and text are displayed.

Test results will be available below the above-mentioned line.

## Additional Tests

Several additional tests were added outside the scope of the project requirements in order to ensure comprehensive testing of Feed Reader features. 

Summary of respective additional test cases arranged are:

### Test Suite: The Menu
* __Number of menu items displayed is correct:__ Checks number of list items in menu should be the same as number of feed items in allFeeds array

* __All menu list item texts are not blank:__ Checks that all menu list items displayed are not blank

### Test Suite: Initial Entries
* __Header title is correct:__ Checks that header title has changed from default value and is also the correct text as per feed name string stored in allFeeds array

* __Each feed entry has title text:__ Checks that all feed entries have title text that is not blank

* __Each feed entry has content snippet:__ Checks that all feed entries have content snippet text that is not blank

### Test Suite: New Feed Selection
* __Menu is hidden:__ Checks that menu is hidden when new feed loading is completed

* __Each feed entry has title text:__ Checks that all new feed entries have title text that is not blank

* __Each feed entry has content snippet:__ Checks that all new feed entries have content snippet text that is not blank

### Test Suite: Same Feed Selection
* __Feed content does not change:__ Checks that title header remains the same and first entry of feed content remains the same _(Note: this test may fail in the event that the source feed happens to be updated in between the loadFeed calls)_

* __Menu is hidden:__ Checks that menu is hidden when new feed loading is completed

* __Each feed entry has title text:__ Checks that all same feed entries have title text that is not blank

* __Each feed entry has content snippet:__ Checks that all same feed entries have content snippet text that is not blank

## References

The following sites were referenced when working on this project:

* <a href="https://api.jquery.com">jQuery API Documentation</a>
* <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Markdown Cheatsheet by Adam Pritchard</a>
* <a href="http://www.cheatography.com/citguy/cheat-sheets/jasmine-js-testing/">Jasmine JS Testing Cheatsheet by CITguy</a>
