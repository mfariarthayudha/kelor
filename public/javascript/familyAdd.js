window.onload = function () {
  getDusun("dusun");
};
document.getElementById("rw").addEventListener("change", (event) => {
  let rw = document.getElementById("rw").value;
  if (document.querySelector('#rw option[value="Pilih RW"]')) {
    document.querySelector('#rw option[value="Pilih RW"]').disabled = true;
  }
  getRT(rw, "rt");
});

document.getElementById("dusun").addEventListener("change", (event) => {
  if (document.querySelector('#dusun option[value="Pilih Dusun"]')) {
    document.querySelector(
      '#dusun option[value="Pilih Dusun"]'
    ).disabled = true;
  }

  let dusun = document.getElementById("dusun").value;
  getRW(dusun, "rw");
});
