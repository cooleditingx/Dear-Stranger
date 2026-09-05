const fileInput = document.getElementById('image');
const dropLabel = document.querySelector('.labelFile');
const dropInfo = dropLabel.querySelector('.info');
const defaultInfoText = dropInfo.textContent;

function updateInfoText() {
  if (fileInput.files.length) {
    dropInfo.textContent = fileInput.files[0].name;
  } else {
    dropInfo.textContent = defaultInfoText;
  }
}

['dragenter', 'dragover'].forEach((eventName) => {
  dropLabel.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropLabel.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropLabel.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropLabel.classList.remove('dragover');
  });
});

dropLabel.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;
  if (files.length) {
    fileInput.files = files;
    updateInfoText();
  }
});

fileInput.addEventListener('change', updateInfoText);
