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
  if ($storedEntries !== null) {
    data = JSON.parse($storedEntries);
  }
});
