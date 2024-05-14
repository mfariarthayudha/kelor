if (document.getElementById("nik")) {
  const nik = document.getElementById("nik");
}

if (document.getElementById("nama")) {
  const nama = document.getElementById("nama");
}

if (document.getElementById("tempat_lahir")) {
  const tempat_lahir = document.getElementById("tempat_lahir");
}

if (document.getElementById("tanggal_lahir")) {
  const tanggal_lahir = document.getElementById("tanggal_lahir");
}

if (document.getElementById("jenis_kelamin")) {
  const jenis_kelamin = document.getElementById("jenis_kelamin");
}
if (document.getElementById("pekerjaan")) {
  const pekerjaan = document.getElementById("pekerjaan");
}

if (document.getElementById("agama")) {
  const agama = document.getElementById("agama");
}
if (document.getElementById("kewarganegaraan")) {
  const kewarganegaraan = document.getElementById("kewarganegaraan");
}

if (document.getElementById("alamat")) {
  const alamat = document.getElementById("alamat");
}

if (document.getElementById("dusun")) {
  const dusun = document.getElementById("dusun");
}

if (document.getElementById("rt")) {
  const rt = document.getElementById("rt");
}

if (document.getElementById("rw")) {
  const rw = document.getElementById("rw");
}

if (document.getElementById("status_keluarga")) {
  const status_keluarga = document.getElementById("status_keluarga");
}

if (document.getElementById("golongan_darah")) {
  const darah = document.getElementById("golongan_darah");
}

function checkNik() {
  var nik = document.getElementById("nik").value;
  console.log(nik);
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
        console.log(response.data.jenis_kelamin);
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

      // document.getElementById("dusun")
      //   ? (document.getElementById("dusun").value = response.data.dusun)
      //   : "";

      // document.getElementById("rt")
      //   ? (document.getElementById("rt").value = response.data.rt)
      //   : "";

      // document.getElementById("rw")
      //   ? (document.getElementById("rw").value = response.data.rw)
      // : "";

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
