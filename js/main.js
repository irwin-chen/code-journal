/* global data */
/* exported data */

var $photo = document.querySelector('#photo');
var $image = document.querySelector('img');
var $submit = document.querySelector('.new-entry-button');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');
var $list = document.querySelector('.list');

$photo.addEventListener('input', function (event) {
  $image.src = $photo.value;
  if ($photo.value === '') {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});

$submit.addEventListener('click', function (event) {
  event.preventDefault();
  var dataEntry = {
    title: $title.value,
    photo: $photo.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(dataEntry);

  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    var entryBranch = renderEntry(data.entries[dataIndex]);
    $list.append(entryBranch);
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

  $divRow.append($newImage, $textContainer);

  var $textTitle = document.createElement('h2');
  $textTitle.className = 'no-margin padding-ten';
  $textTitle.textContent = dataEntry.title;

  var $textNotes = document.createElement('p');
  $textNotes.className = 'no-margin notes-text';
  $textNotes.textContent = dataEntry.notes;

  $textContainer.append($textTitle, $textNotes);
  return $listItem;
}
