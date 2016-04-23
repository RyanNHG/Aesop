module.exports = [function(){

    var ctrl = this;

    ctrl.close = function(){
        ctrl.showModal = false;
        if(ctrl.onClose)
            ctrl.onClose();
    };

}];
