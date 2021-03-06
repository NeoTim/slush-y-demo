;(function(){
'use strict';

  angular
    .module('core')
    .controller('HomeCtrl', HomeCtrl);

  /* @inject */
  function HomeCtrl(Resolved, $scope, Thing, socket, logger) {

    var vm = this;
    vm.shown = {};
    vm.awesomeThings = Resolved;
    vm.addThing = addThing;
    // vm.deleteThing = deleteThing;
    vm.showThing = showThing;
    vm.createNewThing = createNewThing;
    vm.updateThing = updateThing;

    vm.Thing = Thing;

    socket.syncUpdates('things', vm.awesomeThings);

    ////////////////////

    function addThing() {
      if(vm.newThing === '') {
        return;
      }
      Thing.create( {name: vm.newThing} );
      vm.newThing = '';
      vm.showDetail = false;
      vm.creating = false;
      vm.shown = {};
    }

    // function deleteThing(thing) {
    //   // console.log(thing)
    //   Thing.destroy(thing._id);
    //   vm.showDetail = false;
    //   vm.editing = false;
    // }

    function updateThing(thing){
      Thing
        .update(thing._id, thing)
        .then( function (data) {
          vm.editing = false
        });
    }

    function showThing(thing){

        if(thing._id === vm.shown._id){
          vm.showDetail = false;
          vm.shown = {};
        } else {
          vm.showDetail = true;
          vm.shown = thing;
        }
    }

    function createNewThing(){
      vm.showDetail = true;
      vm.shown = {};
      vm.creating = true;
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('things');
    });
  }
}).call(this);
