# asteroid-js

## The React.js frontend part of asteroid-music

We recommend that you use Asteroid either via an installer or the docker image.
However, if you wish to construct everything separately, follow these instructions for the frontend.

## Prerequisites

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

## Installation

```bash
$ git clone https://github.com/asteroid-music/asteroid-js.git
$ cd asteroid-js
$ npm install
```

## Testing

To run tests, call

```bash
$ npm run test
```

## Building

To build, call

```bash
$ npm run build
```

## Deployment

Set up [asteroid-flask](https://github.com/asteroid-music/asteroid-flask) as per its own instructions.
Then, build the frontend and copy or move the `dist` folder to a folder named 'web' in the directory of asteroid-flask.
For example, if asteroid-flask and asteroid-js were cloned from the same directory:

```bash
$ cd asteroid-js #If not already in this folder
$ npm run build
$ cp -r dist ../asteroid-flask/web
```

Then, run the flask server as per normal:

```bash
$ cd ../asteroid-flask #If not already in this folder
$ flask run
```
