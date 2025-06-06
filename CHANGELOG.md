# Changelog

A summary of notable changes in the project.

## [2.1.0] - 2025-05-22

### Fix

- Change the coverage collection from src/**/*.js to tests/**/*.js (@gchatzopoulosCC)
- Add the missing jsdoc script (@gchatzopoulosCC)

### Feature

- Git ignore JetBrains IDEs settings

### Refactor

- Rename the previous utils folder to helper, and the previous core folder to utils. Also transfer the contents of common in the now helper folder (@gchatzopoulosCC)
- Transfer the test files to their own tests directory (@gchatzopoulosCC)
- Change the location of the PR template to PULL_REQUEST_TEMPLATE/pull_request_template.md (@gchatzopoulosCC)

## [2.0.0] - 2025-05-21

### Feature

- Write a SECURITY.md (@gchatzopoulosCC)
- Create a getNeck function to get just the neck of the snake (one segment after the head) (@gchatzopoulosCC)

### Docs

- Added changelog entries for dates ranging from 2025-05-13 to 2025-05-20 (`CHANGELOG.md`) (@sdemba).
- Documented the entire codebase using JSDoc and merged it into `develop` via `docs/codebase` branch (#67, @gchatzopoulosCC).
- Fixed minor typos in `README.md` (@gchatzopoulosCC, co-authored with Copilot).

### Fixed

- Fixed import path in `avoidWalls` and added missing import statements (@gchatzopoulosCC).
- Updated `body.js` and `bodySet.js` to return the full tail instead of just the first segment (@gchatzopoulosCC).
- Reverted `bodySet` to use `gameState.you.body.slice(1)` for tail retrieval (@gchatzopoulosCC).
- Resolved merge conflicts between `patch/CHANGELOG` and `develop` to keep branches in sync (@sdemba).
- Add the release version in CHANGELOG on 2025-04-30 (@gchatzopoulosCC)
- Make esling ignore unecessary files: node_modules/, out/ (@gchatzopoulosCC)
- Get the neck of the snake instead of the whole tail in avoidGoingBackwards (@gchatzopoulosCC)

### Refactor

- Format CHANGELOG with Prettier (@gchatzopoulosCC)

### Chore

- Corrected markdown formatting in `CHANGELOG.md` (replaced `###` with correct `##`) (@sdemba).

## 2025-05-20

### Fixed

- Changed snake color from pink to black in `game.js` as part of a visual hotfix (@sdemba).
- Updated README to change the run command from `node server.js` to `node index.js` consistently across all locations (@gchatzopoulosCC).
- Resolved merge conflicts in `body.js`, `game.js`, `avoidWalls.js`, and `avoidanceChecker.js` during `develop` rebase (@gchatzopoulosCC).

### Refactored

- Merged major codebase restructuring changes into `develop` from `main` and `refactor/codebase` branches (#64, @gchatzopoulosCC).

## 2025-05-19

### Added

- Introduced JSDoc support: added script to `package.json` and installed JSDoc dependencies (@gchatzopoulosCC).
- Generated HTML documentation using JSDoc and added it to the `out/` directory (@gchatzopoulosCC).

### Docs

- Expanded and restructured `README.md`: added project overview, prerequisites, installation instructions, table of contents, and renamed sections based on slides (@gchatzopoulosCC).
- Added detailed inline documentation to all core files: `avoidSelf`, `avoidOthers`, `avoidWalls`, `avoidGoingBackwards`, `avoidanceChecker`, `bodySet`, `collisionSet`, `snake.js`, `game.js`, `body.js`, `index.js`, and `server.js` (@gchatzopoulosCC).
- Added `@requires` tags where needed for internal dependencies (@gchatzopoulosCC).

### Fixed

- Corrected `getTail` logic in `body.js` to use `gameState.you.body[1]` (@gchatzopoulosCC).
- Fixed incorrect return type in `adjacentPositions` (changed from Object to String) (@gchatzopoulosCC).
- Corrected missing `return` statement in `avoidGoingBackwards` (@gchatzopoulosCC).
- Updated `.prettierignore` to ignore `/out/` and modified `.gitignore` to allow HTML docs upload (@gchatzopoulosCC).
- Fixed documentation errors in various modules (@gchatzopoulosCC).

### Refactored

- Updated `avoidWalls` and `avoidGoingBackwards` to use helper functions like `getHead(gameState)` and `getTail(gameState)` (@gchatzopoulosCC).
- Reformatted entire codebase using Prettier to ensure consistency after major documentation additions (@gchatzopoulosCC).
- Moved the description block to the top of `README.md` for clarity (@gchatzopoulosCC).

### Chore

- Ran Prettier formatting across the project after structural and doc updates (@gchatzopoulosCC).

## 2025-05-18

### Refactored

- Updated `moves` module to use `getHead(gameState)` instead of manually retrieving the snake's head position (@gchatzopoulosCC).
- Renamed the `map` variable to `set` in the `avoidanceChecker` module for semantic clarity (@gchatzopoulosCC).
- Renamed function parameter `getMapFunction` to `getSetFunction` in `avoidanceChecker` to reflect new internal logic (@gchatzopoulosCC).

## 2025-05-14

### Refactored

- Changed `eslint.config.js` to `eslint.config.mjs` and used `defineConfig` alias (@gchatzopoulosCC).
- Moved `lib/sets` files into a unified `utils/sets` folder to improve structure (@gchatzopoulosCC).
- Ran Prettier and formatted the entire codebase for consistency (@gchatzopoulosCC).
- Removed unnecessary content from `.prettierrc` as all values matched defaults (@gchatzopoulosCC).
- Simplified `collisionSet` content retrieval logic (@gchatzopoulosCC).
- Renamed `collisionMap` to `collisionSet` throughout the codebase (@gchatzopoulosCC).
- Renamed `bodyMap` to `bodySet` throughout the codebase (@gchatzopoulosCC).
- Capitalized "body" and "collision" in function signatures where applicable (@gchatzopoulosCC).
- Moved `bodySet` and `collisionSet` to a shared `sets` folder from individual modules (@gchatzopoulosCC).
- Refactored coordinate handling logic by:
  - Creating a dedicated file for coordinate functions
  - Changing `parseCoordinates` to take `(x, y)` instead of position
  - Using `parseCoordinates` in `adjacentPositions` instead of manual formatting (@gchatzopoulosCC).

### Fixed

- Fixed import paths by adding missing extensions in `adjacentPositions`, `avoidOthers`, and `avoidSelf` modules (@gchatzopoulosCC).

### Chore

- Applied automated Prettier formatting across files post-refactor (@gchatzopoulosCC).

## 2025-05-13

### Refactored

- Transferred `avoidanceChecker` declaration outside of `avoidSelf` and `avoidOthers` for better reuse and structure (@gchatzopoulosCC).
- Created `createAvoidanceChecker` function to encapsulate avoidance logic and used it in `avoidSelf` and `avoidOthers` (@gchatzopoulosCC).
- Renamed variables for clarity (e.g., `checkAvoidance` → `avoidanceChecker`, `getMapFunction` → `getSetFunction`) (@gchatzopoulosCC).
- Renamed `collisionMap` to `collisionSet` and `bodyMap` to `bodySet` consistently across modules (@gchatzopoulosCC).
- Moved files (`adjacentPositions`, `moves`, `collisionMap`) to `common/sets` and renamed/structured directories (`common` → `lib`) (@gchatzopoulosCC).
- Simplified `avoidOthers.js` and `avoidSelf.js` by importing shared utilities from new files (@gchatzopoulosCC).
- Refactored `coordinates` logic: created dedicated file, updated `parseCoordinates` signature, and used in `adjacentPositions` (@gchatzopoulosCC).
- Updated `game.js` to remove Battlesnake-generated boilerplate comments (@gchatzopoulosCC).
- Moved the `moves` folder inside `lib/` for better separation of concerns (@gchatzopoulosCC).
- Created `snake/body.js` to hold common logic for retrieving head and tail positions (@gchatzopoulosCC).
- Rewrote logic for adjacent/collision checks with consolidated methods and proper deconstructed imports (@gchatzopoulosCC).

### Fixed

- Fixed issues in `moves.js` with variable references, import paths, and missing `gameState` parameter (@gchatzopoulosCC).
- Added missing file extensions to various imports to ensure module compatibility (@gchatzopoulosCC).
- Corrected import logic and loop structure in `avoidOthers` (replaced `forEach` with standard loop) (@gchatzopoulosCC).
- Fixed vertical positioning logic in `getUpAdjacentPosition` and `getDownAdjacentPosition` (@gchatzopoulosCC).
- Reflected structural updates across `avoidOthers`, `snake`, `getCollisionMap`, and `collisionSet` modules (@gchatzopoulosCC).

### Chore

- Ran Prettier on the entire codebase to apply consistent formatting after structural refactoring (@gchatzopoulosCC).
- Removed unused/generated icon asset from project files (@gchatzopoulosCC).

## [1.0.0] - 2025-04-30

### Added

- Prettier Configuration: Added default configuration and setup for Prettier code formatting, including ignoring specific files (@george-chatzopoulos).
- ESLint Configuration: Added default configuration and required plugins for ESLint code linting and analysis (#41, #45, @jhoxha1, @George Chatzopoulos).
- EditorConfig: Created and configured `.editorconfig` (#44, @George Chatzopoulos).
- Dependabot: Configured Dependabot for automated dependency updates (#29, @George Chatzopoulos).

### Fixed

- Fixed ESLint errors in the codebase (#56 Merge, @george-chatzopoulos).
- Adjusted Dependabot npm schedule to weekly and changed rebase strategy to auto (#53 Merge, @george-chatzopoulos).
- Resolved issues with `package-lock.json` generation (#48, @george-chatzopoulos, @George Chatzopoulos).
- Removed unnecessary `newfile.js` (#42, @George Chatzopoulos, @george-chatzopoulos).
- Patched the user story template (#31, @George Chatzopoulos).

### Refactored

- Formatted `eslint.config.js` (@jhoxha1).
- Make each move function a seperate file and change the name of the common folder to moves (@george-chatzopoulos)

### Docs

- Updated README with deployment instructions (#29 Merge, @George Chatzopoulos).

### Chore

- Added CHANGELOG.md file (@pcharalampidis).
- Performed initial Prettier setup run (@george-chatzopoulos).
- Bumped versions of dependencies (@george-chatzopoulos).
- Updated `develop` branch to keep up to date with `main` (#49, #46-47, #46, @George Chatzopoulos).

## 2025-04-29

### Added

- Prettier Setup: Initial creation and configuration of Prettier (@sdemba).

### Chore

- Updated `develop` branch from `main` (#28, @George Chatzopoulos).

## 2025-04-09

### Docs

- Added a deployment quickstart guide to the README.md (@George Chatzopoulos).

## 2025-04-08

### Chore

- Generic commit (@jhoxha1).

## 2025-04-07

### Added

- Added the user story template (@George Chatzopoulos).
- Created a `dependabot.yml` file for dependency updates (@George Chatzopoulos).

### Changed

- Removed the versioning strategy from the schema (@George Chatzopoulos).

### Chore

- Bumped node-fetch from 3.2.6 to 3.2.10 (#22, @dependabot[bot]).
- Bumped body-parser and express (#26, @dependabot[bot]).

## 2025-04-01

### Added

- Self Collision Avoidance: Added logic to avoid collision with the snake's own body (@falmanidou, @Fotini Almanidou, @jhoxha1).
- Added logic to check if moving in any direction will result in a collision with the body (@jhoxha1).

### Fixed

- Resolved structural conflicts related to the `avoidSelf` function (@George Chatzopoulos).
- Fixed undefined variable in `avoidSelf` function (@Fotini Almanidou).
- Fixed snake self-collision detection logic (@Fotini Almanidou).
- Corrected syntax/style by removing unnecessary curly brackets and dollar signs (@Fotini Almanidou).

### Changed

- Updated logic for storing body positions (excluding head) (@Fotini Almanidou).
- Generic checkpoint before assistant change (@falmanidou).

### Refactored

- Optimized `src/common/move.js` functions by reducing nesting and using lookups (@George Chatzopoulos).

### Chore

- Test commit for git push (@jhoxha1).

## 2025-03-30

### Added

- Created issue templates (@George Chatzopoulos).

### Changed

- Updated game logic/structure (Generic update to `game.js`) (@sdemba).

## 2025-03-29

### Added

- Project Templates: Added a pull request template in `.github/` (@George Chatzopoulos).
- Movement Logic:
  - Added function to avoid going backwards in `src/common/move.js` (@George Chatzopoulos).
  - Added function to avoid collisions with other snakes in `src/common/move.js` (@George Chatzopoulos).
  - Added an `avoidWalls` function to prevent snakes going out of bounds (@George Chatzopoulos).
- Initial Boundary and Collision Prep: Made the snake not go out of bounds and prepared code for not colliding with other snakes (@George Chatzopoulos).

### Refactored

- Code Structure: Moved core game functions to `src/core/game.js` and snake move logic to `src/core/snakes.js` (@George Chatzopoulos).
- Code Cleanup: Removed unused variables (`boardWidth`, `boardHeight`) from `index.js` (@George Chatzopoulos).
- Logic Rewrites: Rewrote `avoidOthers` and `avoidWalls` functions for improved clarity (@George Chatzopoulos).

## 2025-03-28

### Added

- Initial Setup:
  - Added startup console messages (@George Chatzopoulos).
  - Added a generic nodejs gitignore file (@George Chatzopoulos).
  - Added CI workflow configuration (`blank.yml`) (@George Chatzopoulos).
- Core Logic (Initial):
  - Initial implementation of snake game logic (@George Chatzopoulos).
  - Basic snake movement implementation (@George Chatzopoulos).
  - Wall detection functionality (@George Chatzopoulos).
  - Server setup with Express (@George Chatzopoulos).
  - Basic server configuration (@George Chatzopoulos).

### Changed

- Updated boundary checking logic (@George Chatzopoulos).

### Refactored

- Updated export syntax in `move.js` to ES modules (@George Chatzopoulos).

### Chore

- Generic save and setup commits (@George Chatzopoulos).

## 2025-03-24

### Docs

- Updated README.md (@George Chatzopoulos).

### Added

- Initial commit (@George Chatzopoulos).

## 2025-03-19

### Added

- Initial commit (@George Chatzopoulos).
