# My reads
Web app made with `React` that list your personal library of books, showing the ones you have already read, the ones that you want to read, and the ones currently reading.

## Main Page

The main page shows the shelfs of your books categorized in:

* Currently reading
* Want to read
* Read
* All

### Functionality

* If you click on a book card more information about the book is showed.
* If you want to change one book to another shelf use the button of doble arrow, and click in the desire category,
* If you want to add more books to the library use orange button near the title.

## Search Page

In the search page it is possible to find more books to add to the library.

### Functionality

* When the search page loads, the focus will be in the input search
* You can write any text related to some book
* When you wirte the calls to the search method are debounced to avoid make a lot of calls.

# Server Endpoint

This app make calls to a server endpoint from [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), the enpoint in question is: https://reactnd-books-api.udacity.com 

All the calls to that endpoint are made with an `Authorization` header that is a random value stored on local storage, basically to identify the user.

## Sample data

To know how the data of the server is, there are some samples in the `src/input` folder.

# Requirements

The main software used:

* `NodeJS`. Version `v13.7.0`. Used to create the app using `create-react-app` and to serve the app in local.
* `React`. Version `16.12.0`. All the web app is made with react,
* `Material-UI`. Version `4.9.1`. All the UI elements where made with material-ui.

# Install

To install the application, inside of the app directory run:

```
npm install
```

# Run

To execute on your local machine use:

```
npm start
```

