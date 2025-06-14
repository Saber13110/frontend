# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

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

## Google Maps API Key

Google Maps is loaded dynamically using the key defined in the Angular environment files.

1. Open `src/environments/environment.ts` (and `environment.prod.ts` for production) and set the `googleMapsApiKey` property.
2. **Do not commit your real key.** You can create copies named `environment.local.ts` and `environment.prod.local.ts` containing the key and add them to version control ignore rules.

```bash
cp src/environments/environment.ts src/environments/environment.local.ts
cp src/environments/environment.prod.ts src/environments/environment.prod.local.ts
# edit the *.local.ts files to add your key
```

Add the following line to `.gitignore` to keep the local files private:

```
src/environments/*.local.ts
```

Update your build configuration if needed to use the local files. For simple development you can replace the original environment files manually before running `ng serve`.
