const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// Kompilowanie sass'a i 'dolaczenie' do przegladarki
//tworzenie taska gulp.task
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())   //pipe w ktorym to wszystko sie kompiluje
        .pipe(gulp.dest("src/css")) //gdzie te pliki skompilowane maja wyladowac
        .pipe(browserSync.stream()) //uzycie browser-synca        
           
});

//przeniesienie plików JS do src/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js")) //przeniesienie plikow do src/js
        .pipe(browserSync.stream()); //uzycie browser-synca
});

//watch sass & server
gulp.task('serve', ['sass'], function() {
      browserSync.init({         //inicjalizacja browser synca 
          server: './src'           //ktory wymaga obiektu konfiguracji
      });                              //definiowanie serwera : moj src folder  
        
           
      
      gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);//dodanie 'watcha' do serwera aby nieustannie brac pod uwage pliki sass - dzieki temu mozemy kompilowac je gdy damy 'save'
      gulp.watch(['src/*.html']).on('change', browserSync.reload); //dodanie 'watcha' do plikow HTML i za kazdym razem gdy sie zmieni cos to reloadujemy ja
});

//fonts + fontAwesome przeniesienie do src
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

//przeniesienie plikow CSS z fontAwesome
gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});

//podstawowy test GULPA 
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);