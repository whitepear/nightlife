// This function retrieves attendee counts for each venue,
// and also checks if the client is attending each venue.
// This info is then added to each venue object within the array 
// of objects initially returned by the Yelp API.

var axios = require('axios');

function getAttendees(yelpRes, callback) {
	var venues = yelpRes.data.businesses;
	var venueIds = venues.map(function(venue) {
		return venue.id;
	});

	axios.post('/getAttendees', venueIds)
	.then(function(attendeeInfo) {
		if (attendeeInfo.data.length > 0) {
			// if attendee info was found, add the attendance info
			// to the yelp api response data
			venues.forEach(function(venue) {
				attendeeInfo.data.forEach(function(venueAttendees) {
					if (venue.id === venueAttendees.venueId) {
						venue.attendeeCount = venueAttendees.attendeeCount;
						venue.clientAttending = venueAttendees.clientAttending;
					}
				});
			});
		}
		callback(venues);					
	});
}

module.exports = getAttendees;