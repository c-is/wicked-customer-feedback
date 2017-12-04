# Wicked Customer Feedback

### test server
[link text itself]: http://example.worlders.co.uk

### tools/techniques
* node v6.10.2
* npm v5.4.1
* webpack
* React
* Redux
* postCSS
* chart.js

### structure
* components
  - this folder contains all the layout part of js files. Layout.js, Header.js, Footer.js, etc...
* css
  - All the global css partial files go here and are loaded within src/style.css.
* public
  - All the build files go here after running `yarn build`.
* src
  - main.js
    - React config file and all the data loaded and stored here
  - store.js
    - Redux reducers
  - history.js
    - Create history here (not being used this time)
  - global.js
    - All the global functions
  - style.css
    - Main css file
  - others
    - There is just an index page this time, but if further pages added, all the page js file goes here.
* svg
  - svg files
* test
  - Unit test tool (Mocha)
* tools
  - npm command tools


### notes
1. You can see Redux is installed in this project, but due to the size of the project, I decided rather to not use it. Redux is maintained here as I usually use it within this simple React template.
2. I usually follow BEM for a CSS architecture, but it's isomorphic style this time!
3. Main converter function is stored in `src/home/index.js`
