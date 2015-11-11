
angular.module('jsLocalize', []);


angular.module('jsLocalize', ['ngFileUpload']).controller('AppCtrl', [function (NgTableParams) {
  var that = this;

  this.files = {}; // keep track of the names and the original object
  this.keys = []; // just all they keys
  this.downloadFiles = downloadFiles;
  this.addFiles = addFiles;
   
  //////
  
  function downloadFiles() {
    var zip = new JSZip();
    _.forOwn(this.files, function(object, fileName) {      
      zip.file(fileName, JSON.stringify(object, null, '\t'));
    })
        
    var content = zip.generate({ type: "blob" });    
    saveAs(content, "jsLocalize.zip");
  }

  function addFiles($files) {
    _.each($files, function (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var fileContent, object;

        fileContent = e.target.result;
        try {
          object = JSON.parse(fileContent);
          that.keys = _.union(that.keys,_.keys(object)); 
          that.files[file.name] = object;
        } catch (error) {
          console.log('No hablo JSON');
        }
      };
      reader.readAsText(file);

    });
  }

}]);