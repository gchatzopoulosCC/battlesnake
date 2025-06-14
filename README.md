# Battlesnake JavaScript Group 4 Project

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

This is the official repository of Group 4 for assessment (Battlesnake project) of module CCS2430 (Software Development in Practice) at CITY College, University of York Europe Campus. Here it is included all the code needed for the complition of the assignment.

Authors (GitHub usernames):

- gchatzopoulosCC
- pcharalampidis
- Almanidou
- jhoxha1
- sdemba
- mgramozi

# Table of Contents

- [Battlesnake JavaScript Group 4 Project](#battlesnake-javascript-group-4-project)
- [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Instalation](#instalation)
    - [Folder structure](#folder-structure)
  - [How to Run](#how-to-run)
    - [Deployment (Railway)](#deployment-railway)
    - [Game Playing](#game-playing)
  - [Additional Information](#additional-information)
    - [Configuaration Files](#configuaration-files)
    - [Launch Parameters](#launch-parameters)
    - [Extended Documentation](#extended-documentation)

## Technologies Used

This project is built using:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Getting started

### Prerequisites

This project requires nodeJS to be installed. For this follow the official [NodeJS installation documentation](https://nodejs.org/en/download)

### Installation

1. Clone the repository

```bash
git clone https://github.com/gchatzopoulosCC/battlesnake.git`
```

or using SSH:

```bash
git clone git@github.com:gchatzopoulosCC/battlesnake.git
```

_Notice: if you have configured mutliple SSH keys that have distinct host names you have to change the `@github.com` to `@<your-hostname>`_ 2. Install the packages

```bash
npm install
```

3. Change git remote url to avoid accidental pushes to base project

```bash
git remote set-url origin gchatzopoulosCC/battlesnake`
git remote -v #confirm the changes
```

### Folder structure

```
.
├── out
│   ├── fonts
│   │   ├── OpenSans-BoldItalic-webfont.eot
│   │   ├── OpenSans-BoldItalic-webfont.svg
│   │   ├── OpenSans-BoldItalic-webfont.woff
│   │   ├── OpenSans-Bold-webfont.eot
│   │   ├── OpenSans-Bold-webfont.svg
│   │   ├── OpenSans-Bold-webfont.woff
│   │   ├── OpenSans-Italic-webfont.eot
│   │   ├── OpenSans-Italic-webfont.svg
│   │   ├── OpenSans-Italic-webfont.woff
│   │   ├── OpenSans-LightItalic-webfont.eot
│   │   ├── OpenSans-LightItalic-webfont.svg
│   │   ├── OpenSans-LightItalic-webfont.woff
│   │   ├── OpenSans-Light-webfont.eot
│   │   ├── OpenSans-Light-webfont.svg
│   │   ├── OpenSans-Light-webfont.woff
│   │   ├── OpenSans-Regular-webfont.eot
│   │   ├── OpenSans-Regular-webfont.svg
│   │   └── OpenSans-Regular-webfont.woff
│   ├── scripts
│   │   ├── prettify
│   │   └── linenumber.js
│   ├── styles
│   │   ├── jsdoc-default.css
│   │   ├── prettify-jsdoc.css
│   │   └── prettify-tomorrow.css
│   ├── common_sets_adjacentPositions.js.html
│   ├── common_sets_coordinates.js.html
│   ├── common_sets_moves.js.html
│   ├── common_snake_body.js.html
│   ├── core_game.js.html
│   ├── core_snake.js.html
│   ├── helper_moves_avoidanceChecker.js.html
│   ├── helper_sets_adjacentPositions.js.html
│   ├── helper_sets_bodySet.js.html
│   ├── helper_sets_collisionSet.js.html
│   ├── helper_sets_coordinates.js.html
│   ├── helper_sets_moves.js.html
│   ├── helper_snake_body.js.html
│   ├── index.html
│   ├── lib_moves_avoidGoingBackwards.js.html
│   ├── lib_moves_avoidOthers.js.html
│   ├── lib_moves_avoidSelf.js.html
│   ├── lib_moves_avoidWalls.js.html
│   ├── module-src_common_sets_adjacentPositions.html
│   ├── module-src_common_sets_coordinates.html
│   ├── module-src_common_sets_moves.html
│   ├── module-src_common_snake_body.html
│   ├── module-src_core_game.html
│   ├── module-src_core_snake.html
│   ├── module-src_helper_moves_avoidanceChecker.html
│   ├── module-src_helper_sets_adjacentPositions.html
│   ├── module-src_helper_sets_bodySet.html
│   ├── module-src_helper_sets_collisionSet.html
│   ├── module-src_helper_sets_coordinates.html
│   ├── module-src_helper_sets_moves.html
│   ├── module-src_helper_snake_body.html
│   ├── module-src_lib_moves_avoidGoingBackwards.html
│   ├── module-src_lib_moves_avoidOthers.html
│   ├── module-src_lib_moves_avoidSelf.html
│   ├── module-src_lib_moves_avoidWalls.html
│   ├── module-src_utils_moves_avoidanceChecker.html
│   ├── module-src_utils_moves_avoidGoingBackwards.html
│   ├── module-src_utils_moves_avoidOthers.html
│   ├── module-src_utils_moves_avoidSelf.html
│   ├── module-src_utils_moves_avoidWalls.html
│   ├── module-src_utils_sets_bodySet.html
│   ├── module-src_utils_sets_collisionSet.html
│   ├── utils_moves_avoidanceChecker.js.html
│   ├── utils_moves_avoidGoingBackwards.js.html
│   ├── utils_moves_avoidOthers.js.html
│   ├── utils_moves_avoidSelf.js.html
│   ├── utils_moves_avoidWalls.js.html
│   ├── utils_sets_bodySet.js.html
│   └── utils_sets_collisionSet.js.html
├── src
│   ├── core
│   │   ├── game.js
│   │   └── snake.js
│   ├── helper
│   │   ├── moves
│   │   ├── sets
│   │   └── snake
│   └── utils
│       └── moves
├── tests
│   └── moves
│       ├── avoidGoingBackwards.test.js
│       ├── avoidOthers.test.js
│       ├── avoidSelf.test.js
│       └── avoidWalls.test.js
├── CHANGELOG.md
├── eslint.config.mjs
├── index.js
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
├── replit.nix
├── SECURITY.md
└── server.js

```

## How to Run

The usage of this application is not designed to be run locally. For this reason, the project has to be deployed on the cloud to be run.

- If one wishes to run locally

```bash
node index.js
```

### Deployment (Railway)

- Production Environment
  1.  Sign in/Register on [Railway](https://railway.com/) using **GitHub**
  2.  Create a new Project
  3.  Deploy from GitHub using this repository (gchatzopoulosCC/battlesnake/)
  4.  Navigate to the newly created deployment's settings
  5.  Generate a new domain using any valid port (8080 is recommended)
  6.  Copy the server url (it will be useful later)
- Testing Environment
  1.  In Railway create a new `environment` and name it _testing_
  2.  Go to the new environment settings:
      2.1. Add the branch that is ought to be tested
      2.2. Generate a new domain using any valid port (8080 is recommended)
      2.3. Copy the server url (it will be useful later)
- Development Environment
  1.  In Railway create a new `environment` and name it _devepment_
  2.  Go to the new environment settings:
      2.1. Add the `develop` branch
      2.2. Generate a new domain using any valid port (8080 is recommended)
      2.3. Copy the server url (it will be useful later)

### Game Playing

1. Go on [play.battlesnake.com](https://play.battlesnake.com)
2. Create a Battlesnake with the following requirements:
   - Server Url should be `https://<server_url>`
   - Platform should be **Railway**

## Additional Information

### Configuration Files

The project includes several configuration files that control code style, linting, and deployment:

```
├── .editorconfig               # Controls editor behavior (indentation, charset)
├── .prettierrc.json            # Code formatting rules
├── eslint.config.mjs           # Code quality and style enforcement
├── .replit                     # Replit IDE configuration
└── replit.nix                  # Nix environment for Replit
```

### Launch Parameters

- Standard mode

```bash
node index.js
```

- Run prettier

```bash
npx prettier . --write
```

- Run linting

```bash
npm run lint
```

- Generate documentation

```bash
npm run jsdoc
```

- Run tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

- Display file structure tree

```bash
npm run tree
```

- Automatically write the changelog

```bash
npm run changelog
```

- Prepare project

```bash
npm prepare
```

Notice:
Currently, `npm prepare` prepares _husky_ to manage pre-commit hooks. Also, `npm prepare` runs _automotically_ with `npm install`

### Extended Documentation

- [JSDocs](https://jsdoc.app/)
- [Battlesnake Docs](https://docs.battlesnake.com/)
- [Railway Docs (Quickstart)](http://docs.railway.com/quick-start)
