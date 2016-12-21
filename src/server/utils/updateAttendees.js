// This function updates a venue document with a change to
// the attendee array. If the document doesn't already exist,
// it will be inserted into the venues collection. Venue
// documents have a limited lifespan, and expire at 5am daily.

function updateAttendees(req, callback) {
	var venueId = req.query.venueId;
	var clientId = req.session.userId;
	var clientAttending = req.query.clientAttending; // string representation of boolean value

	var updateDoc; // object used by updateOne (below)
	if (clientAttending === 'true') {
		// remove client from attendees array in database
		updateDoc = {
			$pull: { attendees: clientId }
		};
	} else {
		// add client to attendees array in database
		updateDoc = {
			$push: { attendees: clientId }
		};
	}

	var currentDate = new Date();
	currentDate.setHours(5, 0, 0, 0);	// set to 5am, so that all documents are removed daily at 5am	
	
	// set expiry time for document
	updateDoc.$setOnInsert = {
		insertionTime: currentDate
	};

	req.db.collection('venues')
	.updateOne(
		{ venue: venueId },
		updateDoc,
		{ upsert: true },
		function(err, result) {
			if (err) {
				console.log(err);
			}
			return callback();			
		}
	);	
}

module.exports = updateAttendees;