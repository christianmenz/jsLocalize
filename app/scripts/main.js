
angular.module('jsLocalize', []);


angular.module('jsLocalize', ['ngFileUpload']).controller('AppCtrl', [function() {
  
  this.files = [];
  this.keys = [];
  this.downloadFiles = downloadFiles;
  this.addFiles = addFiles;
  
  //////
  
  function downloadFiles() {
    
  }
  
  function addFiles($files) {
    var reader = new FileReader();
    reader.onload = function(e) {
      console.log('Read the file', e.target.result);
    }    
    this.files.push($files);
    
    _.each($files, function(file) {
      reader.readAsText(file);
    });    
  }
    
}]);