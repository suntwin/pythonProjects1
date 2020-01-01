$(document).ready(function(e) {
	/* countdown */
	$(function(){
		var note = $( '#note' ),
		ts = new Date(2018, 1, 01),
		newYear = true;

		if( ( new Date() ) > ts ) {
			// The new year is here! Count towards something else.
			// Notice the *1000 at the end - time must be in milliseconds
			//ts = (new Date()).getTime() + 6*24*60*60*1000;
			ts = new Date( "Feb 1, 2019 11:00:00" );
			newYear = false;
		}

		if($( '#countdown' ).length) {
			$( '#countdown' ).countdown({
				timestamp	: ts,
				callback	: function(days, hours, minutes, seconds){

					var message = "";

					message += days + " day" + ( days==1 ? '':'s' ) + ", ";
					message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
					message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
					message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";

					if(newYear){
						message += "left until the new year!";
					} else {
						message += "left to 5 days from now!";
					}
					note.html( message );
				}
			});
		}

	});
	/* countdown */
});