let status_pernikahan = "Belum kawin";
document.addEventListener("DOMContentLoaded", () => {
  initializeRadioGroup();
});

function initializeRadioGroup() {
  const radioGroup = document.querySelector('[role="group"]');
  const radios = radioGroup.querySelectorAll('[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", (event) =>
      handleRadioChange(event, status_pernikahan)
    );
  });
}

function handleRadioChange(event, status_pernikahan) {
  const selectedRadio = event.target;
  const selectedValue = selectedRadio.value;

  updateVisibility(selectedValue);
  status_pernikahan = selectedValue;
}

function updateVisibility(status) {
  const ceraiElement = document.getElementById("cerai");
  const kawinElement = document.getElementById("kawin");

  switch (status) {
    case "Belum kawin":
      hideElement(ceraiElement);
      hideElement(kawinElement);
      break;
    case "Kawin":
      hideElement(ceraiElement);
      showElement(kawinElement);
      break;
    case "Cerai hidup":
      showElement(ceraiElement);
      hideElement(kawinElement);
      break;
    case "Cerai mati":
      hideElement(ceraiElement);
      hideElement(kawinElement);
      break;
    default:
      break;
  }
}

function hideElement(element) {
  if (element) {
    element.hidden = true;
  }
}

function showElement(element) {
  if (element) {
    element.hidden = false;
  }
}
function getStatusPernikahan() {
  console.log(status_pernikahan);
  return status_pernikahan;
}
