'use strict';

const form = document.querySelector('.ajax-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('file', form.elements.file.files[0]);
  const _csrf = form.elements._csrf.value;

  // fetch(`/upload?_csrf=${_csrf}`, {
  //   method: 'POST',
  //   body: formData,
  // });
  window.axios(`/ajax?_csrf=${_csrf}`, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
});

const multiForm = document.querySelector('.ajax-multiple');
multiForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData();
  for (const file of multiForm.elements.file.files) {
    formData.append(file.name, file);
  }
  const _csrf = multiForm.elements._csrf.value;

  // fetch(`/upload?_csrf=${_csrf}`, {
  //   method: 'POST',
  //   body: formData,
  // });
  window.axios(`/multiple?_csrf=${_csrf}`, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
});
