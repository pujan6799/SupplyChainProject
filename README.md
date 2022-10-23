# SupplyChain

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Install GitHub page package
npm i -g angular-cli-ghpages --save


ng build --prod --base-href "/{{repo_name}}/"


lastly, enter the below commands which creates a new branch called gh-pages and pushes
the compiled code to the branch.
ngh --dir=dist/{{project-name_inside_dist}}
OR
angular-cli-ghpages


in dist/{{project-name_inside_dist}}/

IMPORTANT :- create a 404.html and copy contents of index.html file (available in same directory) to this 404 file
