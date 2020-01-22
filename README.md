# FrontendTemplate
Sample static bootstrap site with integrated build system.

## Usage
```bash
git clone https://github.com/miptleha/FrontendTemplate.git
cd FrontendTemplate
npm i
gulp
```

Test site will be published in `build` folder and running in test web server in live reload mode (any changes in `src` folder result in site rebuild in `build` folder and auto refresh in browser).

Folder `src` contains site source code.

All necessary libraries (bootstrap, jquery) are loaded into the `node_modules` folder.

Gulp task `gulpfile.js` taken from [itchief repository](https://github.com/itchief/gulp-project-bootstrap-4).
