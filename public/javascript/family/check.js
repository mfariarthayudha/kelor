async function getFamilyDesc(no_kk, id_list) {
  const data = await fetchData(`/api/families/${no_kk}/address`);
  setList(id_list, data, false);
}

document.getElementById("btn-edit-noKK").addEventListener("click", (event) => {
  // document.getElementById("no_kk").value = no_kk;
  if (window.location.search) {
    var myNewURL = "/residents/create"; //the new URL
    window.history.pushState({}, document.title, baseUrl + myNewURL);
  }
  showSuccess("Data digunakan");
  document.getElementById("form-warga").hidden = false;
});

document.getElementById("no_kk").addEventListener(
  "input",
  debounce((event) => {
    if (event.target.value != "") {
      getFamilyDesc(
        event.target.value,
        "noKKList" // value nik // idlist
      );
    }
  }, 700)
); // Adjust the delay as needed (300ms in this case)
