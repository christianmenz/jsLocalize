
angular.module('jsLocalize', []);


angular.module('jsLocalize', ['ngFileUpload']).controller('AppCtrl', [function (NgTableParams) {
  var that = this;

  this.dataSet = {};
  this.downloadFiles = downloadFiles;
  this.addFiles = addFiles;
   
  //////
  
  function downloadFiles() {

  }

  function addFiles($files) {
    _.each($files, function (file) {

      var reader = new FileReader();
      reader.onload = function (e) {
        var fileContent, object, keys;

        fileContent = e.target.result;
        try {
          object = JSON.parse(fileContent);
          keys = _.keys(object);
          _.each(keys, function (key) {
            if (!that.dataSet[key]) {
              that.dataSet[key] = {};
            }
            that.dataSet[key][file.name] = object[key];
          })
        } catch (error) {
          console.log('No hablo JSON');
        }
      };
      reader.readAsText(file);

    });
  }

}]);