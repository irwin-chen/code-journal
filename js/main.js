/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo-url');
var $image = document.querySelector('img');
$photoURL.addEventListener('input', function () {
  $image.src = $photoURL.value;
  if ($photoURL.value === '') {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});
