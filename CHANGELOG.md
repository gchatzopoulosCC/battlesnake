# Changelog

All notable changes to the Battlesnake project will be documented in this file.


## [Upcoming Version] - 2025-04-30

### Added
- Configure dependabot (#29, @George Chatzopoulos)
- Add a deployment quickstart guide on the README.md (@George Chatzopoulos)
- Add the user story template (@George Chatzopoulos)
- Create a dependabot.yml for dependency updates (@George Chatzopoulos)
- Add a pull request template in .github/ (@George Chatzopoulos)
- Added function to avoid going backwards in `src/common/move.js` (@George Chatzopoulos)
- Move game core functions to `src/core/game.js` (@George Chatzopoulos)
- Create issue templates (@George Chatzopoulos)
- Function to avoid collisions with other snakes (@George Chatzopoulos)
- Initial implementation of snake game logic (@George Chatzopoulos)
- Basic snake movement implementation (@George Chatzopoulos)
- Wall detection functionality (@George Chatzopoulos)
- Server setup with Express (@George Chatzopoulos)
- Add a generic nodejs gitignore (@George Chatzopoulos)
- CI initial code (@pcharalampidis)
- Basic server configuration (@gchatzopoulosCC)
- Project documentation (@gchatzopoulosCC)

### Changed
- Bump the versions of the dependencies (@george-chatzopoulos)
- Format eslint.config.js (@jhoxha1)
- Add default eslint config (@jhoxha1)
- Update README with deployment instructions (@George Chatzopoulos)
- Update game.js (@sdemba)
- Optimized move functions for better performance (#18, @jhoxha1, @George Chatzopoulos)
- Refactored base structure (#9, @jhoxha1)
- Resolve structural conflicts with the avoidSelf function being in the index.js (@George Chatzopoulos)
- Remove unused variables boardWidth and boardHeight from index.js (@George Chatzopoulos)
- Rewrite avoidOthers for clarity and add an early exit (@George Chatzopoulos)
- Rewrite avoidWalls functions for better clarity (@George Chatzopoulos)
- Replace the code for avoidance of other snakes in index.js with an avoidOthers function in src/common/move.js (@George Chatzopoulos)
- Delete the is<Direction>Safe functions add an avoidWalls function to prevent the snakes going out of bounds (@George Chatzopoulos)
- Make the snake not go out of bounds and prepare the code for not colliding with other snakes (@George Chatzopoulos)
- Updated boundary checking logic (@George Chatzopoulos)
- Updated configuration files (@gchatzopoulosCC)
- Improved code organization (@gchatzopoulosCC)
- Updated dependencies to latest versions (@gchatzopoulosCC)

### Fixed
- Fix undefined myHead variable in avoidSelf function (@Fotini Almanidou)
- Fix snake self-collision detection (@Fotini Almanidou)
- Fix bug in wall avoidance logic (@gchatzopoulosCC)

### Security
- Bump node-fetch from 3.2.6 to 3.2.10 (#22, @dependabot[bot])
- Bump body-parser and express (#26, @dependabot[bot])

## [1.0.0] - 2025-04-02

### Added
- Self-collision avoidance functionality (@falmanidou)
- Pull request template in `.github/` (@gchatzopoulosCC)
- Issue templates for feature requests and bug reports (@gchatzopoulosCC)
- Added new move functions (@gchatzopoulosCC)

### Changed
- Optimized move functions for better performance (#18, @gchatzopoulosCC)
- Refactored base structure (#9, @sdemba)
- Improved `avoidOthers` function with early exit for no safe moves (@gchatzopoulosCC)
- Updated `README.md` with setup instructions (@gchatzopoulosCC)

### Fixed
- Fixed undefined `myHead` variable in `avoidSelf` function (@falmanidou)
- Fixed snake self-collision detection (@falmanidou)
- Fixed bug in wall avoidance logic (@gchatzopoulosCC)

## [0.9.0] - 2023-03-29

### Added
- Function to avoid collisions with other snakes (@gchatzopoulosCC)
- Function to avoid going backwards (@gchatzopoulosCC)
- Initial implementation of snake game logic (@gchatzopoulosCC)

### Changed
- Moved core functions to appropriate files in `src/core/` (@gchatzopoulosCC)
- Rewrote `avoidWalls` function for better clarity (@gchatzopoulosCC)
- Restructured project directories (@gchatzopoulosCC)

### Security
- Dependency updates for body-parser, express, path-to-regexp, serve-static, cookie, send, and node-fetch

## [0.8.0] - 2023-03-15

### Added
- Basic snake movement implementation (@gchatzopoulosCC)
- Wall detection functionality (@gchatzopoulosCC)
- Server setup with Express (@gchatzopoulosCC)

### Changed
- Updated configuration files (@gchatzopoulosCC)
- Improved code organization (@gchatzopoulosCC)

## [0.7.0] - 2023-03-01

### Added
- Initial project setup (@gchatzopoulosCC)
- Basic server configuration (@gchatzopoulosCC)
- Project documentation (@gchatzopoulosCC)

### Changed
- Updated dependencies to latest versions (@gchatzopoulosCC)