'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
	
	async prompting() {
		this.log('Welcome to the yo ' + chalk.bold.red('ANGULAR') + ' generator!');
		this.answers = await this.prompt([
		  {
			type: "input",
			name: "appname",
			message: "Your project name",
			validate: function(input) {
				if (input) {
					return true;
				}
				return false;
			}
		  },
		  {
			type: "list",
			name: "stylePreprocessor",
			message: "Which CSS pre-processor do you want to use?",
			choices: [
				"css",
				"scss",
				"sass",
				"less",
				"styl"
			],
			default: 'scss'
		  },
		  {
			type: "input",
			name: "prefix",
			message: "Would you like a prefix? (eg: <prefix-componentName></>)",
			default: 'app'
		  },
		  {
			type: "confirm",
			name: "routing",
			message: "Generate routing module?",
			default: true
		  },
		  {
			type: "confirm",
			name: "tests",
			message: "Add tests?",
			default: false
		  },
		  {
			type: "confirm",
			name: "ngxTranslate",
			message: "Would you like to use Ngx-translate(i18n)?",
			default: false
		  },
		  {
			type: "confirm",
			name: "ngRx",
			message: "Would you like to use NgRx?",
			default: false
		  },
		  {
			type: "confirm",
			name: "cordova",
			message: "Would you like to use Cordova?",
			default: false
		  },
		  {
			type: "confirm",
			name: "imagemin",
			message: "Use Imagemin lib to optimize images?",
			default: false
		  },
		  {
			type: "confirm",
			name: "warGrunt",
			message: "Would you like WAR package creation (with Grunt)?",
			default: false
		  },
		  {
			type: "confirm",
			name: "mocks",
			message: "Would you like to add mocks with Flask (python)?",
			default: false
		  },
		  {
			type: "confirm",
			name: "compodoc",
			message: "Would you like to add Compodoc(documentation tool)?",
			default: false
		  },
		]);
		
		this.log("\n");
		this.log(chalk.bold.bgBlueBright(" __________________________________________________________"));
		this.log("\n");
		this.log("        :::::::::  :::::::::: :::::::::  :::     :::   ::: ");
		this.log("       :+:    :+: :+:        :+:    :+: :+:     :+:   :+:  ");
		this.log("      +:+    +:+ +:+        +:+    +:+ +:+      +:+ +:+    ");
		this.log("     +#++:++#:  +#++:++#   +#++:++#+  +#+       +#++:      ");
		this.log("    +#+    +#+ +#+        +#+        +#+        +#+        ");
		this.log("   #+#    #+# #+#        #+#        #+#        #+#         ");
		this.log("  ###    ### ########## ###        ########## ###          ");
		this.log("\n");
		//this.log("| App name:", chalk.green(this.answers.appname));
		//this.log("| Mocks:", this.answers.mocks);
		this.log(chalk.bold.bgBlueBright("___________________________________________________________"));
		this.log("\n");
	}
	
	references() {
		this.log(chalk.bold.bgGreen('References'));
		this.log(chalk.bold.bgRed('README') + chalk.bold.green(': https://github.com/TommyR22/generator-angular-reply/blob/master/generators/app/templates/_README.md'));
		this.log("\n");
		// process.exit(0);
	}
	
	
	writing() {
		this.log(chalk.bold.blue("------------------------"));
		this.log(chalk.bold.blue("[Angular CLI] Setting up"));
		this.log(chalk.bold.blue("------------------------"));
		this.spawnCommandSync('npm', ['install', '-g', '@angular/cli']);
		const ngOptions = ['new', this.answers.appname];

		if (this.answers.prefix !== 'app') {
			ngOptions.push('--prefix=' + this.answers.prefix);
		}
		if (this.answers.routing) {
			ngOptions.push('--routing=true');
		}
		if (!this.answers.tests) {
			ngOptions.push('--skipTests=true');
		}
		ngOptions.push('--style=' + this.answers.stylePreprocessor);
		this.log(chalk.bold.green("[Angular CLI] Creating app: ") + chalk.bold.blue(this.answers.appname));
		this.spawnCommandSync('ng', ngOptions);
		
 		// Copy Angular file
		this.log(chalk.bold.blue("------------------------------"));
		this.log(chalk.bold.blue("[Angular Utilities] Setting up"));
		this.log(chalk.bold.blue("------------------------------"));
		this.fs.copy(
			this.templatePath('_core/_core.module.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/core.module.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_interceptors/_loader-interceptor.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/interceptors/loader-interceptor.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_interceptors/_log-interceptor.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/interceptors/log-interceptor.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_interceptors/_request-interceptor.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/interceptors/request-interceptor.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_pipes/_capitalize-first.pipe.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/pipes/capitalize-first.pipe.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_backend.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/backend.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_loader.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/loader.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_popup.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/popup.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_storage.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/storage.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_window-ref.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/window-ref.service.ts')
		);
		this.fs.copy(
			this.templatePath('_core/_services/_utility.service.ts'),
			this.destinationPath(this.answers.appname + '/src/app/core/services/utility.service.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_shared.module.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/shared.module.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_loader/_loader.component.html'),
			this.destinationPath(this.answers.appname + '/src/app/shared/loader/loader.component.html')
		);
		this.fs.copy(
			this.templatePath('_shared/_loader/_loader.component.scss'),
			this.destinationPath(this.answers.appname + '/src/app/shared/loader/loader.component.scss')
		);
		this.fs.copy(
			this.templatePath('_shared/_loader/_loader.component.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/loader/loader.component.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_loader/_loader.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/loader/loader.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_popup/_popup.component.html'),
			this.destinationPath(this.answers.appname + '/src/app/shared/popup/popup.component.html')
		);
		this.fs.copy(
			this.templatePath('_shared/_popup/_popup.component.scss'),
			this.destinationPath(this.answers.appname + '/src/app/shared/popup/popup.component.scss')
		);
		this.fs.copy(
			this.templatePath('_shared/_popup/_popup.component.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/popup/popup.component.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_popup/_popup.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/popup/popup.ts')
		);
		this.fs.copy(
			this.templatePath('_shared/_directives/_drag-drop-upload.directive.ts'),
			this.destinationPath(this.answers.appname + '/src/app/shared/directives/drag-drop-upload.directive.ts')
		);
		this.fs.copy(
			this.templatePath('_app.module.ts'),
			this.destinationPath(this.answers.appname + '/src/app/app.module.ts')
		);
		this.fs.copy(
			this.templatePath('_proxy.conf.json'),
			this.destinationPath(this.answers.appname + '/proxy.conf.json')
		);
		this.log(chalk.bold.green("[Angular Utilities] Files successfully copied!"));
		
		//Copy README.md
		this.fs.copyTpl(
			this.templatePath('_README.md'),
			this.destinationPath(this.answers.appname + '/README.md'),
			{ title: this.answers.appname }
		);
		  
		 // Copy for mocks Flask
		if (this.answers.mocks) {
			this.log(chalk.bold.blue("------------------"));
		    this.log(chalk.bold.blue("[Flask] Setting up"));
		    this.log(chalk.bold.blue("------------------"));
			this.spawnCommandSync('pip', ['install', 'flask']);
			this.spawnCommandSync('pip', ['install', '-U', 'flask-cors']);
			this.log(chalk.bold.green("[Flask] Successfully installed"));
			this.fs.copy(
				this.templatePath('_mocks/_assets/_config.cfg'),
				this.destinationPath(this.answers.appname + '/serverMocks/assets/config.cfg')
			);
			this.fs.copy(
				this.templatePath('_mocks/_utilsModule/__init__.py'),
				this.destinationPath(this.answers.appname + '/serverMocks/utilsModule/__init__.py')
			);
			this.fs.copy(
				this.templatePath('_mocks/_utilsModule/_mocks.py'),
				this.destinationPath(this.answers.appname + '/serverMocks/utilsModule/mocks.py')
			);
			this.fs.copy(
				this.templatePath('_mocks/_server.py'),
				this.destinationPath(this.answers.appname + '/serverMocks/server.py')
			);
			 this.log(chalk.bold.green("[Flask] Files successfully copied!"));
		}
		 
		 // Copy assets
		 this.log(chalk.bold.blue("-------------------"));
		 this.log(chalk.bold.blue("[Assets] Setting up"));
		 this.log(chalk.bold.blue("-------------------"));
		 this.fs.copy(
			  this.templatePath('_styles/_variables.scss'),
			  this.destinationPath(this.answers.appname + '/src/assets/styles/variables.scss')
		 );	
		 this.fs.copy(
			  this.templatePath('_images/_reply.jpg'),
			  this.destinationPath(this.answers.appname + '/src/assets/images/reply.jpg')
		 );	
		 this.fs.copy(
			  this.templatePath('_icons/_icon-72x72.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-72x72.png')
		 );	
		 this.fs.copy(
			  this.templatePath('_icons/_icon-96x96.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-96x96.png')
		 );	
		 this.fs.copy(
			  this.templatePath('_icons/_icon-128x128.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-128x128.png')
		 );
		 this.fs.copy(
			  this.templatePath('_icons/_icon-144x144.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-144x144.png')
		 );	
		 this.fs.copy(
			  this.templatePath('_icons/_icon-152x152.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-152x152.png')
		 );
		 this.fs.copy(
			  this.templatePath('_icons/_icon-192x192.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-192x192.png')
		 );
		 this.fs.copy(
			  this.templatePath('_icons/_icon-384x384.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-384x384.png')
		 );	
		 this.fs.copy(
			  this.templatePath('_icons/_icon-512x512.png'),
			  this.destinationPath(this.answers.appname + '/src/assets/icons/icon-512x512.png')
		 );
		this.fs.copyTpl(
			  this.templatePath('_manifest.json'),
			  this.destinationPath(this.answers.appname + '/src/manifest.json'),
			  {title: this.answers.appname, short_title: this.answers.appname}
		 );		 
		this.log(chalk.bold.green("[Assets] Files successfully copied!"));
		 
		 // Copy Ngx-translate
		 if (this.answers.ngxTranslate) {
			this.log(chalk.bold.blue("--------------------"));
			this.log(chalk.bold.blue("[ngx-translate] Installing"));
			this.log(chalk.bold.blue("--------------------"));
			this.spawnCommandSync('npm', ['install', '-save', '@ngx-translate/core']);
			this.log(chalk.bold.green("[ngx-translate] Successfully installed globally"));
			this.fs.copy(
				this.templatePath('_assets/_i18n/_en.json'),
				this.destinationPath(this.answers.appname + '/src/assets/i18n/en.json')
			);
			this.log(chalk.bold.green("[ngx-translate] Files successfully copied! see README file for futher info and setup."));
		 }
		 
		 // Copy Cordova
		 if (this.answers.cordova) {
			this.log(chalk.bold.blue("--------------------"));
			this.log(chalk.bold.blue("[Cordova] Installing"));
			this.log(chalk.bold.blue("--------------------"));
			this.spawnCommandSync('npm', ['install', '-g', 'cordova']);
			this.log(chalk.bold.green("[Cordova] Successfully installed globally"));
		 }
		 
		 // Copy NgRx
		 if (this.answers.ngRx) {
			this.log(chalk.bold.blue("-----------------"));
			this.log(chalk.bold.blue("[NgRx] Setting up"));
			this.log(chalk.bold.blue("-----------------"));
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/store'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/effects'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/store-devtools'], {cwd: this.answers.appname + "/"});
			this.log(chalk.bold.green("[NgRx] Successfully installed"));
			this.fs.copy(
				this.templatePath('_state/_app.reducers.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/app.reducers.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_app.state.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/app.state.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_user.state.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/user.state.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_user.actions.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/user.actions.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_user.effects.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/user.effects.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_user.reducer.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/user.reducer.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_user.selectors.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/user.selectors.ts')
			);
				this.fs.copy(
				this.templatePath('_app.component.ngrx.ts'),
				this.destinationPath(this.answers.appname + '/src/app/app.component.ts')
			);
			this.fs.copy(
				this.templatePath('_app.module.ngrx.ts'),
				this.destinationPath(this.answers.appname + '/src/app/app.module.ts')
			);
			this.log(chalk.bold.green("[NgRx] Files successfully copied!"));
		 }
		 
		 // Copy WAR + Grunt
		 if (this.answers.warGrunt) {
			this.log(chalk.bold.blue("------------------------"));
			this.log(chalk.bold.blue("[WAR + Grunt] Setting up"));
			this.log(chalk.bold.blue("------------------------"));
			this.spawnCommandSync('npm', ['install', 'grunt', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'grunt-cli', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'grunt-war', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.log(chalk.bold.green("[WAR + Grunt] Successfully installed"));
			this.fs.copy(
				this.templatePath('_GruntFile.js'),
				this.destinationPath(this.answers.appname + '/GruntFile.js'),
				{ title: this.answers.appname }
			);
			this.log(chalk.bold.green("[WAR + Grunt] Files successfully copied! see README for futher info."));
		 }
		 
		 
		 // Copy for imagemin
		 if (this.answers.imagemin) {
			this.log(chalk.bold.blue("---------------------"));
			this.log(chalk.bold.blue("[Imagemin] Setting up"));
			this.log(chalk.bold.blue("---------------------"));
			this.spawnCommandSync('npm', ['install', 'imagemin'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-mozjpeg', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-pngquant', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-webp', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.log(chalk.bold.green("[Imagemin] Successfully installed"));
			this.fs.copy(
			  this.templatePath('_imagemin_task.js'),
			  this.destinationPath(this.answers.appname + '/imagemin_task.js')
			);
			this.log(chalk.bold.green("[Imagemin] Files successfully copied! see README for futher info."));
		 }
		 
		
		// Compodoc
		if (this.answers.compodoc) {
			this.log(chalk.bold.blue("------------------------"));
			this.log(chalk.bold.blue("[Compodoc] Setting up"));
			this.log(chalk.bold.blue("------------------------"));
			this.spawnCommandSync('npm', ['install', '@compodoc/compodoc', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.log(chalk.bold.green("[Compodoc] Successfully installed"));
			this.fs.copy(
				this.templatePath('_tsconfig.doc.json'),
				this.destinationPath(this.answers.appname + '/tsconfig.doc.json')
			);
			this.log(chalk.bold.green("[Compodoc] Files successfully copied! see README for futher info."));
		}
		
		this.log("\n"); 
		this.log(chalk.bold.bgRed("REMEMBER to see README file to setting up proxy and other stuff!")); 
		this.log(chalk.bold.bgRed("Overwrite the following files with Y command!")); 
		this.log("\n"); 
	};
	
	
	
	//install() {
	//	this.installDependencies({
	//	  npm: false,
	//	  bower: false,
	//	  yarn: true
	//	});
	//}
	
};

