module.exports = ['UserService', function(UserService){

    var ctrl = this;
    
    ctrl.userData = UserService.data;

    ctrl.SIGN_IN_FORM = 0;
    ctrl.SIGN_UP_FORM = 1;

    ctrl.error = null;

    ctrl.submit = function(email, password){

    	if(ctrl.isSignedIn())
        {
            UserService.signOut();
            return;
        }
        
        var promise;

        if(ctrl.formIndex == ctrl.SIGN_IN_FORM)
    		promise = UserService.signIn(email, password);
    	else
    		promise = UserService.signUp(email, password);

        ctrl.signingIn = true;
        ctrl.error = null;

        // Handle response from server
        promise.then(function(res){

            ctrl.signingIn = false;

            if(ctrl.onSignIn)
                ctrl.onSignIn();

        }, function(res) {

            ctrl.signingIn = false;

            ctrl.error = res.data;

        })

    };

    ctrl.isSignedIn = function(){
        return ctrl.userData.user != null;
    }

    ctrl.swapForms = function(){
    	ctrl.formIndex = (ctrl.formIndex + 1) % 2;
    }

    ctrl.headerTexts = ['In','Up'];
    ctrl.buttonTexts = ['need', 'have'];

    ctrl.headerText = function(){
        if(ctrl.isSignedIn()) return 'Out';
        else return ctrl.headerTexts[ctrl.formIndex];
    }
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
