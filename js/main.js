/* global data */
/* exported data */

var $photo = document.querySelector('#photo');
var $imageElement = document.querySelector('img');
var $submit = document.querySelector('.submit-button');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');
var $divContainer = document.querySelector('body');
var $newEntriesView = document.querySelectorAll('.view')[0];
var $entriesListView = document.querySelectorAll('.view')[1];
var $list = document.querySelector('.list');
var $noEntriesText = document.querySelector('.no-entries');
var $targetedListItem = null;
var $deleteButton = document.querySelector('.delete-button');
var $cancelButton = document.querySelector('.cancel-button');
var $overlay = document.querySelector('.modal-background');
var $confirmButton = document.querySelector('.confirm-button');

$photo.addEventListener('input', function (event) {
  $imageElement.src = $photo.value;
  if ($photo.value === '') {
    $imageElement.src = 'images/placeholder-image-square.jpg';
  }
});

$submit.addEventListener('click', function (event) {
  event.preventDefault();
  var dataEntry = {
    title: $title.value,
    photo: $photo.value,
    notes: $notes.value
  };

  if (data.editing !== null) {
    dataEntry.entryId = data.editing.entryId;
    data.entries.splice(dataEntry.entryId - 1, 1, dataEntry);
    $targetedListItem.replaceWith(renderEntry(dataEntry));
    data.editing = null;
  } else {
    dataEntry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.push(dataEntry);
    $list.prepend(renderEntry(dataEntry));
  }
  $imageElement.src = 'images/placeholder-image-square.jpg';
  $form.reset();

  $entriesListView.className = 'view';
  $newEntriesView.className = 'view hidden';

  checkEmptyList();
});

$divContainer.addEventListener('click', viewSwap);
function viewSwap(event) {
  if (event.target.matches('.tab')) {
    if (event.target.matches('a')) {
      $entriesListView.className = 'view';
      $newEntriesView.className = 'view hidden';
      $form.reset();
      $imageElement.src = 'images/placeholder-image-square.jpg';
    } else {
      $entriesListView.className = 'view hidden';
      $newEntriesView.className = 'view';
      document.querySelector('.title-text').textContent = 'New Entry';
    }
  }
}

function renderEntry(dataEntry) {
  var $listItem = document.createElement('li');
  $listItem.setAttribute('entryid', dataEntry.entryId);
  $listItem.className = 'column-full padding-twenty';

  var $divRow = document.createElement('div');
  $divRow.className = 'row';
  $listItem.appendChild($divRow);

  var $newImage = document.createElement('img');
  $newImage.className = 'image column-half padding-twenty';
  $newImage.src = dataEntry.photo;

  var $textContainer = document.createElement('div');
  $textContainer.className = 'column-half';

  $divRow.appendChild($newImage);
  $divRow.appendChild($textContainer);

  var $titleAndIcon = document.createElement('div');
  $titleAndIcon.className = 'row position-relative';

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen fa-lg edit-icon';

  var $textTitle = document.createElement('h2');
  $textTitle.className = 'no-margin padding-ten';
  $textTitle.textContent = dataEntry.title;

  var $textNotes = document.createElement('p');
  $textNotes.className = 'no-margin notes-text';
  $textNotes.textContent = dataEntry.notes;

  $titleAndIcon.appendChild($textTitle);
  $titleAndIcon.appendChild($editIcon);

  $textContainer.appendChild($titleAndIcon);
  $textContainer.appendChild($textNotes);
  return $listItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    var entryTree = renderEntry(data.entries[dataIndex]);
    $list.prepend(entryTree);
  }
  checkEmptyList();
});

function checkEmptyList(event) {
  if (data.entries.length === 0) {
    $noEntriesText.classList.remove('hidden');
  } else {
    $noEntriesText.className = 'no-entries hidden';
  }
}

$list.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    $entriesListView.className = 'view hidden';
    $newEntriesView.className = 'view';
    var currentEntry = event.target.closest('li').getAttribute('entryid');
    currentEntry = Number.parseInt(currentEntry);

    for (var entriesIndex = 0; entriesIndex < data.entries.length; entriesIndex++) {
      if (currentEntry === data.entries[entriesIndex].entryId) {
        $targetedListItem = event.target.closest('li');
        data.editing = data.entries[entriesIndex];
      }
    }
    $title.value = data.editing.title;
    $photo.value = data.editing.photo;
    $notes.value = data.editing.notes;
    $imageElement.src = data.editing.photo;

    document.querySelector('.title-text').textContent = 'Edit Entry';
  }
});

$deleteButton.addEventListener('click', function (event) {
  $overlay.className = 'row align-center modal-background';
});

$cancelButton.addEventListener('click', function (event) {
  $overlay.className = 'row align-center modal-background hidden';
});

$confirmButton.addEventListener('click', function (event) {
  for (var entriesIndex = 0; entriesIndex < data.entries.length; entriesIndex++) {
    if (data.editing.entryId === data.entries[entriesIndex].entryId) {
      data.entries.splice(entriesIndex, 1);
      $targetedListItem.remove();
    }
  }

  $imageElement.src = 'images/placeholder-image-square.jpg';
  $form.reset();

  $entriesListView.className = 'view';
  $newEntriesView.className = 'view hidden';
  $overlay.classList.add('hidden');
  data.editing = null;
});
