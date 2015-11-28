/* global angular _ saveAs JSZip */
/* eslint no-use-before-define: [2, "nofunc"] */
(function () {
	'use strict';

	angular.module('jsLocalize').controller('AppCtrl', ['$rootScope', function ($rootScope) {
		var that = this;

		this.files = {}; // keep track of the names and the original object
		this.keys = []; // just all they keys
		this.downloadFiles = downloadFiles;
		this.downloadFile = downloadFile;
		this.addFiles = addFiles;
		this.loadSampleData = loadSampleData;

		//////

		function loadSampleData() {
			that.keys = ['key1', 'key2'];
			that.files = {
				'en.json': {
					'key1': 'Some text',
					'key2': 'Another text'
				},
				'de.json': {
					'key1': 'Ein Text'
				},
				'fr.json': {
					'key1': 'Un texte'
				}
			};
		}

		function downloadFiles() {
			var zip = new JSZip();
			_.forOwn(this.files, function (object, filename) {
				zip.file(filename, JSON.stringify(object, null, '\t'));
			});

			var blob = zip.generate({ type: 'blob' });
			saveAs(blob, 'jsLocalize.zip');
		}
		
		function downloadFile(filename, object) {
			var content, blob;
			content = JSON.stringify(object, null, '\t');
			blob = new Blob([content], {type: "text/plain;charset=utf-8"});
			saveAs(blob, filename);			
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

					$rootScope.$apply();
				};
				reader.readAsText(file);

			});
		}

	}]);
})();
