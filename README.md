# Syria/Iraq Crisis Page

This is static site for the Syria/Iraq ReliefWeb Crisis page.

## First Iteration

This first iteration used [Start Bootstrap](http://startbootstrap.com/) - [Grayscale](http://startbootstrap.com/template-overviews/grayscale/).

It is meant to be a throwaway until the crisis page design language can be established from the [Crisis Pattern Lab](https://github.com/reliefweb/rw-crisis-pl).

## Requirements

- bower - Frontend dependencies
- bundler - Ruby dependencies
- compass - Compiles sass
- npm/grunt - task runner

## Development Tasks

### Install

    npm install

This process will also run `bundle install` and `bower install`. Note that `bower_components/` is found inside the `src/` directory.

### Build

    grunt

### Build & Watch for Changes

    grunt watch

### Generate a release package in `dist/`

    grunt release

### Serve Crisis Page

    grunt package
