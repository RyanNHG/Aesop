module.exports = ['ApiService', 'UserService', 'NormalizerService', function(ApiService, UserService, NormalizerService){
	
	var srvc = this;

	const EMOTION_ENDPOINT = 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion';
	const API_KEY = '8be7ddf98d4d46c5658289999fe120f97d233209';

	srvc.data = {};

	srvc.getFable = function() {

		srvc.data.fable = null;

		return ApiService.get('fable', {
			user: UserService.data.user
		}).then(function(res){
			srvc.data.fable = res.data;
			return res;
		});
	};

	srvc.getAllFables = function() {

		srvc.data.fables = srvc.getFablesFromCache();

		if(srvc.data.fables != null && srvc.data.fables.length > 0)
		{
			return new Promise(function(resolve, reject){
				resolve(srvc.data.fables);
			});
		}
		else
		{
			srvc.data.fables = [];

			return ApiService.get('fables', {}).then(function(res){
				srvc.data.fables = res.data;
				srvc.cacheFables();
				return res;
			})
		}

	};

	srvc.getEmotionData = function(fable) {

		return ApiService.absoluteGet(EMOTION_ENDPOINT, {
			apikey: API_KEY,
			text: fable.body,
			outputMode: 'json'
		}).then(function(res){

			var emotionData = res.data.docEmotions;
			
			srvc.updateEmotionData(fable, emotionData);

			return res;

		});

	};

	srvc.updateEmotionData = function(fable, emotionData){

		fable.emotionData = emotionData;

		ApiService.put('fable', {
			fable: fable
		}).then(function(res){
			console.log('Updated: ', res)
		})

	};

	srvc.setNormalizedEmotionData = function(fable){

		fable.normalizedEmotionData = NormalizerService.normalize(fable.emotionData);

		return ApiService.put('fable', {
			fable: fable
		}).then(function(res){
			console.log('Normalized: ', res)
			return res;
		})

	};

	srvc.cacheFables = function() {
		localStorage.setItem('fables', JSON.stringify(srvc.data.fables));
	}

	srvc.getFablesFromCache = function() {
		return JSON.parse(localStorage.getItem('fables'));
	}


}];