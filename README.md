# FrontendTemplate
Empty application with integrated build system

## Usage
* Clone this repository in any folder
```bash
git clone https://github.com/miptleha/FrontendTemplate.git
```
* Rename FrontendTemplate folder to your application name, remove `.git` filder, edit `package.json`
* Download build modules
```bash
npm init
```
* Add files (html: in `app` folder, js: `app/scripts/src`, sass: `app/styles/scss`, images: `app/images`, fonts: `app/fonts`)
* Run gulp default task to start site in live reload mode
```bash
gulp
```
* Run publish task to create site distributive (in `dist` folder)
```bash
gulp publish
```

## Details
Idea and source code taken from [brunch site](https://brunch.io/) and [gulp documentation](https://gulpjs.com/docs/en/getting-started/quick-start).

## Used gulp pluggins
* Logger: [fancy-log](https://github.com/gulpjs/fancy-log)
* Concat files: [gulp-concat](https://github.com/gulp-community/gulp-concat)
* Minify JavaScript: [gulp-uglify](https://github.com/terinjokes/gulp-uglify/)
* Sass preprocessor: [gulp-sass](https://github.com/dlmanning/gulp-sass)
* Webserver: [gulp-connect](https://github.com/avevlad/gulp-connect)
* Delete files and directories: [del](https://github.com/sindresorhus/del)
* Add prefixes to CSS: [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
* ECMAScript compiler: [gulp-babel](https://github.com/babel/gulp-babel)
