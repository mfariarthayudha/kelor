function getDusun(id_element_dusun, dusun_id = false) {
  axios({
    url: `${baseUrl}/api/dusun`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;
    let selectElement = document.getElementById(id_element_dusun);

    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");

      newOption.value = data[i]["dusun_id"];
      newOption.text = data[i]["nama_dusun"];
      if (data[i]["dusun_id"] === dusun_id) {
        newOption.selected = true;
      }
      selectElement.appendChild(newOption);
    }
  });
}

function getRW(id_dusun, id_element_rw, rw_id = false) {
  axios({
    url: `${baseUrl}/api/rw/dusun/${id_dusun}`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;

    let selectElement = document.getElementById(id_element_rw);
    selectElement.querySelectorAll("option").forEach(function (option) {
      if (option.text !== "Pilih RW") {
        option.remove();
      }
    });
    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");

      newOption.value = data[i]["rw_id"];
      newOption.text = data[i]["no_rw"];
      if (data[i]["rw_id"] === rw_id) {
        selectElement.value = data[i]["rw_id"];
        newOption.selected = true;
      }
      selectElement.appendChild(newOption);
    }
  });
}

function getRT(rw_id, rt_id_element, rt_id = false) {
  axios({
    url: `${baseUrl}/api/rt/rw/${rw_id}`,
    method: "get",
    headers: { "content-type": "application/json" },
  }).then((response) => {
    let data = response.data;
    let selectElement = document.getElementById(rt_id_element);
    selectElement.querySelectorAll("option").forEach(function (option) {
      if (option.text !== "Pilih RT") {
        option.remove();
      }
    });

    for (let i = 0; i < Object.keys(response.data).length; i++) {
      let newOption = document.createElement("option");

      newOption.value = data[i]["rt_id"];
      newOption.text = data[i]["no_rt"];
      if (data[i]["rt_id"] === rt_id) {
        selectElement.value = data[i]["rt_id"];
        newOption.selected = true;
      }
      selectElement.appendChild(newOption);
    }
  });
}
