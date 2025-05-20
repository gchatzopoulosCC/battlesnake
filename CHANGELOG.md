# Changelog

A summary of notable changes in the project.
## 2025-05-13

## Refactored

-   Transferred `avoidanceChecker` declaration outside of `avoidSelf` and `avoidOthers` for better reuse and structure (@gchatzopoulosCC).
-   Created `createAvoidanceChecker` function to encapsulate avoidance logic and used it in `avoidSelf` and `avoidOthers` (@gchatzopoulosCC).
-   Renamed variables for clarity (e.g., `checkAvoidance` → `avoidanceChecker`, `getMapFunction` → `getSetFunction`) (@gchatzopoulosCC).
-   Renamed `collisionMap` to `collisionSet` and `bodyMap` to `bodySet` consistently across modules (@gchatzopoulosCC).
-   Moved files (`adjacentPositions`, `moves`, `collisionMap`) to `common/sets` and renamed/structured directories (`common` → `lib`) (@gchatzopoulosCC).
-   Simplified `avoidOthers.js` and `avoidSelf.js` by importing shared utilities from new files (@gchatzopoulosCC).
-   Refactored `coordinates` logic: created dedicated file, updated `parseCoordinates` signature, and used in `adjacentPositions` (@gchatzopoulosCC).
-   Updated `game.js` to remove Battlesnake-generated boilerplate comments (@gchatzopoulosCC).
-   Moved the `moves` folder inside `lib/` for better separation of concerns (@gchatzopoulosCC).
-   Created `snake/body.js` to hold common logic for retrieving head and tail positions (@gchatzopoulosCC).
-   Rewrote logic for adjacent/collision checks with consolidated methods and proper deconstructed imports (@gchatzopoulosCC).

## Fixed

-   Fixed issues in `moves.js` with variable references, import paths, and missing `gameState` parameter (@gchatzopoulosCC).
-   Added missing file extensions to various imports to ensure module compatibility (@gchatzopoulosCC).
-   Corrected import logic and loop structure in `avoidOthers` (replaced `forEach` with standard loop) (@gchatzopoulosCC).
-   Fixed vertical positioning logic in `getUpAdjacentPosition` and `getDownAdjacentPosition` (@gchatzopoulosCC).
-   Reflected structural updates across `avoidOthers`, `snake`, `getCollisionMap`, and `collisionSet` modules (@gchatzopoulosCC).

## Chore

-   Ran Prettier on the entire codebase to apply consistent formatting after structural refactoring (@gchatzopoulosCC).
-   Removed unused/generated icon asset from project files (@gchatzopoulosCC).

## 2025-04-30

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
