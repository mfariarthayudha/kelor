window.onload = () => {
  updateSelectElement("/api/dusun", "dusun", "dusun_id", "nama_dusun");
};

document.getElementById("dusun").addEventListener("change", (event) => {
  const dusun = event.target.value;
  updateSelectElement(`/api/rw/dusun/${dusun}`, "rw", "rw_id", "no_rw");
});

document.getElementById("rw").addEventListener("change", (event) => {
  const rw = event.target.value;
  const dusun = document.getElementById("dusun").value;
  updateSelectElement(
    `/api/rt/rw/${rw}/dusun/${dusun}`,
    "rt",
    "rt_id",
    "no_rt"
  );
});
