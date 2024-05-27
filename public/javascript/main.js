const baseUrl = "http://localhost:3100";

function capitalize(text) {
  return text.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

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

async function getResidentName(nik, id_list) {
  const data = await fetchData(`/api/residents/${nik}/name`);
  setList(id_list, data);
}
