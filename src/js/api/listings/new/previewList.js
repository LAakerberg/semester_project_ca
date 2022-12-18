export function previewFunction() {
  // Insert live preview of Title

  const newTitleValue = document.querySelector('#new-title');
  const logTitleValue = document.getElementById('list-title');
  newTitleValue.addEventListener('keyup', updateTitleValue);

  function updateTitleValue(e) {
    logTitleValue.textContent = e.target.value;
  }

  // Insert live preview of Tag

  const newTagValue = document.querySelector('#new-tag');
  const logTagValue = document.getElementById('list-tags');
  newTagValue.addEventListener('keyup', updateTagValue);

  function updateTagValue(e) {
    logTagValue.textContent = e.target.value;
  }

  // Insert live preview of image URL

  var input = document.querySelector('#new-url');
  var imageNew = document.querySelector('#list-images');

  input.addEventListener('change', function () {
    var imageUrl = document.querySelector('#new-url').value;
    var img = document.createElement('img');

    img.src = imageUrl;
    imageNew.prepend(img);
  });

  // Insert live preview of description

  const newDescValue = document.querySelector('#new-description');
  const logDescValue = document.getElementById('list-description');
  newDescValue.addEventListener('keyup', updateDescValue);

  function updateDescValue(d) {
    logDescValue.textContent = d.target.value;
  }
}
