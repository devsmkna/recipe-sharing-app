# Recipe Sharing App - Backend

Recipe Sharing App is a web application developed to gain experience and confidence with tools like NodeJs, Typescript, Mongoose, and Express.

## Enviroment Variables

The table below lists the environmental variables needed to run the application.

| Name | Description |
| :--- | :---------- |

## Project specifications

### Git

The primary branch on the repository is `main`, the branches that will apport changes to the repository will be detached from it. The new branches will have a prefix to specify the type of changes delivered:
- `feat/` identifies the branches that implement a new feature
- `fix/` identifies the branches that fix one or more bugs
- `doc/` identifies the branches that apport modification to the documentation
- `refactor/` identifies the branches that refactorize features already implemented
- `deploy/` identifies the branches that create and/or edit the flow to deploy the repository

**The primary branch is reserved, no direct push should be deployed.**

The changes on the other branches will be merged on `main` only after the code review on the relative pull request is completed. Threads open in a PR will be marked as solved by the user who opened it. The merge will be executed after receiving at least one approval on the PR, using the *squash and merge* and automatically deleting the origin branch.

**The commit messages will follow the conventional commit rules.**

### Naming convention

All code will be written in english *(comments too)*.

Variables and functions, database tables and properties will follow the `camelCase` notaiton.

API endpoints will follow the `kebab-case` notation, and will use a prefix that specify the version.

### Quality of code

The quality of code will be achieved using `typescript-eslint` and `prettier`.