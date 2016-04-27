module.exports = ['FableService', 'UserService', function(FableService, UserService){

    var ctrl = this;
    ctrl.fableData = FableService.data;

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
    	FableService.getFable();
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
