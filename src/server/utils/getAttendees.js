// This function retrieves attendee counts for each venue,
// and also checks if the client is attending each venue.
// This info is then added to the Yelp API data, which
// the function ultimately returns.

function getAttendees(req, callback) {
	var venues = req.body.data.businesses;
	var venueIds = venues.map(function(venue) {
		return venue.id;
	});

	if (req.session && req.session.userId) {
		var clientUserId = req.session.userId;
	} else {
		clientUserId = null;
	}	

	req.db.collection('venues')
	.find( { venue: { $in: venueIds } } )
	.toArray(function(err, docs) {
		if (err) {
			console.log('Error during getAttendees toArray: ', err);
			throw err;
		}
		
		if (docs.length > 0) {		
			// if attendee info was found, add the info
			// to the yelp api response data

			// generate array of attendee info objects, derived from the
			// database response documents
			var attendeeInfo = docs.map(function(doc) {
				
				var clientAttending;				
				if (!clientUserId || doc.attendees.indexOf(clientUserId) === -1) {
					clientAttending = false;
				} else {
					clientAttending = true;
				}

				return {
					venueId: doc.venue,
					attendeeCount: doc.attendees.length,
					clientAttending: clientAttending
				};
			});

			// integrate attendee info with respective venues
			venues.forEach(function(venue) {
				attendeeInfo.forEach(function(venueAttendees) {
					if (venue.id === venueAttendees.venueId) {
						venue.attendeeCount = venueAttendees.attendeeCount;
						venue.clientAttending = venueAttendees.clientAttending;
					}
				});
			});
		}

		return callback(venues);
	});
}

module.exports = getAttendees;