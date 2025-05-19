# Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Instalation](#instalation)
  - [Usage](#usage)
    - [Deployment](#deployment)
    - [Game Playing](#game-playing)
  - [Folder structure](#folder-structure)
  - [References](#references)

# About the Project

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

This is the official repository of Group 4 for assessment (Battlesnake project) of module CCS2430 (Software Development in Practice) at CITY College, University of York Europe Campus. Here it is included all the code needed for the complition of the assignment.

Authors (GitHub usernames):

- gchatzopoulosCC
- pcharalampidis
- Almanidou
- jhoxha1
- sdemba
- mgramozi

## Built With

This project is built using:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## Getting started

### Prerequisites

This project requires nodeJS to be installed. For this follow the official [NodeJS installation documentation](https://nodejs.org/en/download)

### Instalation

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

## Usage

The usage of this application is not designed to e deployed locally. For this the project needs to be deployed on the cloud.

### Deployment

If one wishes to deploy locally

```bash
node server.js
```

Cloud (Railway)

- **Production Environment**
  1.  Sign in/Register on [Railway](https://railway.com/) using **GitHub**
  2.  Create a new Project
  3.  Deploy from GitHub using this repository (gchatzopoulosCC/battlesnake/)
  4.  Navigate to the newly created deployment's settings
  5.  Generate a new domain using any valid port (8080 is recommended)
  6.  Copy the server url (it will be useful later)
- **Testing Environment**
  1.  In Railway create a new `environment` and name it _testing_
  2.  Go to the new environment settings:
      2.1. Add the branch that is ought to be tested
      2.2. Generate a new domain using any valid port (8080 is recommended)
      2.3. Copy the server url (it will be useful later)
- **Development Environment**
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

## Folder structure

```
/
├── index.js                    # Main entry point that initializes the server
├── server.js                   # Express server configuration for the Battlesnake API
├── .editorconfig               # Editor configuration for consistent code style
├── .prettierrc.json            # Prettier code formatter configuration
├── eslint.config.mjs           # ESLint code quality rules
├── src/
│   ├── core/
│   │   ├── game.js             # Game lifecycle handlers (start, end, info)
│   │   └── snake.js            # Main snake movement logic
│   ├── common/
│   │   ├── sets/
│   │   │   ├── adjacentPositions.js  # Functions to get adjacent positions
│   │   │   ├── coordinates.js        # Coordinate parsing utilities
│   │   │   └── moves.js              # Move generation functions
│   │   └── snake/
│   │       └── body.js               # Snake body segment access functions
│   ├── lib/
│   │   └── moves/
│   │       ├── avoidGoingBackwards.js # Prevents moving into neck
│   │       ├── avoidOthers.js         # Avoids other snakes
│   │       ├── avoidSelf.js           # Prevents self-collisions
│   │       └── avoidWalls.js          # Prevents hitting boundaries
│   └── utils/
│       ├── moves/
│       │   └── avoidanceChecker.js    # Generic collision checker
│       └── sets/
│           ├── bodySet.js             # Creates set of body segments
│           └── collisionSet.js        # Creates set of other snake positions
```

## References

- [Battlesnake Docs](https://docs.battlesnake.com/)
- [Railway Docs (Quickstart)](http://docs.railway.com/quick-start)
