module.exports = ['UserService', function(UserService){

    var ctrl = this;
    var userData = UserService.data;

    ctrl.SIGN_IN_FORM = 0;
    ctrl.SIGN_UP_FORM = 1;

    ctrl.submit = function(email, password){

        var promise;

    	if(ctrl.formIndex == ctrl.SIGN_IN_FORM)
    		promise = UserService.signIn(email, password);
    	else
    		promise = UserService.signUp(email, password);

        ctrl.signingIn = true;

        promise.then(function(res){
            console.log('Promise returned!');

            ctrl.signingIn = false;

            if(ctrl.onSignIn)
                ctrl.onSignIn();
        })

    };

    ctrl.isSigningIn = function(){
        return ctrl.signingIn;
    }

    ctrl.swapForms = function(){
    	ctrl.formIndex = (ctrl.formIndex + 1) % 2;
    }

    ctrl.headerTexts = ['In','Up'];
    ctrl.buttonTexts = ['need', 'have'];

    ctrl.headerText = function(){return ctrl.headerTexts[ctrl.formIndex];}
    ctrl.buttonText = function(){return ctrl.buttonTexts[ctrl.formIndex];}

    ctrl.init = function(){

        if(ctrl.only) {
            ctrl.formIndex = ctrl[ctrl.only];
        }
        else if(ctrl.initial) {
            ctrl.formIndex = ctrl[ctrl.initial];
        }
    	else {
    		ctrl.formIndex = ctrl.SIGN_IN_FORM;
    	}
    }

}];
