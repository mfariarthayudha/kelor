var res;
function setList(id_list, response, resident = true) {
  res = response;

  const datalist = document.getElementById(id_list);
  while (datalist.firstChild) {
    datalist.removeChild(datalist.firstChild);
  }
  res.forEach((val) => {
    const option = document.createElement("option");
    if (resident) {
      option.value = val.nik;
      option.text = val.nama;
    } else {
      option.value = val.no_kk;
      option.text = `${val.alamat}, ${val.nama_dusun} RT ${val.no_rt}/${val.no_rw}`;
    }
    datalist.appendChild(option);
  });
}
function setName(idNama, nik) {
  document.getElementById(idNama).focus();
  for (let i = 0; i < res.length; i++) {
    if (res[i].nik === nik) {
      document.getElementById(idNama).value = res[i].nama;
    }
  }
}
