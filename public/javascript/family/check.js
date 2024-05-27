function checkNoKK(no_kk, value = "", id_list = false) {
  loadingInit();
  axios({
    url: `${baseUrl}/api/families/check`,
    method: "post",
    headers: { "content-type": "application/json" },
    data: { no_kk: no_kk },
  })
    .then((response) => {
      if (id_list) {
        setList(id_list, response);
      } else {
        dialogBox(response, value);
      }
    })

    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: error.response.data.errorMessages,
        showConfirmButton: true,
      });
      document.getElementById("no_kk").value = value;
    })
    .finally(() => {
      loadingDestroy();
    });
}
function dialogBox(response, value = "") {
  var { nama_dusun, no_rw, no_rt, alamat, no_kk } = response.data;

  Swal.fire({
    icon: "question",
    showDenyButton: true,
    confirmButtonText: "Ya",
    denyButtonText: `Tidak`,
    title: "Apakah data benar ?",
    html:
      "No KK : " +
      no_kk +
      "</br >Dusun : " +
      nama_dusun +
      "</br>Alamat : " +
      alamat +
      " RT " +
      no_rt +
      "/" +
      no_rw,
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("form-warga").hidden = false;
      document.getElementById("no_kk").value = no_kk;
      Swal.fire({
        title: "Data digunakan",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      document.getElementById("btn-check-noKK").hidden = true;
      document.getElementById("no_kk").readOnly = true;
    } else if (result.isDenied) {
      document.getElementById("no_kk").value = value;
      Swal.fire("Silahkan ketik ulang No KK", "", "info");
    }
  });
}
document.getElementById("no_kk").addEventListener(
  "input",
  debounce((event) => {
    if (event.target.value != "") {
      checkNoKK(
        event.target.value,
        (id_list = "no_kkList") // value nik // idlist
      );
    }
  }, 300)
); // Adjust the delay as needed (300ms in this case)
