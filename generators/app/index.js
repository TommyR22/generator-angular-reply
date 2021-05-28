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
			name: "mocks",
			message: "Would you like to create mocks with Flask (python)?",
			default: false
		  },
		]);
		
		this.log(" __________________________________________________________");
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
		this.log("___________________________________________________________");
		this.log("\n");
	}
	
	references() {
		this.log(chalk.bold.bgGreen('References'));
		this.log("Mocks: inside serverMocks directory, run: " + chalk.blue("python server.py"));
		
		// process.exit(0);
	}
	
	
	writing() {
		this.log("Updating/installing " + chalk.bold.green("@angular/cli") + " ...");
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
		this.log("Creating app: " + chalk.bold.green(this.answers.appname) + " ...");
		this.spawnCommandSync('ng', ngOptions);
		
 		// Copy Angular file
		this.log("Setting up " + chalk.bold.green("angular files") + " ...");
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
			this.templatePath('_app.module.ts'),
			this.destinationPath(this.answers.appname + '/src/app/app.module.ts')
		);
		this.fs.copy(
			this.templatePath('_proxy.conf.json'),
			this.destinationPath(this.answers.appname + '/src/app/proxy.conf.json')
		);
		
		
		  
		 // Copy for mocks Flask
		 if (this.answers.mocks) {
			this.log("Setting up " + chalk.bold.green("server mocks") + " ...");
			this.spawnCommandSync('pip', ['install', 'flask']);
			this.spawnCommandSync('pip', ['install', '-U', 'flask-cors']);
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
		 }
		 
		 //Copy README.md
		 this.fs.copyTpl(
			  this.templatePath('_README.md'),
			  this.destinationPath(this.answers.appname + '/README.md'),
			  { title: this.answers.appname }
		 );
		 
		 // Copy assets
		 this.log("Setting up " + chalk.bold.green("assets") + " ...");
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
		 
		 // Copy Cordova
		 if (this.answers.cordova) {
			this.log("Setting up " + chalk.bold.green("Cordova") + " ...");
			this.spawnCommandSync('npm', ['install', '-g', 'cordova']);
		 }
		 
		 // Copy NgRx
		 if (this.answers.ngRx) {
			this.log("Setting up " + chalk.bold.green("NgRx") + " ...");
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/store'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/effects'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', '--save', '@ngrx/store-devtools'], {cwd: this.answers.appname + "/"});
			this.fs.copy(
				this.templatePath('_state/_app.reducers.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/app.reducers.ts')
			);
			this.fs.copy(
				this.templatePath('_state/_app.state.ts'),
				this.destinationPath(this.answers.appname + '/src/app/state/app.state.ts')
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
		 }
		 
		 
		 // Copy for imagemin
		 if (this.answers.imagemin) {
			this.log("Setting up " + chalk.bold.green("imagemin libraries") + " ...");
			this.spawnCommandSync('npm', ['install', 'imagemin'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-mozjpeg', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-pngquant', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.spawnCommandSync('npm', ['install', 'imagemin-webp', '--save-dev'], {cwd: this.answers.appname + "/"});
			this.fs.copy(
			  this.templatePath('_imagemin_task.js'),
			  this.destinationPath(this.answers.appname + '/imagemin_task.js')
			);
		 }
		 
		this.log(chalk.bold.red("REMEMBER to see README file to setting up proxy and other stuff!")); 
		
	};
	
	
	
	//install() {
	//	this.installDependencies({
	//	  npm: false,
	//	  bower: false,
	//	  yarn: true
	//	});
	//}
	
};

