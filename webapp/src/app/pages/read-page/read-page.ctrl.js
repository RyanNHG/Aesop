module.exports = ['$scope', 'FableService', 'UserService', 'NormalizerService', 
function($scope, FableService, UserService, NormalizerService){

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

            // Based on previously read fables and normalized preferences, find best fable to recommend
            FableService.getRecommendedFable(readFableIds, normalizedPreferences);

            // Because the fable wont refresh... Gosh darnit
            $scope.$apply();
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
