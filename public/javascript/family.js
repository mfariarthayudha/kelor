// function checkNoKK() {
//   var no_kk = document.getElementById("no_kk").value;
//   console.log(no_kk);
//   axios({
//     url: `${baseUrl}/api/families/${no_kk}`,
//     method: "get",
//     headers: { "content-type": "application/json" },
//   }).then((response) => {
//     console.log(response.data);
//     document.getElementById("alamat").value = response.data.alamat;
//     document.getElementById("dusun").value = response.data.dusun;
//     document.getElementById("rt").value = response.data.rt;
//     document.getElementById("rw").value = response.data.rw;
//   });
// }
window.onload = function () {
  axios({
    url: `${baseUrl}/api/dusun`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;
    let selectElement = document.getElementById("dusun");
    let newOption = document.createElement("option");
    newOption.text = "pilih dusun";
    newOption.value = "pilih dusun";
    newOption.selected = true;
    newOption.disabled = true;
    selectElement.appendChild(newOption);

    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");
      newOption.value = data[i]["dusun_id"];
      newOption.text = data[i]["nama_dusun"];
      selectElement.appendChild(newOption);
    }
  });
};
document.getElementById("rw").addEventListener("change", (event) => {
  let rw = document.getElementById("rw").value;
  let dusun = document.getElementById("dusun").value;
  axios({
    url: `${baseUrl}/api/rt/rw/${rw}/dusun/${dusun}`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;
    let selectElement = document.getElementById("rt");
    while (selectElement.firstChild) {
      selectElement.removeChild(selectElement.firstChild);
    }

    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");
      newOption.value = data[i]["rt_id"];
      newOption.text = data[i]["no_rt"];
      selectElement.appendChild(newOption);
    }
  });
});

document.getElementById("dusun").addEventListener("click", (event) => {
  if (document.querySelector('#dusun option[value="pilih dusun"]')) {
    document.querySelector('#dusun option[value="pilih dusun"]').remove();
  }

  let dusun = document.getElementById("dusun").value;
  axios({
    url: `${baseUrl}/api/rw/dusun/${dusun}`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;
    let selectElement = document.getElementById("rw");
    while (selectElement.firstChild) {
      selectElement.removeChild(selectElement.firstChild);
    }

    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");
      newOption.value = data[i]["rw_id"];
      newOption.text = data[i]["no_rw"];
      selectElement.appendChild(newOption);
    }
  });
});
