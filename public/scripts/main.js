const DELETE_BTN_SEL = '[data-delete-button]';
const DELETE_URL_ATTR = 'data-delete-url';
let $deleteButton = $(DELETE_BTN_SEL);

$deleteButton.on('click', (event) => {
  $.ajax({
    url: $deleteButton.attr(DELETE_URL_ATTR),
    method: 'DELETE'
  })
  .then((message) => {
    console.log('successfully deleted!');
    console.log(message);

    window.location.href = '/blog/new';
  });
});