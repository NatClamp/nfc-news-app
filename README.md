# NFC-News

NFC is a social news aggregration, much like [Reddit](https://www.reddit.com/), built as a project during the Front-End module of my time at Northcoders. NFC-News displays articles with a user-rating and comments (each with their own rating), which are divided into topics. Users can browse, vote and comment on articles. They can also vote on existing comments, as well as add new topics and post new articles.

Deployed on netlify [here](https://nfc-news.netlify.com/).

This application makes asynchronous API calls to my own server, which can be found on my [github](https://github.com/NatClamp/nfc-news), and was built during the Back-End module of Northcoders. You can find the deployed version of the API on [heroku](https://nfc-news.herokuapp.com/api).

## Getting Started

If you want to run NFC-News locally, clone this repository and run `npm install` to install the necessary dependencies.

Once installed, you can run the app locally by using the command `npm start`.

## Built With

- [Create-React-App](https://github.com/facebook/create-react-app)
- [@Reach-Router](https://github.com/reach/router) (^1.2.1)
- [Axios](https://github.com/axios/axios) (^0.18.0)
- [Moment](https://momentjs.com/) (^2.23.0)
- [Netlify-cli](https://www.netlify.com/) (^2.6.1)
