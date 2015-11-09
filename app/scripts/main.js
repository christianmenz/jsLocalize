
angular.module('jsLocalize', []);


angular.module('jsLocalize', ['ngFileUpload']).controller('AppCtrl', [function() {
  
  this.files = [];
  this.downloadFiles = downloadFiles;
  this.addFiles = addFiles;
  
  //////
  
  function downloadFiles() {
    
  }
  
  function addFiles() {
    console.log(arguments);
    
  }
    
}]);