/* global data */
/* exported data */

var $photo = document.querySelector('#photo');
var $image = document.querySelector('img');
var $submit = document.querySelector('.new-entry-button');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');

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
