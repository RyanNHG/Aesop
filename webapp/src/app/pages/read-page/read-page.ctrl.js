module.exports = ['FableService', 'UserService', 'NormalizerService', 
function(FableService, UserService, NormalizerService){

    var ctrl = this;
    ctrl.fableData = FableService.data;
    ctrl.userData = UserService.data;

    ctrl.sendingFeedback = false;

    ctrl.feedbackButtons = [
    	{
    		label: 'Bad',
    		value: false,
    		icon: 'thumb_down',
    		btnClass: 'is-danger'
    	},
    	{
    		label: 'Good',
    		value: true,
    		icon: 'thumb_up',
    		btnClass: 'is-success'
    	}
    ];

    ctrl.onInit = function(){
    	ctrl.getNewFable();
    }

    ctrl.getNewFable = function(){
    	FableService.getAllFables().then(function(fables){
            // Get list of fable ids
            var readFableIds = UserService.getReadFableIds();

            // Get raw and normalized preferences
            var rawPreferences = UserService.getEmotionalPreferences(fables);
            var normalizedPreferences = NormalizerService.normalize(rawPreferences);

            console.log(readFableIds);
            console.log(rawPreferences, normalizedPreferences);

            // Based on previously read fables and normalized preferences, find best fable to recommend
            //FableService.getRecommendedFable();
        });
    };

    ctrl.onFeedbackClick = function(button) {
    	var isLike = (button.value);
    	var fableId = ctrl.fableData.fable['_id'];

    	// Disable UI
    	ctrl.sendingFeedback = true;
    	button.isLoading = true;

    	// Update user model with feedback
    	UserService.addFeedback(fableId, isLike).then(function(){

    		ctrl.sendingFeedback = false;
    		button.isLoading = false;

    		ctrl.getNewFable();

    	},function(res){

    		console.log(res.data);

    	});

    };

}];
