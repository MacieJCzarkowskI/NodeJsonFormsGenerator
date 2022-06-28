# Manager

## About

manager is Next.js frontend application that renders application content based on the templates. Templates is JSON schema data that represents HTML elements (like div, span, paragraph) or Components which are predefined inside `src/components/template-renderer/TemplateRenderer.tsx` in COMPONENTS_MAP variable.

Component responsible for rendering elements from templates is implemented inside:
- common_ui/src/template-renderer/TemplateRenderer.tsx

## Prerequisites

1. Install yarn.
2. Clone 'common_ui' repository
3. Run `yarn` in 'common_ui' and then in 'manager' to install all dependencies.

## Start local development server

`yarn dev`

## Build production application

`yarn build`

## To link this project with components we need to add common-ui

 `yarn link common-ui`

## Project structure

    .
    ├── pages                          # Next.js pages directory
    ├── public                         # Static files that are automatically served
    ├── src
    │   ├── components                 # Shared components
    │   ├── css                        # Tailwind config
    │   ├── features                   # Redux logic - contain all functionality related to a specific feature
           ├── authorization           # Functionality related with authorization
           ├── ...
    │   ├── services                   # Services related with REST API
           ├── _api.types.ts           # Service TypeScript types
           ├── authorizationService.ts # Service related with authorization
           ├── ...
    │   ├── store                      # Redux configuration
    │   ├── theme                      # Shared styles
    │   ├── types                      # Global TypeScript types
    │   ├── utils                      # Shared utility functions
    └── ...

## Commands

- `yarn dev`: To start a local development server.
- `yarn build`: To build the production application in the .next folder.
- `yarn start`: After building, it starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages.
- `yarn test`: To run the entire unit test suite using `jest`.
- `yarn test:coverage`: To run tests with coverage.
- `yarn test:debug`: To run tests in debug mode.
- `yarn test:ci`: To run tests on CI.
- `yarn lint`: To run the ESLint based linter to find out the issues in the project.
- `yarn format`: To autoformat all the issues.
- `yarn export`: Run this after running `yarn analyze` to export a build copy.
- `yarn production`: To export a production build. Use `yarn start` to serve that.
- `yarn upgrade --latest`: To upgrade all packages to their latest versions (could include breaking changes).

## Additional information

1. All Next.js entrypoints are housed in the `pages/` directory as a default.
2. Everything else is in the `src/` directory.
3. `src/css` folder is there just to house the Tailwind initialization.
4. All env variables are available in `.env` files (`.env` file isn't committed). Whenever you update `.env`, please update `.env.example` and `.env.test` and `next.config.js` to proxy all environment variables properly.
   You can access these variables in the app source code anywhere using `process.env.<VAR_NAME>`.

My personal preference is to have the bare minimum code in `pages/` and house everything in the `src/` directory. Helps keep everything in one place, neat and tidy.

If you feel like changing the directory structure, please change the appropriate settings in the following files:

- `.babelrc`
- `jest.config.js`
- `postcss.config.js`
- `tsconfig.json`
- The `lint` and the `format` scripts in `package.json`
