module.exports = [function(){
	
	var srvc = this;

	srvc.normalize = function(emotionData){

		var minMaxed = {};
		var normalized = {};

		// Arbitrarily set min and max to first value
		var max = emotionData['anger'];
		var min = max;

		// Find min and max in data set
		for(var emotion in emotionData)
		{
			var value = emotionData[emotion];

			if(value > max)
				max = value;

			if(value < min)
				min = value;
		}

		// Perform MinMax Normalization for each emotion
		// newVal = (val - min)/(max - min)
		var minMaxSum = 0;

		for(var emotion in emotionData)
		{
			minMaxed[emotion] = (emotionData[emotion] - min) / (max - min);
			minMaxSum += minMaxed[emotion];
		}

		// Normalize (make all sum up to 1)
		for(var emotion in emotionData)
		{
			normalized[emotion] = (minMaxed[emotion])/minMaxSum;
		}

		return normalized;

	};

	srvc.getDistance = function(userData, fableData) {

		var distance = 0;

		for(var emotion in userData)
		{
			var userVal = userData[emotion];
			var fableVal = fableData[emotion];

			distance += (userVal - fableVal) * (userVal - fableVal);
		}

		return distance;

	}


}];