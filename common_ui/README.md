# Common UI

## About

Project for shared UI components. All available components are inside /src directory.

## Prerequisites

1. Install yarn.
2. Run `yarn` to install all dependencies.

## Start local development server

`yarn dev`

## Start local UI components catalog (storybook)

`yarn storybook`

## Build production application

`yarn build`

## Link module to be accessed as dependency from node_modules

`yarn link`

## Project structure

    .
    ├── .storybook              # Storybook configuration files
    ├── src
    │   ├── _shared             # Shared functionalities across common_ui module
    │      ├── components       # Shared components
           ├── hooks            # Shared react hooks
           ├── types            # Shared typescript types
           ├── utils            # Shared utility functions
    │   ├── _styles             # Common style constants (like colors, fonts etc.)
    │   ├── accordion           # Common UI component (eg. Accordion)
    │   ├── ...rest             # Every other Common UI component
    └── ...

## Commands

- `yarn build`: To build the production application in the dist folder.
- `yarn storybook`: Run local developement server with storybook UI catalog.
- `yarn build-storybook`: To build the production storybook UI catalog.
- `yarn test`: To run the entire unit test suite using `jest`.
- `yarn eslint`: To run the ESLint based linter to find out the issues in the project.
- `yarn watch:css`: To run watcher to transform styles.
- `yarn prettier`: To autoformat all the issues.

## Command to change watchers limit:

`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
