This repository contains two example codes for the website talkandprogress.com, \
**scroll-pagination** and **mousedown-drag**.

### In the **scroll-pagination** example code:

-- ABSTRACT --  
I had to take into account two different main scenarios. When the user lands on the website, they are initially given the question-modal-window. If they don't want to immediately answer the question, but want to see previously submitted answers by other users, they can either close all modal windows or click the answer-counter-button in top-right.

-- CHALLENGE --  
Hence the two main scenarios are:

> Scenario #1:  
>  => The user submits an answer.  
>  => The user is taken to the answer-collection-page.  
>  => With their newly submitted answer, 9 other previously submitted answers show, totalling 10 answers.  
>  => When they scroll to the bottom of the page, 10 more previously submitted answers show.

> Scenario #2:  
>  => The user decides not to submit the answer.  
>  => The user closes the modal window or clicks the answer-counter-button.  
>  => 10 previously submitted answers show.  
>  => When they scroll to the bottom of the page, 10 more previously submitted answers show.
>
>        Sub-Scenario #2.1:
>            => While the answer-collection-page is in view, the user decides to submit a new answer.
>            => The new answer prepends at the top of the answer-collection-page.
>
>        Sub-Scenario #2.2:
>            => While the answer-collection-page is in view, another user submits a new answer.
>            => The new answer prepends at the top of the answer-collection-page.

-- SOLUTION --  
The challenge with these scenarios was to make a use of the variable $offsetCount and $\_id to make sure no redundant data is queried to display in the list of answers.  
I created 4 separate query functions in PHP to be used togther with 3 separate functions in JS.  
In JS,

> _getNewData()_ is responsible for the GET request of the one new answer.

> _getNineSinceLast_ID()_ is responsible for the GET request of 9 other answer to be appended following the new answer when the user views answer-collection-page for the first time. Variable $\_id is used as a marker to make sure the querying of 9 answers begins from a smaller id number than the new answer and prevent duplicate query of the new answer.

> _getTenData()_ is responsible for the GET request of 10 answers to be appended. The $offsetCount is used to query the correct data depending whether or not some other answers have already appended to the answer-collection-page.

### In the **mousedown-drag** example code:

-- ABSTRACT --  
The modal-windows had to be draggable by clicking any "empty spaces".

-- CHALLENGE --  
I found a sample code for the function of mousedown-drag. However, I couldn't figure out how to apply the function outside Header section of the modal-windows.

-- SOLUTION --  
Rather than using CSS Flexbox, I used CSS Grid.  
And rather than using the "." for the placeholder for an empty grid, I used html div tags with id, so I can apply DOM.  
  
### In the **ImageSlide&Hash** example code:  
  
-- ABSTRACT --  
In a one-page website, users must be able to land on a specific page with a provided link, rather than always scrolling down from the top each time they visit.  
Also an image-slider was implemented for each page(Post component).

-- CHALLENGE --  
Creating div with unique id for anchor tag to refer to.
Fetch all images in an array, but only make one visible at a time by indexing it.

-- SOLUTION --  
To make unique div id, I fetched the "title" data and using split() and join() methods, put them together in one string.
To make an image-slider, I used state.prop for indexing and ternary operator for css display property.
