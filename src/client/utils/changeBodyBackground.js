require('../styles/images/lights.jpg');
require('../styles/images/lights_md.jpg');
require('../styles/images/lights_sm.jpg');
require('../styles/images/lights_xs.jpg');
require('../styles/images/red_gig.jpg');
require('../styles/images/red_gig_md.jpg');
require('../styles/images/red_gig_sm.jpg');
require('../styles/images/red_gig_xs.jpg');
require('../styles/images/town.jpg');
require('../styles/images/town_md.jpg');
require('../styles/images/town_sm.jpg');
require('../styles/images/town_xs.jpg');
require('../styles/images/stardust.png');

// This function returns a url to a background image, based
// on the current-path and the window width.

function changeBodyBackground(currentPath, callback) {
	var imageUrl;
	
	// select image filename based on path
	if (currentPath === '/') {
		imageUrl = 'red_gig';
	} else if (currentPath === '/register') {
		imageUrl = 'town';
	} else if (currentPath === '/login') {
		imageUrl = 'lights';
	} else {
		imageUrl = '/stardust.png';
	}
	
	// complete image filename based on window size 
	if (/venues/.test(currentPath) === false) {
		var innerWidth = window.innerWidth;
		if (innerWidth > 1199) {
			imageUrl = imageUrl + '.jpg';
		} else if (innerWidth < 1200 && innerWidth > 991) {
			imageUrl = imageUrl + '_md.jpg';
		} else if (innerWidth < 992 && innerWidth > 767) {
			imageUrl = imageUrl + '_sm.jpg';
		} else if (innerWidth < 768) {
			imageUrl = imageUrl + '_xs.jpg';
		}
	}
	
	imageUrl = 'url(' + imageUrl + ')';
	return callback(imageUrl);		
}

module.exports = changeBodyBackground;