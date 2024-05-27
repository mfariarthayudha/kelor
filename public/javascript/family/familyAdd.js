window.onload = function () {
  updateDusun("dusun");
};

document.getElementById("dusun").addEventListener("change", (event) => {
  const dusun = event.target.value;
  updateRW(dusun, "rw");
});

document.getElementById("rw").addEventListener("change", (event) => {
  const rw = event.target.value;
  updateRT(rw, "rt");
});
