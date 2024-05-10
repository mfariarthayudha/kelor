const baseUrl = "https://kelor.id";
var res;
function capitalize(text) {
  return text.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

// uppercase only first char
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function validate_date(e) {
  var date = e.value;
  var date_object = new Date(date);
  var today = new Date();

  if (date_object > today) {
    Swal.fire({
      icon: "error",
      title: "Maaf, Masukkan Tanggal Sebelum Hari ini",
      showConfirmButton: true,
    });
    e.value = "";
  }
}

function setName(idNama, data, nik) {
  // search nama in response using nik
  document.getElementById(idNama).focus();
  for (let i = 0; i < data.length; i++) {
    if (data[i].nik === nik) {
      document.getElementById(idNama).value = data[i].nama;
    }
  }
}
function getResidentName(nik, id_list) {
  axios({
    url: `${baseUrl}/api/residents/${nik}/name`,
    method: "get",
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      let datalist = document.getElementById(id_list);
      res = response.data;
      while (datalist.firstChild) {
        datalist.removeChild(datalist.firstChild);
      }
      // Populate the datalist options with data from the API response
      res.forEach((val) => {
        const option = document.createElement("option");
        option.value = val.nik;
        option.text = val.nama;
        datalist.appendChild(option);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}