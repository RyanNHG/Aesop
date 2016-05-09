module.exports = ['FableService', 'NormalizerService', function(FableService, NormalizerService){

    var ctrl = this;

    ctrl.fableData = FableService.data;

    ctrl.onInit = function(){
    	FableService.getAllFables();
    };

    // Used to initially populate emotion data.
    ctrl.checkFableEmotionData = function(res){

    	var fables = res.data;

    	ctrl.getEmotionDataHelper(fables, 0);
    }

    ctrl.getEmotionDataHelper = function(fables, index) {

		// If there are still more fables
		if(index < fables.length) {

			//	Get the next fable
			var fable = fables[index];

			//	If it doesnt have emotion data
			if(fable.emotionData == null)
			{
				console.log('Getting emotion data for fable ' + index);    	

				// Get emotion data for the fable
				FableService.getEmotionData(fable).then(function(){
    				ctrl.getEmotionDataHelper(fables, index + 1);
    			})

			}
			else if(fable.normalizedEmotionData == null){
				console.log('Fable ' + index + ' has emotionData');

				FableService.setNormalizedEmotionData(fable).then(function(){
					ctrl.getEmotionDataHelper(fables, index + 1);
				})
			}
			else {
				console.log('Fable ' + index + ' has both raw and normalized emotion data')
				ctrl.getEmotionDataHelper(fables, index + 1);
			}

		}

    }

    ctrl.openDetailModal = function(fable) {
    	console.log(fable.normalizedEmotionData);
    }

}];
