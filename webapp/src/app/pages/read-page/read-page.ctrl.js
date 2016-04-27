module.exports = ['FableService', function(FableService){

    var ctrl = this;
    ctrl.fableData = FableService.data;
    console.log(ctrl.fableData.fable);

}];
