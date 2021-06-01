# <%= title %>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and Yeoman generator (https://github.com/TommyR22/generator-angular-reply)

[Angular cheatsheet] (https://angular.io/guide/cheatsheet).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Getting started
### Setting up proxy
* edit file `proxy.config.json` as you like
* add these lines to `angular.json`:
```
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "prova:build:production",
              "proxyConfig": "./proxy.conf.json"
            },
            "development": {
              "browserTarget": "prova:build:development",
              "proxyConfig": "./proxy.conf.json"
            }
          },
          "defaultConfiguration": "development"
        }
```

## Server mock
Build with python and Flask microframework.
run: `python server.py` inside serverMocks to run Flask web server.
go to: `localhost:5000/helloWorld`
update `mocks.py` with REST services.


## Using global variable scss and codeStyle
1) Use BEM methodology for CSS/SCSS: http://getbem.com/introduction/
2) Use Global variable SCSS:
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

## Ngx-Translate
[github page] (https://github.com/ngx-translate/core)
### usage
* Import the `TranslateModule`:
```
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

AppComponent

```
export class AppComponent {
    param = {value: 'world'};

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
}
```

#### SharedModule
If you use a SharedModule that you import in multiple other feature modules, you can export the TranslateModule to make sure you don't have to import it in every module.
```
@NgModule({
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class SharedModule { }
```


## Manifest
add: `<link rel="manifest" href="manifest.json">`  
in `index.html` for web manifest.

add: `src/manifest.json`
in `angular.json` below "assets".

## Optimization images
### imagemin
`npm i imagemin`  -> plugin compression images
`npm install imagemin-mozjpeg --save-dev` -> lossy compression for JPG
`npm install imagemin-pngquant --save-dev`   -> lossy compression for PNG
`npm install imagemin-webp --save-dev`

run `node imagemin_task.js`

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
1) Using `async pipe` in the view.
2) Using `take(1)`:
	* `data$.pipe(take(1)).subscribe(res=>console.log(res))`
3) Using `takeUntil`:
	* `private ngUnsubscribe = new Subject();`
	* `takeUntil(this.ngUnsubscribe)` at the END of operators (just before .subscribe())
	* `ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }`
Eg:
```
this.configService.getConfig()
	.takeUntil(this.ngUnsubscribe)
    .subscribe((data: Config) => this.config = {
        heroesUrl: data.heroesUrl,
        textfile:  data.textfile,
        date: data.date,
});
```

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
- Run app on physical devices ANDROID: `cordova run android`
- Run app on physical devices IOS: `cordova run ios --device`
- Run app on emulator IOS: `cordova emulate ios --buildFlag='-UseModernBuildSystem=0'`
- Build: `cordova build android --release`

## NgRx
Example data provided inside `state` directory.
By default there is a `user` field.
Go to `app.component.ts` to see how to retrieve data from NgRx.

## WAR task and Grunt task runner
Add `"war": "grunt --gruntfile GruntFile.js war"` in `package.json`.
1) update `Gruntfile.js` as needed.
2) change `<%= title %>` in `Gruntfile.js`.
3) run `npm run war`.

## Compodoc (documentation tool)
* update config file on the root of project: `tsconfig.doc.json`
* define a script task in package.json:
```
"scripts": {
  "compodoc": "npx compodoc -p tsconfig.doc.json"
}
```
and run `npm run compodoc`.
Serve generated documentation with compodoc: `compodoc -s`

