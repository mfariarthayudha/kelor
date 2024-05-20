function changeInputForm(id_form, status) {
  var form = document.getElementById(id_form);
  var elements = form.elements;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.tagName === "SELECT" || element.tagName === "INPUT") {
      element.disabled = status;
      element.readOnly = status;
    }
  }
}
function removeInputForm(id_form) {
  var form = document.getElementById(id_form);
  var elements = form.elements;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.tagName === "SELECT" || element.tagName === "INPUT") {
      element.value = "";
    }
  }
}
function checkNik(nik) {
  axios({
    url: `${baseUrl}/api/residents/${nik}`,
    method: "get",
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      // if dom true , fill response

      document.getElementById("nama")
        ? (document.getElementById("nama").value = response.data.nama)
        : "";

      document.getElementById("tempat_lahir")
        ? (document.getElementById("tempat_lahir").value =
            response.data.tempat_lahir)
        : "";

      document.getElementById("tanggal_lahir")
        ? (document.getElementById("tanggal_lahir").value =
            response.data.tanggal_lahir)
        : "";

      if (document.getElementById("jenis_kelamin")) {
        const jenis_kelamin = document.getElementById("jenis_kelamin");
        let options = jenis_kelamin.getElementsByTagName("option");
        for (var i = 0; i < options.length; i++) {
          if (options[i].value !== response.data.jenis_kelamin) {
            options[i].style.display = "none";
          }
        }
        jenis_kelamin.value = response.data.jenis_kelamin;
      }
      document.getElementById("pekerjaan")
        ? (document.getElementById("pekerjaan").value = response.data.pekerjaan)
        : "";

      if (document.getElementById("agama")) {
        const agama = document.getElementById("agama");
        let options = agama.getElementsByTagName("option");

        for (var i = 0; i < options.length; i++) {
          if (options[i].value !== response.data.agama) {
            options[i].style.display = "none";
          }
        }
        agama.value = response.data.agama;
      }

      if (document.getElementById("kewarganegaraan")) {
        const kewarganegaraan = document.getElementById("kewarganegaraan");
        let options = kewarganegaraan.getElementsByTagName("option");

        for (var i = 0; i < options.length; i++) {
          if (options[i].value !== response.data.kewarganegaraan) {
            options[i].style.display = "none";
          }
        }
        kewarganegaraan.value = response.data.kewarganegaraan;
      }

      document.getElementById("alamat")
        ? (document.getElementById("alamat").value = response.data.alamat)
        : "";

      document.getElementById("status_pernikahan")
        ? (document.getElementById("status_pernikahan").value =
            response.data.status_pernikahan)
        : "";

      document.querySelector('[role="group"]')
        ? changeStatus(response.data.status_pernikahan)
        : "";

      document.getElementById("status_keluarga")
        ? (document.getElementById("status_keluarga").value =
            response.data.status_keluarga)
        : "";
      document.getElementById("golongan_darah")
        ? (document.getElementById("golongan_darah").value =
            response.data.golongan_darah)
        : "";
    })
    .catch((error) => {
      let resError = "";
      for (const key in error.response.data.errorMessages) {
        if (error.response.data.errorMessages.hasOwnProperty(key)) {
          resError += error.response.data.errorMessages[key] + "<br />";
        }
      }

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: resError,
        showConfirmButton: true,
      });
    });
}
document.getElementById("nik").addEventListener(
  "input",
  debounce((event) => {
    if (document.getElementById("warga_cipayung").checked) {
      if (event.target.value != "") {
        getResidentName(
          event.target.value, // value nik
          "nikList" // idlist
        );
      }
    }
  }, 300)
); // Adjust the delay as needed (300ms in this case)

// Add change event listener
document.getElementById("nik").addEventListener("change", (event) => {
  checkNik(event.target.value); // value nik
  event.target.blur();
});
