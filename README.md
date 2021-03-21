# Weather Map documentation

The original documentation for this project was written by Chirag Walia (chiragisdevil@gmail.com)

## Table of contents

* [Overview](#overview)
  + [Main Technologies](#main-technologies)
* [Running and Building the Webapp](#Running-and-Building-the-Webapp)
* [Project Structure](#project-structure)
  + [Folder Structure](#folder-structure)
  + [File Extensions](#file-extensions)
* [React](#react)
* [State managment](#state-managment)
  + [Redux store](#redux-store)
  + [Connecting to State](#connecting-to-state)
* [Developer Tools](#developer-tools)
* [CSS Styling](#css-styling)
  + [Grid System](#grid-system)
* [Display Options](#display-options)
  + [Introduction](#introduction)
  + [Using Display Options](#using-display-options)
  + [Generating Display Options](#generating-display-options)

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

[react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete) - For Location search capability

The web app was bootstrapped using [Create React App](https://create-react-app.dev/). 

## Running and Building the Webapp

In the project directory, you can run:

`> npm start`

This will run the app in development mode. You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The app will auto-reload as you make edits to the source files.

To create a build you can run:

`> npm run build` 

This will build the app in the `build` folder. The build will be minified and optimised for production.


## Project Structure

### Folder Structure

#### Project Root

The root of the project contains the following folders:

- `data-tools`: code to generate [display options](#Display-options).
- `src/core`: contains the source for the main web app.
- `public`: contains public assets served by the web app such as fonts and `index.html`.

The root of the project also contains the standard files for a node project such as `package.json`. In addition on build, there will be a `node_modules` directory containing the installed npm packages.

#### Src Folder

The `src` folder itself contains the `index.js` file which is the main entry point for the web app.

the subfolder `src/core` contains the following folders of interest:

- `components` contains all of the visual React components and there associated logic ([see below](#Components-folder)).
- `actions` contains the shared Redux actions (not specific to a data model).
- `reducers` contains shared Redux reducers.
- `queries` contains the core code for Axios queries.
- `store` contains the Redux store and related utils.
- `style` contains all the Sass source files for UI styling.
- `config` contains global application configuration parameters.
- `utility-functions` contains generic data utilities for arrays, strings etc.
- `utility-storage` contains code for a local memory file database, used for adding attachments to Work Items.

In addition, it contains folders representing domain entities where it was considered appropriate to separate the Redux, query and data-structure logic into its own folder. These include:

- `auth` containing all the code for user authorisation and integration with SAML.
- `approvers` containing logic for CRQ approvers.
- `coordinators` containing logic for Coordinators and coordinator groups.
- `crq` containing logic for CRQS.
- `pou` containing logic for syncing the POU id with a CRQ.
- `relationships` containing logic for Mobile CRQ Relationships.
- `sponsor` containing logic for the Mobile CRQ sponsor field.
- `work-info-items` containing logic for retrieving work information items

#### Components Folder

The folder `src/core/components` contains the visual React components and their associated logic. They are organised by main areas of the site. Some important subfolders are:

- `app-layout` contains the component for the main application layout.
- `auth` components for the login page and logout button.
- `create-crq-screen` components for the main raise CRQ flow.
- `crqs-screen` components for browsing CRQs by coordinator group.
- `edit-crq-screen` components for editing a CRQ in coordinator review.
- `forms` components for the form sections and form inputs. ([see below](#Forms-folder)).
- `header` components for the page header and search bar.
- `home-screen` components for the requester and coordinator home pages.
- `portals` components for dealing with modals and overlays using [react portals](https://reactjs.org/docs/portals.html).
- `router` routing components for navigation.
- `search-crqs-screen` components for CRQ search results.
- `side-nav` components for the side navigation.
- `tables` shared components for display tables.
- `utility` shared utility components such as loading bars.
- `view-crq-screen` components for viewing a CRQ.

#### Forms Folder

The folder `src/core/components/forms` contains the base components for displaying form sections and inputs, and contains the following subsections:

- `data` contains the static JSON files for [display options](#Display-options) as well as utilities to look them up.
- `form-base-components` contains the shared base components and logic for form inputs.
- `form-types/create-crq` contains the specific section and field components for the raise CRQ and edit CRQ flow.
- `select-coordinator` contains components for the shared coordinator selection form.

### File Extensions

React components are written in JSX syntax and have a `.jsx` file extension. The React library parses these files and converts them to JavaScript on build. All other JavaScript source code files use the `.js` extension

## React

The web app uses the [React](https://reactjs.org/) library as a framework for generating DOM elements within the browser. The library allows for the creation of reusable visual components which can be nested within each other. The components are defined in `.jsx` files, which are then parsed by the React library and then converted into JavaScript commands.

`JSX` is a mixture of JavaScript and HTML syntax that allows for the mixture of React components and standard HTML components in single HTML-like tree. More information is available in the [React documentation](https://reactjs.org/). 

The web app defines two types of React components. Where React lifecycle methods are needed, or there are complicated internal state transitions, we use the React class component syntax. If however the component only represents visual display code we use functional components for simplicity.

In some cases, where a component is mainly visual, but also involves some state or lifecycle effects, we have added these using [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## State management

There are three places within the ACE Portal web app where state is stored.

- **Component state**: For state that is only needed within a component or its descendants, we store state within the component using class components or the `useState` React hook. For example the component `HeaderUserDisplay` in `src/core/components/header/header-user.jsx` has a local state variable `alertOpen` that defines whether the logout confirmation modal should be open or not. This state is only by this component and its children
- **App state**: For state that is required to be shared between components and to persist across navigating to different routes in the app, we use a global state managed by the [Redux](https://redux.js.org/) library. An example would be the metadata for the logged-in user.
- **Form state**: For maintaining the state of a form while the user is filling it in, we use the [Formik](https://github.com/formium/formik) library. This provides state to the outer form that is passed down to the field components using a React context. See [form state](#Form-state) for more details.

### Redux store

The web app uses the [Redux](https://redux.js.org/) library for managing a global state. The state is defined in `src/core/store/store.js` and is managed by the root reducer `src/core/reducers/reducer-root.js`.

This reducer uses `combineReducers` to create a state object consisting of various "state slices", each of which is controlled by a separate reducer. This allows us to split the state into different concerns within the store, such as:

- `auth` The logged in users metadata and auth token
- `CRQ` State for fetching CRQs from the API
- `coordinatorGroups` List of coordinator groups fetched from the API.
- `editForm` Current state of the coordinator review edit form by CRQ ID.
- `mainForm` Current state of the raise CRQ form.
- `errorAlert` Global state for displaying errors.
- `workInfoItem` List of work info items retrieved from the server by CRQ ID.

When a user event occurs that should change state, the app dispatches an action to the store which contains the metadata representing the change that should occur. That action is then passed to the root reducer, which in turn passes it to all the state slice reducers. If a state slice reducer is set up to respond to the action, the reducer will return a new state slice based on the action and the initial state.

In this way, the global state object is never mutated. Instead each action replaces the app state with a new copy that has been transformed in a predictable way.

More details are available in the [Redux documentation](https://redux.js.org/introduction/getting-started).

### Connecting to State

Individual components will connect to state using the `connect` method from the `react-redux`. The component defines methods for `mapStateToProps` and `mapDispatchToProps`, which are passed to the connect method and determine which parts of the global state, and which actions the component needs access to. These actions and state variables are then passed to the components as props every time state changes.

As an example, the file `src/core/components/error-alert/error-alert.jsx` defines an erorr alert component that is connected to the `errorAlert` state slice. The `mapStateToProps` function provides the component with a prop `errorAlerts` which is retrieved from the global state variable `state.errors.currentErrors`. The `mapDispatchToProps` function provides the component with a function `clearErrors` as a prop, which is defined to dispatch the `clearAlertErrors` action to the Redux store.

More details are available [here](https://redux.js.org/basics/usage-with-react).

### Redux Thunk

In addition to the standard Redux library, the web app makes use of the [Redux Thunk](https://github.com/reduxjs/redux-thunk) middleware. This allows actions to be dispatched which are functions, and can therefore perform asynchronous actions such as making requests to the web API.

### Developer Tools

The web app is set up to allow for the use of the [redux dev tools](https://github.com/zalmoxisus/redux-devtools-extension) chrome extension during development. This extension allows developers to monitor the global state and the actions that are being dispatched, and even allow "time travel debugging".

## Forms

The main CRQ form, either for raising a CRQ or editing a CRQ in coordinator review, is implemented as a wizard. The form state uses a combination of *Formik* and *Redux*. Each section is defined in its own component and each field within the form is also backed by a component that defines the metadata for that field.

### Form Sections

The form wizard is split into form sections, each representing a step. The shared section component `src/core/components/forms/form-section.jsx` deals with rendering the section and navigation. Each individual form section is defined in a seperate component. For example section one is defined in `src/core/components/forms/form-types/create-crq/section-one/section-one.jsx`

The order of the sections for raising a CRQ is defined in `src/core/components/forms/form-types/create-crq/form-definition/section-order.js` and is dependent on the network.

Each section definition will provide a method `getCurrentFields`, which uses state to determine which fields should be displayed to the user.

### Form Fields

Each field within a section of a form has it's own component that defines the metadata for that field. The metadata include:

- The field name.
- The field type.
- Metadata for display options,
- Validation logic.

The field components live inside the folder for its section and references a base component for the field input type.

The field base components are defined in `src/core/components/forms/form-base-components/` which contains the following input base components:

- `v-f-input.jsx`: A basic text input
- `v-f-button-selector.jsx`: Mutliple choice buttons
- `v-f-dropdown.jsx`: A dropdown select box. This includes functionality for categories dropdowns and typeaheads
- `v-f-date-picker.jsx`: A date / time select input
- `v-f-dropzone.jsx`: A drag and drop file upload input using the [dropzone](https://github.com/react-dropzone/react-dropzone) library
- `v-f-multiselect.jsx`: A scrollable multiselect checkbox list.
- `v-f-radio-button.jsx`: A scrollable radio button list.
- `v-f-textarea.jsx`: A multiline text box component.

In addition, the folder contains the following components that display within the form flow but do not represent inputs.

- `v-f-subsection-title.jsx`: A component for section title for a group of fields
- `v-f-paragraph.jsx`: A component for displaying help text within the form
- `v-f-modal.jsx`: A component for a nested form within a modal component

As an example, the file `src/core/components/forms/form-types/create-crq/section-four/assign-sponsor.js` represents the section five input field for assigning a sponsor on mobile. The file exports an object `assignSponsor` which defines the following for the field.

- The id for the field, to use as a state parameter.
- Metadata for displaying the field and its operation, in the variable `vfParams`
- A validator function which returns error messages based on the current value
- The initial value for the field
- The type of field `vf-input`, which defines the base component used for displaying the field.

### Form State

The wizard form has two different types of state:

**Section state**: The state that holds the field values of a form section as they are being entered.

**Form state**: The state with the values of the fields entered in each section after navigating to the next section.

#### Section State

The *section state* is maintained in component state using the [Formik](https://github.com/formium/formik) library. The `FormSection` component uses the formik hook `withFormik` to provide a section level form state which is then passed down to its subcomponents as a React Context. As well as containing the form state, the Formik library provides handlers for submission, validation and keeping track of whether each component has been *touched*.

#### Form State

The overall form state is stored in the [Redux](https://redux.js.org/) store, in a nested data structure that provides a single source of truth for the current values and display data for each field. As an example, the value for the `'Assign sponsor'` field in section five is held in the following path in state:

`mainForm.formData['create-crq'].dataByformSectionId['CHANGE_DETAILS'].dataByFieldId['assign-sponsor']`

Navigating forward or backwards through the form triggers and action which saves the current section's state to the form state in  Redux.

The validity of fields within a form section can be affected by values in previous sections. As a result, when a form section is submitted, each form section is revalidated as part of the save action.  This logic is captured within the file `src/core/data-structures/data-utility-functions.js`.

Note that modal forms within the main form, such as the modal for Work Information Items, are implemented as forms within a form. So the value of the field `workInformationItems` is essentially a nested form section.

When submitting the form data to the web API, the form state is converted to the API JSON structure using the methods defined in `src/core/components/forms/form-types/create-crq/get-create-crq-parameters.js`. The reverse process, when retrieving an existing CRQ from the API, is defined in `src/core/crq/crq-form-utils.js`

## Authentication

The web app uses a SAML authentication process to interface with Microsoft Azure AD. The user will sign via Azure AD and then requests to the web app API are authorised using a JWT token. The authentication functionality is defined in the files within the `src/core/auth` directory.

More details on the SAML Process are available [here](https://developers.onelogin.com/saml?source=post_page-----fdd7c5b0c1b----------------------).

### Login

The login process works as follows:

- When the user first accesses the site, the web app makes a request to the web API  `/api/SAML/authenticate` to retrieve an authorisation URL. It then presents this URL as the target of the login button.
- The user presses the login button and the browser opens the Azure login page.
- After successful login to Azure, the user is redirected to the web app domain `/api/SAML/authenticate/assert` with the SAMLResponse in the post request body.
- The server API then generates a JWT token and redirects the user to the web app, with the JWT token in a GET parameter.
- The web app consumes this JWT token and extracts from it the user's metadata. It also stores the JWT token in the Redux state for use in further API requests.
- Any subsequent requests made by the web app to the API will contain the JWT token in the `Authorization` request header. This token is used by the web API to authenticate the user.
- Any successful requests to the API will contain a new JWT token in the response headers. The web app will replace the JWT token in state with this new token. This allows the token expiry date to be postponed each time the web app makes an API call, and prevent the token expiring whilte the user is active.

### Logout

The logout process involves simply removing the JWT token from state and then redirecting the user to the login page.

### JWT Token metadata

The JWT token, as well as containing the secrets necessary to authenticate the user, contains metadata about the logged-in user encoded as a Base64 string. The metadata contained are as follows:

- The user's azure id
- The user's first and last name
- The user's role (`Coordinator` or `Requester`) on each remedy network
- The user's remedy id on each network
- The coordinator groups that the user is a member of on each network.

These details are stored in the Redux store in the `auth` state slice and are used throughout the web app to deliver functionality based on the logged-in user's permissions.



## CSS Styling

The web app uses the [Sass](https://sass-lang.com/) CSS pre-processor to manage generation of CSS styles for the web components. Each page, component and visual structure has its own Sass file defined in the `src/core/style` directory. There are shared Sass files that are imported by each file to provide variables defining global colours, fonts, grids and metrics.

The Sass files are compiled to CSS files by Webpack, and then the CSS files are directly imported into the React components that use them.

### Grid System

The directory `src/core/style/scss-shared/grids` defines a series of Sass files that define the web app's grid system. The grid system ensures that the web app's pages follow the design grid for different screen sizes. Various Sass mixins are defined that allow the Sass files for a component to apply content widths and margins that fit within the grid for that screen size.

As an example, the styles for the login page are defined in `src/core/style/components/auth/login-page.scss`. This file defines a rule for the element with class `login-brand` as follows:

```
.login-brand {
  @include item-width-tablet(2);
  @include item-width-desktop(3);
  ...
```

The mixins `item-width-desktop` and `item-width-tablet` will apply a width to the element of a certain number of columns. So, in this case, the login brand has a width of 2 columns on a tablet-sized screen, and 3 columns on a desktop.

Further details on using these mixins are available in the comments within the grid definition files.

## Display Options

### Introduction

Display options are any static field option the user is presented with. This includes buttons the user selects such as 'Yes', 'Mobile' and 'Expedited'. It also includes drop-down menus (where we don't have to get data from the server). An example of one is 'What is the service outage duration?'.

### Using Display Options

display-options.json lives in the folder:

`src/core/components/forms/data/`

By default, the form will search display-options.json for display options related to a field id. So, for example, the field with an id 'select_network', will find the key 'select_network' in display-options.json and use this to set it's display options. The only exception to this is if a field component has it's own display options. If this is a case, it will use those options instead. This allows us to dynamically assign static display options to form fields (we do this in prod-cat-one/two/three).

### Generating Display Options

`display-options.json` can be generated by running:

`node generate-display-options`

in:

`data-tools/generate-display-options/`

`generate-display-options` works primarily by combining and formatting the following files found in `data-tools/generate-display-options/static`:

  - fixed_prodcat_to_info.json
  - fixed_prodinfo.json
  - mobile_opcats.json
  - fixed_opcats.json
  - mobile_prodcats.json
  - fixed_prodcats.json
  - fixed_services.json
  - mobile_services.json
  - dropdowns_cats.json
  - dropdowns.json

These files are provided for us by the ACE Portal server team. If you need to add display options not found in these files, you can do so easily by adding them to `display-options-not-from-json.js`. This will convert them into the identical JSON structure you save them as when you run `node generate-display-options`

#### Filtering in and out

Some form fields have 'filter out' and 'filter in' methods (these exist in form section files). For 'filter out' methods, we discard the display options defined by the filter out method. For the 'filter in' methods, we discard all display options except for the ones defined by the filter in method. At the time of writing the fieldIds that have their display options filtered are:

#### Filtered out:

  - select_network
  - timing

#### Filtered in:

  - work_items

#### Value dependencies

Any new display options that affect form logic must have their values hardcoded in value-dependency-constants.js. They can then be changed easily to match any updates to that value.