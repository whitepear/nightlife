// This function retrieves attendee counts for each venue,
// and also checks if the client is attending each venue.
// This info is then mapped to individual objects within an array which
// the function ultimately returns.

function getAttendees(req, callback) {
	var venueList = req.body;
	if (req.session && req.session.userId) {
		var clientUserId = req.session.userId;
	} else {
		clientUserId = null;
	}	

	req.db.collection('venues')
	.find( { venue: { $in: venueList } } )
	.toArray(function(err, docs) {
		if (err) {
			console.log('Error during getAttendees toArray: ', err);
			throw err;
		}
		
		if (docs.length === 0) {
			return callback(null);
		}

		return callback(docs.map(function(doc) {
			var attendeeCount = doc.attendees.length;
			var clientAttending;
			
			if (!clientUserId || doc.attendees.indexOf(clientUserId) === -1) {
				clientAttending = false;
			} else {
				clientAttending = true;
			}

			return {
				venueId: doc.venue,
				attendeeCount: attendeeCount,
				clientAttending: clientAttending
			};
		}));
	});
}

module.exports = getAttendees;