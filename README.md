# Syria/Iraq Crisis Page

This is static site for the Syria/Iraq ReliefWeb Crisis page.

## Dependencies

- bower - Frontend dependencies
- bundler - Ruby dependencies
- compass - Compiles sass
- npm/grunt - task runner

## System Requirements

Apache or nginx. Should serve configuration files (at least) with CORS support.

## Operations Tasks

### Install

    npm install

This process will also run `bundle install` and `bower install`. Note that `bower_components/` is found inside the `src/` directory.

### Generate Docroot

Generate a release package in `dist/` that can be served by a webserver.

       grunt

## Developer Tasks

* **Build**: `grunt`
* **Watch for Changes**: `grunt watchSrc`
* **Serve Crisis Page from `dist/`**: `grunt serve`

## Configuration

The Crisis Page is baked from configuration the build process expects to find in repo:config/config.json.
Check out the [example.config.json](https://github.com/reliefweb/rw-crisis/blob/master/config/example.config.json) for details.

The configuration files are downloaded for use client-side, and are also retrieved to render the widgets
provided by the Embed Service.

### Page Tile

The actual title of the Crisis Page

```js
{
  "page-title": "UN Crisis - Syria / Iraq"
}
```

### Meta

An array of meta tags to be included in the header of the Crisis Page.

```js
{
  "meta": [
    {
      "name": "author",
      "content": "United Nations"
    }
  ],
}
```

### Environment

The Environment configuration allows you to specific anything environment-specific in the running of the Crisis Page.
This especially includes the absolute path to the Crisis Page and any APIs it will rely on.

```js
{
  "environment": {
    "baseUrl": "http://crisis.rwlabs.org/crisis-short-id/",
    "sources": {
      "hdx": "http://data.hdx.rwlabs.org/api",
      "fts": "http://fts.unocha.org/api",
      "reliefweb": "http://api.rwlabs.org",
      "reliefweb-embed": "http://embed.rwdev.org"
    }
  },
}
```

### Widgets

An array of widgets along with widget specific configuration to be embedded into the crisis page. This section is also used to generate the navigation for the Crisis PAge

```js
{
    "widgets": [
      {
        "slug": "Machine ID of the widget. Should be usable as an HTML id attribute value.",
         "title": "Title of the widget to be displayed in navigation.",
         "config": {
           // This URL will be used for the build process, actual config content is saved locally and hosted at the Crisis Page URL.
           "url": "https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/gistfile1.js"
        }
      }
    ]
}
```

#### Example Widget Configuration
* [Crisis Overview](https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/gistfile1.js)
* [Timeline](https://gist.githubusercontent.com/fillerwriter/cdd51cfb738db4daca38/raw/gistfile1.json)
* [Financial](https://gist.githubusercontent.com/fillerwriter/b1bfe01310cccf448aea/raw/gistfile1.json)
* [River](https://gist.githubusercontent.com/fillerwriter/32b1f3a9a492cbab8468/raw/river.json)
