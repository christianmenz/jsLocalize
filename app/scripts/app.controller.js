(function () {
	
	angular.module('jsLocalize').controller('AppCtrl', [function ($rootScope) {
		var that = this;

		this.files = {}; // keep track of the names and the original object
		this.keys = []; // just all they keys
		this.downloadFiles = downloadFiles;
		this.addFiles = addFiles;
		this.loadSampleData = loadSampleData;
   
		//////
		
		function loadSampleData() {
			that.keys = ['key1', 'key2'];
			that.files = {
				'en.json': {
					'key1' : 'Some text',
					'key2' : 'Another text'					
				},
				'de.json': {
					'key1' : 'Ein Text',
				},
				'fr.json': {
					'key1' : 'Un texte',
				}
			}
		}
  
		function downloadFiles() {
			var zip = new JSZip();
			_.forOwn(this.files, function (object, fileName) {
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
						that.keys = _.union(that.keys, _.keys(object));
						that.files[file.name] = object;
					} catch (error) {
						console.log('No hablo JSON');
					}
				
					// maybe we should trigger some digest here. Dunno why it seems to work on Chrome
				};
				reader.readAsText(file);

			});
		}

	}]);
})();