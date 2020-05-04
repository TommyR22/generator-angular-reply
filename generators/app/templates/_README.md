# <%= title %>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and Yeoman generator (https://github.com/TommyR22/generator-angular-reply)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Server mock
Build with python and Flask microframework.
run: `python server.py` inside serverMocks to run Flask web server.
update `mocks.py` with REST services.


## Using global variable scss
Insert in angular.json:
```
"stylePreprocessorOptions": {
    "includePaths": [
        "src/assets/styles"
    ]
}
```
eg:  

```
"architect": {
	"build": {
	  "builder": "@angular-devkit/build-angular:browser",
	  "options": {
		"outputPath": "dist/wedding",
		"index": "src/index.html",
		"main": "src/main.ts",
		"polyfills": "src/polyfills.ts",
		"tsConfig": "tsconfig.app.json",
		"aot": true,
		"assets": [
		  "src/favicon.ico",
		  "src/assets",
		  "src/manifest.json"
		],
		"styles": [
		  "src/styles.scss"
		],
		"stylePreprocessorOptions": {
		  "includePaths": [
			"src/assets/styles"
		  ]
		},
		"scripts": []
	  } ....
```


in SCSS files:
```
@import "variables";
```

## Manifest
add: `<link rel="manifest" href="manifest.json">`  
in index.html for web manifest.

add: `src/manifest.json`
in angular.json below "assets".

## Optimization images
### imagemin
npm i imagemin  -> plugin compression images
npm install imagemin-mozjpeg --save-dev -> lossy compression for JPG
npm install imagemin-pngquant --save-dev    -> lossy compression for PNG
npm install imagemin-webp --save-dev

run 'node imagemin_task.js'

#### use webp on html
<picture>
    <source srcset="sample_image.webp" type="image/webp">
    <source srcset="sample_image.jpg" type="image/jpg">
    <img src="sample_image.jpg" alt="">
</picture>

#### use webp on css
*use modernizr to detect webp support.
*create two class:

.no-webp .elementWithBackgroundImage {
  background-image: url("image.jpg");
}

.webp .elementWithBackgroundImage{
  background-image: url("image.webp");
}

## Optimization fonts
### display text immediately
@font-face {
  font-family: Helvetica;
  font-display: swap;
}

with "swap" the system display text with a system font.
Once the custom font is ready, the system font is swapped out.

## Service worker
ng add @angular/pwa --project appname

## Cancel Http pending requests
* `private ngUnsubscribe = new Subject();`
* `takeUntil(this.ngUnsubscribe)` at the END of operators (just before .subscribe())
* `ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }`

## Cordova
create directory ```www``` in root project.
change:
```"outputPath": "www" ```
in angular.json to build angular project inside "www" directory.

run: 
```
cordova add platform <android/ios>
cordova platform save
cordova plugin save
cordova prepare
```
Run app on physical devices ANDROID: `cordova run android`
Run app on physical devices IOS: `cordova run ios --device`
Run app on emulator IOS: `cordova emulate ios --buildFlag='-UseModernBuildSystem=0'`
Build: `cordova build android --release`



