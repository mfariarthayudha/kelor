function clearOptions(selectElement, excludeText) {
  selectElement.querySelectorAll("option").forEach((option) => {
    if (option.text !== excludeText) {
      option.remove();
    }
  });
}

function updateSelectElement(
  endpoint,
  selectElementId,
  optionValueField,
  optionTextField,
  optionId = false
) {
  fetchData(endpoint).then((data) => {
    console.log(data);
    const selectElement = document.getElementById(selectElementId);
    clearOptions(selectElement, "Pilih");

    data.forEach((item) => {
      const newOption = document.createElement("option");
      newOption.value = item[optionValueField];
      newOption.text = item[optionTextField];
      if (item[optionValueField] === optionId) {
        newOption.selected = true;
      }
      selectElement.appendChild(newOption);
    });
  });
}
