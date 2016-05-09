module.exports = ['FableService', function(FableService){

    var ctrl = this;

    ctrl.fableData = FableService.data;

    ctrl.onInit = function(){
    	FableService.getAllFables();
    };

    // Used to initially populate emotion data.
    ctrl.getFableEmotionData = function(res){

    	var index = 1;
    	var fables = res.data;

    	FableService.getEmotionData(res.data[index]).then(function(){
    		ctrl.getEmotionDataHelper(fables, index);
    	})
    }

    ctrl.getEmotionDataHelper = function(fables, index) {

		index++;

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
    				ctrl.getEmotionDataHelper(fables, index);
    			})

			}
			else {
				console.log('Fable ' + index + ' has emotionData');

				ctrl.getEmotionDataHelper(fables, index);
			}

		}

    }

    ctrl.openDetailModal = function(fable) {
    	// NormalizerService.normalize(fable.emotionData);
    }

}];
