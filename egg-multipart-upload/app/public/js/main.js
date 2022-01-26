'use strict';

const form = document.querySelector('.ajax-multipart');
form.addEventListener('submit', e => {
  e.preventDefault();

  const file = form.elements.file.files[0];
  const _csrf = form.elements._csrf.value;
  const chunkList = sliceFile(file);

  const requests = [];
  chunkList.forEach((item, i) => {
    const formData = new FormData();
    formData.append('part', i + 1);
    formData.append('file', item, file.name);
    const promise = window.axios(`/upload?_csrf=${_csrf}`, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    requests.push(promise);
  });

  Promise.all(requests).then(() => {
    window.axios(`/merge?_csrf=${_csrf}`, {
      method: 'POST',
      data: {
        filename: file.name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

});

function sliceFile(file) {
  const chunkList = [];
  const chunkSize = 5 * 1024;
  for (let i = 0; i < file.size; i += chunkSize) {
    const chunk = file.slice(i, i + chunkSize);
    chunkList.push(chunk);
  }
  return chunkList;
}
