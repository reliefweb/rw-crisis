# Syria/Iraq Crisis Page

This is static site for the Syria/Iraq ReliefWeb Crisis page.

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

## Configuration

This Crisis page is populated and configured by the config.json file located in the config directory.

    {
      "page-title": "UN Crisis Page - Syria / Iraq",
      "meta": [
        {
          "name": "author",
          "content": "United Nations"
        }
      ],
      "oembed-server": "http://embed.unrw.p2devcloud.com",
      "widgets": [
          {
            "slug": "crisis-overview",
            "title": "Crisis Overview",
            "config": {
            "url": "https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/gistfile1.js"
          }
        }
      ]
    }

### Options

#### Page Tile

The actual title of the Crisis Page

    "page-title": "UN Crisis Page - Syria / Iraq"

#### Meta

An array of meta data to be included in the header of the Crisis Page

    "meta": [
      {
        "name": "author",
        "content": "United Nations"
      }
    ],

#### Oembed Server

Url pointing to the embed service.

      "oembed-server": "http://embed.unrw.p2devcloud.com"

#### Widgets

An array of widgets along with widget specific configuration to be embedded into the crisis page. This section is also used to generate the navigation for the Crisis PAge

    "widgets": [
      {
        "slug": "crisis-overview",
         "title": "Crisis Overview",
         "config": {
           "url": "https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/gistfile1.js"
        }
      }
    ]

`slug`: The html id of the widget.  
`title`: The title of the widget to be displayed in the navigation.  
`config` & `url`: A js or json file specific to each individual widget. Please see below for samples.  

[Crisis Overview](https://gist.githubusercontent.com/fillerwriter/91db8ab49a6df8e1d328/raw/gistfile1.js)  
[Timeline](https://gist.githubusercontent.com/fillerwriter/cdd51cfb738db4daca38/raw/gistfile1.json)  
[Financial](https://gist.githubusercontent.com/fillerwriter/b1bfe01310cccf448aea/raw/gistfile1.json)  
[River](https://gist.githubusercontent.com/fillerwriter/32b1f3a9a492cbab8468/raw/river.json)  
