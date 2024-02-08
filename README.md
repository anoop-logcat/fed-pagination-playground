# fed-pagination-playground

### A npm workspace designed by Hubspire with typescript.

- Repository 

## Technologies used

- VS Code IDE
- node, npm, npm workspace with NX
- conventional commits with gitmoji
- Husky Hooks
- Apollo graphql server v4
- Eslint and Prettier
- Typescript
- Jest
- Codegen

This boilerplate was developed by [Anoop Benzier (Hubspire)][dill]

## Installation

Boilerplate requires [Node.js](https://nodejs.org/) v16+ to run.
Install the dependencies and devDependencies and start the workspace applications.

```sh
git clone 
cd fed-pagination-playground
npm install
npm run serve
```

## VS Code Extensions

The fed-pagination-playground boilerplate is using the below vscode extensions.

- Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- ES Lint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Conventional Commits (https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen)

## How to Commit?

Before committing your code please install the above mentioned conventional commits vscode extension. There is 2 ways you can commit your code. They are:

- First method, Run `git add .` and then run `npm run commit` this command will help you to commit in conventional format.
- Second method, Run `git add .` and then type `ctrl+shift+p` and search for conventional commit and select that option this plugin will help you to commit in conventional format.

## How to create branch?

Each branch creation has a format. The branch name should be on `{type}/{module}#{proofhub-id}` format. For example if you are working on a bug fix then the `type=fix`, `module=meaningful name for branch`, `proofhub-id=#<your proofhub id>`. Then the branch name becomes `fix/branchName#01010`.

## How to install packages?

This is one of the important thing you need to consider while working on npm workspace based stack. Suppose consider that if our stack have 2 applications named `app-1` and `app-2`. Thus stack will have 3 package.json file one for `app-1`, one for `app-2` and one at the root. When you install a package in root package.json it will available globally for all apps. But if you install a package in `app-1` then it will be available only for that application. So before installing packages first understand its scope in your stack and then choose the appropriate method.
