# Ash

## About

This is a modular micro-MVC single-page web app serving Bootstrap components through Handlebars with Require (via ExpressJS). A minimal stack that renders a "living template" of Bootstrap GUI widgets (components) using the HandlebarsJS template system. All thanks to RequireJS.

I wanted to find a way to load Bootstrap templates using Handlebars, ideally doing so with RequireJS. These solutions all seemed to incorporate Backbone or some other off-the-shelf MVC/P framework. I wanted to do all that, but without using a third-party MVC framework.
It took a few hours, but I was finally able to implement that formula using a [RequireJS Handlebars plugin](https://github.com/jfparadis/requirejs-handlebars) authored by [Jean-Francois Paradis](http://www.jeanfrancoisparadis.com/).

The modular micro-MVC ("3MVC") is a custom-built single-page web app. It is based on the collection of views of the 
app, abstract data models, and controllers to mediate the relationship between them.

Each view has a Handlebars template and JavaScript modules for its controller, view, and data.

## Getting Started

This guide assumes you can use Git and NodeJS (w/ npm) from the command-line.

1. Clone the project
```$ git clone https://github.com/quantumtom/ash```

2. Navigate to the new directory
```$ cd ash```

3. Update npm
```$ npm update -g npm```

4. Install project dependencies
```$ npm install```

## Build
Run the default grunt task, ```$ grunt```.

## Run
Run the ExpressJS server, ```$ node serve.js```. Or just ```$ npm start```.

Then you can visit your local instance at [http://localhost:5000](http://localhost:5000) 
(or [http://127.0.0.1:5000](http://127.0.0.1:5000)).

## Major Dependencies

1. RequireJS
[RequireJS](http://www.requirejs.org) is my loader of choice. Dependency management -- say no more, right? 
Enforces code modularity in a file-based tree hierarchy.
v. [2.1.8is](http://jrburke.com/2013/07/08/requirejs-2.1.8-released/) included in this project's JavaScript library.

2. jQuery
[jQuery](http://www.jquery.org) is the modern foundation of an extensive family of plug-ins, libraries, and extensions. It's a hard depdendency for Bootstrap. Loading it with RequireJS can be a bit tricky.

3. Twitter Bootstrap
Twitter [Bootstrap](http://getbootstrap.com) is a fantastic UI library that integrates nicely with jQuery.

4. Handlebars
Based on [Mustache](http://mustache.github.io/), [Handlebars](http://handlebarsjs.com/) is my HTML template system of choice. Works well in both client and server capacities.

## Extras

A few extra toys are included just for fun. Grunt is currently configured to run JSHint tests against the 41 
original JavaScript files in the "3MVC" (see below).

1. Grunt
The [Grunt](http://www.gruntjs.org) task runner is an indespensible tool for test and building from source files.

2. JSHint
Adjusting the configuration for [JSHint](http://jshint.com/). See the .jshintrc for more info.

## Credits

I owe deep thanks to [Jonathan Verrecchia](http://verekia.com/requirejs/build-simple-client-side-mvc-app-require-js/). 
Verecchia authored a tutorial on implementing a minimalist MVC using AMD through RequireJS. His guide should be 
considered indispensible to anyone implementing a MVC pattern in JavasScript.

I configured Bootstrap to load widgets using CSS themes from [Bootswatch](http://www.bootswatch.com).

## Recent Updates

2016-02-12 - Rename project due to popular demand.

2016-02-12 - Update dependencies and logos.

2016-02-12 - Fix Grunt task for JSHint.

2016-02-12 - Update documentation.

2016-02-17 - Fix alignment in Grunt task 

2016-02-18 - Change README.md.

2016-02-19 - Add cache control Grunt task.

2016-03-02 - Add Bootlint testing.

2016-03-12 - Add Grunt task for CSS lint.

2016-03-13 - Add GZip compression for Node/ExpressJS.

2016-03-16 - Add JSDoc support.

2016-03-17 - Add `deploy` branch.