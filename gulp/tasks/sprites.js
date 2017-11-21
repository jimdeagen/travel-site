var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');

var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template:'./gulp/templates/sprite.css'
				}
			}
		}
	}
}


gulp.task('createSprite', function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});


// this changes (via copy) location of auto-generated svg image from 'temp/sprite' folder
// to main 'images' folder
gulp.task('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});


// this designed to copy the generated sprite css from 'createSprite' (config) to the modules folder
// this keeps all module css together.
// edits to sprite css should be done to 'temp/sprite' version, not the generated copy in 'modules'
gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});


// this is designed to automate both 'createSprite' and 'copySprite' tasks as one task
gulp.task('icons', ['createSprite', 'copySpriteGraphic', 'copySpriteCSS']);
