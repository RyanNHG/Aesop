# Aesop
Rebecca Freeman | Ryan Haskell-Glatz


###Our Project
Aesop recommends the perfect fables for users based on their feedback as well as the overall feedback of the community.

By applying concepts learned from CS 410: Text Information Systems, we implemented a fully functioning web application, with both __content-based__ and __collaborative__ filtering.

Without having a profile, the top-rated stories will be presented to the anonymous user. If the user wants to get a personalized experience, he or she can choose to create an account and sign in.

After signing in, users can provide feedback on short stories that they have read. From this information, we can recommend the next story to provide. Whether we fail or succeed at first, the users continued feedback allows our system to better model the reader's interests.


###Technology
We have built an __AngularJS__ web application using __Bulma__ as our CSS framework.

The web application is running on a NodeJS runtime, using the __Express__ framework to handle routing and API calls.

Those API calls talk to collections in a __MongoDB__ hosted on mLab.

To deploy the application, we have decided to use __Heroku__.


###Getting started
To run this code locally, make sure you have NodeJS installed on your machine.

1. __`npm install`__ - install dependencies
2. __`npm install -g gulp`__ - install gulp globally
3. __`gulp`__ - bundle source into correct directory
4. __`node app.js`__ - run the app at http://localhost:8080