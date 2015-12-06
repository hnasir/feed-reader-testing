/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // change global Jasmine timout interval for async tests to 10s 
    // to prevent tests from failing due to slow server response
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed object has URL defined', function() {
            // get index to loop through each feed object in allFeeds array
            for (i = 0; i < allFeeds.length; i++) {
                // check that url of feed object is defined
                expect(allFeeds[i].url).toBeDefined();
                // check that url of feed object has length less than 0, thus not empty
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed object has name defined', function() {
            // loop through each feed object in allFeeds array
            for (index = 0; index < allFeeds.length; index++) {
                // check that name of feed object is defined
                expect(allFeeds[index].name).toBeDefined();
                // check that name of feed object has length less than 0, thus not empty
                expect(allFeeds[index].name.length).not.toBe(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element hidden by default', function() {
            // check if menu-hidden class that is used to hide menu is found in body class
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when clicked', function() {
            // use jquery to trigger clicking of menu icon once and check for menu display
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // use jquery to trigger clicking of menu icon once again and check that menu is hidden now
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('number of menu items displayed is correct', function() {
            // check that number of list items in menu equals the number of items in feeds array
            expect($('.feed-list').find('li').length == allFeeds.length).toBe(true);
        });

        it('all menu list item texts are not blank', function() {
            // loop through each menu list item and check that display text link is not blank
            $('.feed-list').find('li').each(function(index) {               
                expect($(this).children('a').html().length).not.toBe(0);
            });
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            // run loadFeed and supply callback method that will use done() to trigger test when loadFeed has completed
            loadFeed(0, function() {
                done();
            });
        });

        it('single feed entry exists when feed loading has completed', function(done) {
            // check that number of entry-link within feed class container is not 0
            expect($('.feed').find('a.entry-link').length).not.toBe(0);
            done();
        });

        it('header title is correct', function(done) {
            // check that header title has changed from default Feeds value specified in index.html
            expect($('.header-title').html() == 'Feeds').toBe(false);
            // check that header title value is correct based on feed name string stored in all feeds array
            expect($('.header-title').html() == allFeeds[0].name).toBe(true);            
            done();
        });

        it('each feed entry has title text', function(done) {
            // loop through each feed entry and check that title populated in h2 element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('h2').html().length).not.toBe(0);
            });
            done();
        });

        it('each feed entry has content snippet', function(done) {
            // loop through each feed entry and check that content snippet populated in p element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('p').html().length).not.toBe(0);
            });
            done();
        });         
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        // declare variables for storing values of first feed details before new feed selection
        var previousFeedEntryLink;
        var previousFeedHeader;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            // run loadFeed with id 0 as per page initialisation in app.js and trigger next loadFeed in callback
            loadFeed(0, function() {
                // store value of first feed entry's link url for comparison later
                previousFeedEntryLink = $('.feed').find('a.entry-link:first').attr('href');
                // store value of first feed's header for comparison later
                previousFeedHeaderTitle = $('.header-title').html();
                // run loadFeed for new feed and supply callback method that will use done() to trigger the test
                loadFeed(1, function() {
                    done();
                });                
            });
        });

        it('feed content changes when loading of new feed has completed', function(done) {
            // check that number of entry-link within feed class container is not 0
            expect($('.feed').find('a.entry-link').length).not.toBe(0);
            // check that entry-link of feed for first feed item has changed after new feed loading completed
            expect($('.feed').find('a.entry-link:first').attr('href') == previousFeedEntryLink).toBe(false);
            // check that feed header title has changed after new feed loading completed
            expect($('.header-title').html() == previousFeedHeaderTitle).toBe(false);
            done();
        });

        it('menu is hidden', function(done) {
            // check if menu-hidden class that is used to hide menu is found in body class
            expect($('body').hasClass('menu-hidden')).toBe(true);
            done();
        });

        it('each feed entry has title text', function(done) {
            // loop through each feed entry and check that title populated in h2 element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('h2').html().length).not.toBe(0);
            });
            done();
        });

        it('each feed entry has content snippet', function(done) {
            // loop through each feed entry and check that content snippet populated in p element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('p').html().length).not.toBe(0);
            });
            done();
        });          
    });
    
    // Test suite Same Feed Selection is used to verify behavior when same feed is loaded instead of a new feed
    describe('Same Feed Selection', function() {
        // declare variables for storing value of initial feed entry's link and count for comparison
        var initialFeedEntryLink;
        var initialFeedHeaderTitle;

        beforeEach(function(done) {
            // run loadFeed with id 0 as per page initialisation in app.js and trigger next loadFeed in callback
            loadFeed(0, function() {
                // store value of intial feed entry's link url and count for comparison later
                initialFeedEntryLink = $('.feed').find('a.entry-link:first').attr('href');
                // store value of initial feed's header for comparison later
                initialFeedHeaderTitle = $('.header-title').html();            
                // run loadFeed for new feed and supply callback method that will use done() to trigger the test
                loadFeed(0, function() {
                    done();
                });                
            });
        });        

        it('feed content does not change', function(done) {
            // check that entry-link of feed for first feed item has not changed
            expect($('.feed').find('a.entry-link:first').attr('href') == initialFeedEntryLink).toBe(true);
            // check that feed header title has not changed          
            expect($('.header-title').html() == initialFeedHeaderTitle).toBe(true);            
            done();
        });

        it('menu remains hidden', function(done) {
            // check if menu-hidden class that is used to hide menu is found in body class
            expect($('body').hasClass('menu-hidden')).toBe(true);
            done();
        });

        it('each feed entry has title text', function(done) {
            // loop through each feed entry and check that title populated in h2 element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('h2').html().length).not.toBe(0);
            });
            done();
        });

        it('each feed entry has content snippet', function(done) {
            // loop through each feed entry and check that content snippet populated in p element is not blank
            $('article.entry').each(function(index) {
                expect($(this).find('p').html().length).not.toBe(0);
            });
            done();
        });    
    });
}());
