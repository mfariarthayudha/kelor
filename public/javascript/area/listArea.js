function updateDusun(id_element_dusun, dusun_id = false) {
  updateSelectElement(
    "/api/dusun",
    id_element_dusun,
    "dusun_id",
    "nama_dusun",
    (dusun_id = dusun_id)
  );
}

function updateRW(id_dusun, id_element_rw, rw_id = false) {
  updateSelectElement(
    `/api/rw/dusun/${id_dusun}`,
    id_element_rw,
    "rw_id",
    "no_rw",
    (rw_id = rw_id)
  );
}

function updateRT(rw_id, rt_id_element, rt_id = false) {
  updateSelectElement(
    `/api/rt/rw/${rw_id}`,
    rt_id_element,
    "rt_id",
    "no_rt",
    (rt_id = rt_id)
  );
}
function checkFalsyValue(value) {
  // Define a regex pattern to match exactly "0"
  var regexPattern = /^0+$/;
  // Test if the value matches the regex pattern
  return !regexPattern.test(value);
}
