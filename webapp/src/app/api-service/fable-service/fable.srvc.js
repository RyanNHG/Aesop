module.exports = ['ApiService', 'UserService', function(ApiService, UserService){
	
	var srvc = this;

	srvc.data = {
		fable: {
			"title": "The Farmer and the Cranes",
		    "moral": "If words suffice not, blows must follow",
		    "body": "\n  \r\n  The Farmer and the Cranes \r\n\r\n\r\n  SOME CRANES made their feeding grounds on some plowlands newly\r\nsown with wheat.  For a long time the Farmer, brandishing an\r\nempty sling, chased them away by the terror he inspired; but when\r\nthe birds found that the sling was only swung in the air, they\r\nceased to take any notice of it and would not move.  The Farmer,\r\non seeing this, charged his sling with stones, and killed a great\r\nnumber.  The remaining birds at once forsook his fields, crying\r\nto each other, \"It is time for us to be off to Liliput:  for this\r\nman is no longer content to scare us, but begins to show us in\r\nearnest what he can do.\"  \r\n\r\n\t\r\n\tIf words suffice not, blows must follow.  \r\n"
		}
	};


	srvc.getFable = function() {
		return ApiService.get('fable', {
			user: UserService.data.user
		});
	}

}];