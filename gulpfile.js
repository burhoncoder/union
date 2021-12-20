const { src, dest, parallel, series, watch } = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileInclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify-es").default;

let project_folder = "dist";
let source_folder = "src";

const path = {
  build: {
    html: `${project_folder}/`,
    css: `${project_folder}/styles/`,
    js: `${project_folder}/js`,
    fonts: `${project_folder}/fonts`,
    img: `${project_folder}/images/`,
  },
  src: {
    html: `${source_folder}/*.html`,
    css: `${source_folder}/scss/*.scss`,
    js: `${source_folder}/js/script.js`,
    img: `${source_folder}/images/**/*.{jpg,png,svg}`,
    fonts: `${source_folder}/fonts/**/*`,
  },
  watch: {
    html: `${source_folder}/**/*.html`,
    css: `${source_folder}/**/*.scss`,
    js: `${source_folder}/js/**/*.js`,
    img: `${source_folder}/images/**/*.{jpg, png, svg, jpeg}`,
    fonts: `${source_folder}/fonts/**/*`,
  },
  clean: `./${project_folder}/`,
};

function browserSync() {
  browsersync.init({
    server: {
      baseDir: `./${project_folder}/`,
      port: 6000,
    },
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: "extended" }))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 100 versions"] }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileInclude())
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 4,
        svgoPlugins: [{ removeViewBox: false }],
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  watch([path.watch.html], html);
  watch([path.watch.css], css);
  watch([path.watch.js], js);
  watch([path.watch.img], images);
  watch([path.watch.fonts], fonts);
}

let build = series(clean, parallel(css, html, js, images, fonts));
let watcher = parallel(build, watchFiles, browserSync);

exports.default = watcher;
exports.build = build;
