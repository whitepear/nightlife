// This function returns a string representation of the window width
// (Large, Medium, Small, Extra-Small)

function getDeviceWidth() {
	var innerWidth = window.innerWidth;
	if (innerWidth > 1199) {
		return 'Large';
	} else if (innerWidth < 1200 && innerWidth > 991) {
		return 'Medium';
	} else if (innerWidth < 992 && innerWidth > 767) {
		return 'Small';
	} else if (innerWidth < 768) {
		return 'Extra-Small';
	}
}

module.exports = getDeviceWidth;