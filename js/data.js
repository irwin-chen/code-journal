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
  var $list = document.querySelector('.list');
  var $storedEntries = localStorage.getItem('local-storage');
  if (JSON.parse($storedEntries).nextEntryId >= 1) {
    data = JSON.parse($storedEntries);
    for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
      var entryTree = renderEntry(data.entries[dataIndex]);
      $list.append(entryTree);
    }
  }
});

function renderEntry(dataEntry) {
  var $listItem = document.createElement('li');
  $listItem.className = 'column-full padding-twenty';

  var $divRow = document.createElement('div');
  $divRow.className = 'row';
  $listItem.appendChild($divRow);

  var $newImage = document.createElement('img');
  $newImage.className = 'image column-half padding-ten';
  $newImage.src = dataEntry.photo;

  var $textContainer = document.createElement('div');
  $textContainer.className = 'column-half';

  $divRow.appendChild($newImage);
  $divRow.appendChild($textContainer);

  var $textTitle = document.createElement('h2');
  $textTitle.className = 'no-margin padding-ten';
  $textTitle.textContent = dataEntry.title;

  var $textNotes = document.createElement('p');
  $textNotes.className = 'no-margin notes-text';
  $textNotes.textContent = dataEntry.notes;

  $textContainer.appendChild($textTitle);
  $textContainer.appendChild($textNotes);
  return $listItem;
}
