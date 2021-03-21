# Weather Map documentation

The original documentation for this project was written by Chirag Walia (chiragisdevil@gmail.com)

## Table of contents

* [Overview](#overview)
  + [Main Technologies](#main-technologies)
* [Running and Building the app](#Running-and-Building-the-app)
* [Hosted App](#hosting-the-app) 
* [Folder Structure](#folder-structure)
  + [File Extensions](#file-extensions)
* [React](#react)
* [State managment](#state-managment)
  + [Redux store](#redux-store)
  + [Connecting to State](#connecting-to-state)
* [CSS Styling](#css-styling)
* [Things that would get done with time](#additional-things-missing)

## Overview

The Weather Map portal front-end web app is a Single Page App (SPA), written in React, which interfaces directly with the weathermap API via HTTP JSON requests.



### Main Technologies

[React](https://reactjs.org/) - Used as the front-end framework for generating HTML and updating the browser DOM.

[Redux](https://redux.js.org/) - Used for front-end state management.

[React Router](https://reactrouter.com/web/guides/philosophy) - Used for routing (navigation within the app and control of the browser URL).

[Sass](https://sass-lang.com/) - Used to generate and manage the CSS stylesheets for the user interface.

[Moment](https://momentjs.com/) - For date calculations and formatting.

[Material UI](https://material-ui.com/) - For reusing nicely styled components

[NPM](https://www.npmjs.com/) - Used for package management.

[react-icons](https://www.npmjs.com/package/react-icons) - Include popular icons into React projects easily 

The web app was bootstrapped using [Create React App](https://create-react-app.dev/). 

## Running and Building the app

In the project directory, you can run:

`> npm start`

This will run the app in development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app will auto-reload as you make edits to the source files.

To create a build you can run:

`> npm run build` 

This will build the app in the `build` folder. The build will be minified and optimised for production.

## hosting-the-app
The site is hosted on heroku and is accessible on 
https://weatherman29.herokuapp.com/

To create a new domain, you can run the following command from a heroku cli after a 
`heroku login`
`heroku create weatherman29 --buildpack https://github.com/mars/create-react-app-buildpack.git`

To deploy, the following command is used:
`git push heroku main`

### Folder Structure

#### Project Root

The root of the project contains the following folders:

- `src`: contains the source for the main web app.
- `public`: contains public assets served by the web app such as `index.html`.

The root of the project also contains the standard files for a node project such as `package.json`. In addition on build, there will be a `node_modules` directory containing the installed npm packages.

#### Src Folder

The `src` folder itself contains the `index.js` file which is the main entry point for the web app.

It contains the following folders of interest:

- `components` contains all of the React components and there associated logic.
- `pages` contains all the non-reusable pages. Current;y, the app is built to have 2 pages.
- `redux` contains all the redux related code. 
- `assets` contains all the assets needed such as images

#### Components Folder

The folder `src/components` contains the visual React components and their associated logic. They are organised by main areas of the site. Some important subfolders are:

- `search-box` contains the component for searching. This will have capability to set state to hold the searched item and also to carry out optional routing .
- `footer` components for the display of the footer.
- `date-display` components for displaying a unix epoch datetime available in redux in a readbale format.
- `weather-card` component for having a repeatable component that will hold forecast information about weather for each day
- `card-container` components for holding a container of all the cards. This also includes the logic of picking records from the array & creating 5 cards resulting from the 3hr/5day API call
- `weather-icon` components for taking an icon text as an input and returning the icon image
- `general-weather` components for displaying information regarding the closest forecasted weather

#### Pages Folder

The folder `pages` contains the base components for displaying pages and inputs, and contains the following subsections:

- `homepage` contains the main homepage having capability to take input of the city to be searched
- `weatherpage` contains the details of the weather for the serached city.

### File Extensions

React components are written in JSX syntax and have a `.jsx` file extension. The React library parses these files and converts them to JavaScript on build. All other JavaScript source code files use the `.js` extension

## React

The web app uses the [React](https://reactjs.org/) library as a framework for generating DOM elements within the browser. The library allows for the creation of reusable visual components which can be nested within each other. The components are defined in `.jsx` files, which are then parsed by the React library and then converted into JavaScript commands.

`JSX` is a mixture of JavaScript and HTML syntax that allows for the mixture of React components and standard HTML components in single HTML-like tree. More information is available in the [React documentation](https://reactjs.org/). 

The web app has mainly used Functional components & avoided making use of class components.

In some cases, where a component is mainly visual, but also involves some state or lifecycle effects, we have added these using [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## State management

There are three places within the Portal web app where state is stored.

- **Component state**: For state that is only needed within a component or its descendants, we store state within the component using `useState` React hook. This state is only by this component and its children

- **App state**: For state that is required to be shared between components and to persist across navigating to different routes in the app, we use a global state managed by the [Redux](https://redux.js.org/) library. 

### Redux store

The web app uses the [Redux](https://redux.js.org/) library for managing a global state. The store is defined in `redux/store.js` and is managed by the root reducer `redux/root.reducer.js`.

This reducer uses `combineReducers` to create a state object consisting of various "state slices", each of which is controlled by a separate reducer. This allows us to split the state into different concerns within the store, such as:

- `location` The location details on searched city and the country 
- `date` State for fetching CRQs from the first fetched date for the forecasted weather
- `temperature` details of the temperature. This will include details of feels_like,grnd_level,humidity,pressure,sea_level, temp, temp_kf, temp_max, temp_min
- `icon` icon number for the weather condition so the appropriate imge can be retrieved

When a user event occurs that should change state, the app dispatches an action to the store which contains the metadata representing the change that should occur. That action is then passed to the root reducer, which in turn passes it to all the state slice reducers. If a state slice reducer is set up to respond to the action, the reducer will return a new state slice based on the action and the initial state.

In this way, the global state object is never mutated. Instead each action replaces the app state with a new copy that has been transformed in a predictable way.

More details are available in the [Redux documentation](https://redux.js.org/introduction/getting-started).

### Connecting to State

Individual components will connect to state using the `connect` method from the `react-redux`. The component defines methods for `mapStateToProps`, which is passed to the connect method and determine which parts of the global state,  the component needs access to. These state variables are then passed to the components as props every time state changes. Also, `dispatch` method is used to dispatch actions to trigger the storage of the attributes into the store.

More details are available [here](https://redux.js.org/basics/usage-with-react).

## CSS Styling

The web app uses the [Sass](https://sass-lang.com/) CSS pre-processor to manage generation of CSS styles for the web components. Each page, component and visual structure has its own Sass file defined in the component directory. 

## additional-things-missing
The following things would have been done better if given the time:
a) Using selectors within the mapStateToProps
b) Currently coverage of tests is limited. This can be improved by writing some more tests to cover missing codes
c) Secrets on API key to be stored in .env file