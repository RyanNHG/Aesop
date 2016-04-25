module.exports = [function(){

    var ctrl = this;

    ctrl.SIGN_IN_FORM = 0;
    ctrl.SIGN_UP_FORM = 1;

    ctrl.submit = function(email, password){

    	if(ctrl.formIndex == ctrl.SIGN_IN_FORM)
    		console.log('Signing in...')
    	else
    		console.log('Signing up...')

        ctrl.showModal = false;
        if(ctrl.onSignIn)
            ctrl.onSignIn();

    };

    ctrl.swapForms = function(){
    	ctrl.formIndex = (ctrl.formIndex + 1) % 2;
    }

    ctrl.formIndex = ctrl.SIGN_IN_FORM;
    ctrl.headerTexts = ['In','Up'];
    ctrl.buttonTexts = ['need', 'have'];

    ctrl.headerText = function(){return ctrl.headerTexts[ctrl.formIndex];}
    ctrl.buttonText = function(){return ctrl.buttonTexts[ctrl.formIndex];}

}];
