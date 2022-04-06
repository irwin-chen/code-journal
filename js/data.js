/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('local-storage', dataJSON);
});

window.addEventListener('DOMContentLoaded', function (event) {
  var $storedEntries = localStorage.getItem('local-storage');
  var $parsedJSON = JSON.parse($storedEntries);

  Object.assign(data, $parsedJSON);
});
