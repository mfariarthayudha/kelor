let i = 0;
let isiId = [];
function addNewForm() {
  var variable =
    '<div class="card card-collapsable"> <a class="card-header" href="#card-warga-' +
    `${i}` +
    '" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="card-warga-' +
    `${i}` +
    '" > <h3 class="fw-light my-2 mx-auto">Data Warga</h3> <div class="card-collapsable-arrow"> <i class="fas fa-chevron-down"></i> </div> </a> <button class="m-2 btn btn-danger position-absolute top-0 start-100" onclick=removeForm(' +
    `${i}` +
    ')>Hapus </button> <div class="card-body"> <form id="form-warga-' +
    `${i}` +
    '"> <div class="mb-3"> <div class="row"> <div class="col-6"> <label class="small mb-1" for="nik">NIK</label ><input class="form-control" name="nik" required type="number" placeholder="cth :" /> </div> <div class="col-6"> <label class="small mb-1" for="nama">Nama Lengkap</label ><input class="form-control" name="nama" required type="text" placeholder="cth :" /> </div> </div> </div> <div class="collapse show" id="card-warga-' +
    `${i}` +
    '"> <div class="mb-3"> <label class="small mb-1" for="alamat_sebelumnya">Alamat sebelumnya </label><input class="form-control" name="alamat_sebelumnya" required type="text" placeholder="cth :" /> </div> <div class="mb-3"> <div class="row"> <div class="col-3"> <label class="small mb-1" for="tempat_lahir">Tempat Lahir </label ><input class="form-control" name="tempat_lahir" required type="text" placeholder="cth :" /> </div> <div class="col-3"> <label class="small mb-1" for="tanggal_lahir">Tgl. lahir</label ><input class="form-control" name="tanggal_lahir" required type="date" onchange="validate_date(this)" placeholder="cth :" /> </div> <div class="col-3"> <label for="jenis_kelamin"class="small mb-1" >Jenis Kelamin</label ><select name="jenis_kelamin"class="form-select" aria-label="Default select example" > <option selected value="" disabled> Pilih Jenis Kelamin: </option> <option value="Laki-laki">Laki - laki</option> <option value="Perempuan">Perempuan</option> </select> </div> <div class="col-3"> <label for="agama"class="small mb-1" >Agama</label ><select name="agama"class="form-select" > <option selected value="" disabled>Pilih Agama:</option> <option value="Islam">Islam</option> <option value="Kristen">Kristen</option> <option value="Katolik">Katolik</option> <option value="Hindu">Hindu</option> <option value="Buddha">Buddha</option> <option value="Khonghucu">Khonghucu</option> </select> </div> </div> </div> <div class="mb-3"> <div class="row"> <div class="col-3"> <label class="small mb-1" for="golongan_darah">Golongan darah </label ><select class="form-select" name="golongan_darah"><option value="-">-</option><option value="A">A</option><option value="B">B</option><option value="AB">AB</option><option value="O">O</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option></select> </div> <div class="col-3"> <label class="small mb-1" for="status_keluarga">Status hubungan dlm keluarga </label ><select class="form-select" name="status_keluarga"><option value="Kepala Keluarga">Kepala Keluarga</option><option value="Suami">Suami</option><option value="Istri">Istri</option><option value="Anak">Anak</option><option value="Menantu">Menantu</option><option value="Cucu">Cucu</option><option value="Orangtua">Orangtua</option><option value="Mertua">Mertua</option><option value="Famili Lain">Famili Lain</option><option value="Pembantu">Pembantu</option><option value="Lainnya">Lainnya</option></select></div> <div class="col-3"> <label class="small mb-1" for="pekerjaan">Pekerjaan</label ><input class="form-control" name="pekerjaan" required type="text" placeholder="cth :" /> </div> <div class="col-3"> <label class="small mb-1" for="pendidikan_terakhir">Pendidikan terakhir</label ><select class="form-select"name="pendidikan_terakhir"><option value="Tidak / Belum Sekolah">Tidak / Belum Sekolah</option><option value="Belum Tamat SD / Sederajat">Belum Tamat SD / Sederajat</option><option value="Tamat SD / Sederajat">Tamat SD / Sederajat</option><option value="SLTP / Sederajat">SLTP / Sederajat</option><option value="SLTA / Sederajat">SLTA / Sederajat</option><option value="Diploma I / II">Diploma I / II</option><optionvalue="Akademi / Diploma III / Sarjana Muda">Akademi / Diploma III / Sarjana Muda</option><option value="Diploma IV / Strata I">Diploma IV / Strata I</option><option value="Strata II">Strata II</option><option value="Strata III">Strata III</option></select></div> </div> </div> <h5 class="card-title">Data Surat</h5> <div class="mb-3"> <div class="row"> <div class="col-6"> <label class="small mb-1" for="no_paspor">No. Paspor </label ><input class="form-control" name="no_paspor"type="text" placeholder="cth :" /> </div> <div class="col-6"> <label class="small mb-1" for="tanggal_berakhir_paspor">Tgl. berakhir Paspor</label ><input class="form-control" name="tanggal_berakhir_paspor"type="date" placeholder="cth :" /> </div> </div> </div> <div class="mb-3"> <div class="row"> <div class="col-6"> <label class="small mb-1" for="akta_lahir">Akta lahir/Surat lahir </label ><input class="form-control" name="akta_lahir"type="text" placeholder="cth :" /> </div> <div class="col-6"> <label class="small mb-1" for="no_akta_lahir">Akte kelahiran/Surat Knal lahir </label ><select name="no_akta_lahir" class="form-select">   <option value="Tidak Ada">Tidak Ada</option>   <option value="Ada">Ada</option> </select> </div> </div> </div> <h5 class="card-title">Data Status pernikahan</h5> <div class="mb-3"> <div class="btn-group d-flex justify-content-evenly" role="group" aria-label="Basic radio toggle button group" > <div> <input type="radio" class="form-check-input" name="status_pernikahan" id="radio-belumKawin-' +
    `${i}` +
    '" value="Belum kawin" autocomplete="off" checked /> <label class="form-check-label" for="radio-belumKawin-' +
    `${i}` +
    '" >Belum kawin</label > </div> <div> <input type="radio" class="form-check-input" name="status_pernikahan" value="Kawin" id="radio-kawin-' +
    `${i}` +
    '" autocomplete="off" /> <label class="form-check-label" for="radio-kawin-' +
    `${i}` +
    '" >Kawin</label > </div> <div> <input type="radio" class="form-check-input" name="status_pernikahan" value="Cerai hidup" id="radio-ceraiHidup-' +
    `${i}` +
    '" autocomplete="off" /> <label class="form-check-label" for="radio-ceraiHidup-' +
    `${i}` +
    '" >Cerai hidup</label > </div> <div> <input type="radio" class="form-check-input" name="status_pernikahan" id="radio-ceraiMati-' +
    `${i}` +
    '" value="Cerai mati" autocomplete="off" /> <label class="form-check-label" for="radio-ceraiMati-' +
    `${i}` +
    '" >Cerai mati</label> </div> </div> </div> <div class="mb-3" id="kawin-' +
    `${i}` +
    '" hidden> <div class="row"> <div class="col-4"> <label class="small mb-1" for="no_akta_nikah"> No. Akt perkawinan / Buku Nikah </label ><input class="form-control" name="no_akta_nikah"type="text" placeholder="cth :" /> </div> <div class="col-5"> <label class="small mb-1" for="akta_nikah">Akt perkawinan / buku nikah</label ><select name="akta_nikah" class="form-select">   <option value="Tidak Ada">Tidak Ada</option>  <option value="Ada">Ada</option>  </select> </div> <div class="col-3"> <label class="small mb-1" for="tanggal_perkawinan">Tgl perkawinan</label ><input class="form-control" name="tanggal_perkawinan"type="date" placeholder="cth :" /> </div> </div> </div> <div class="mb-3" id="cerai-' +
    `${i}` +
    '"hidden> <div class="row"> <div class="col-4"> <label class="small mb-1" for="no_akt_cerai"> No. Akt Cerai </label ><input class="form-control" name="no_akt_cerai"type="text" placeholder="cth :" /> </div> <div class="col-5"> <label class="small mb-1" for="akta_cerai">Akt Cerai / Surat cerai</label ><select name="akta_cerai" class="form-select">   <option value="Tidak Ada">Tidak Ada</option>   <option value="Ada">Ada</option> </select> </div> <div class="col-3"> <label class="small mb-1" for="tanggal_perceraian">Tgl perceraian</label ><input class="form-control" name="tanggal_perceraian"type="date" placeholder="cth :" /> </div> </div> </div> <div class="mb-3"> <h5 class="card-title">Data Kelainan</h5> <div class="row"> <div class="col-6"> <label class="small mb-1" for="penyandang_cacat"> Penyandang Cacat </label ><select class="form-select" name="penyandang_cacat"><option value="Tidak Ada">Tidak Ada</option><option value="Cacat Fisik">Cacat Fisik</option><option value="Cacat Netra/Buta">Cacat Netra/Buta</option><option value="Cacat Rungu/Wicara">Cacat Rungu/Wicara</option><option value="Cacat Mental/Jiwa">Cacat Mental/Jiwa</option><option value="Cacat Fisik dan Mental">Cacat Fisik dan Mental</option><option value="Cacat Lainnya">Cacat Lainnya</option></select> </div> <div class="col-6"> <label class="small mb-1" for="kelainan_fisik">Kelainan Fisik & Mental </label ><select name="kelainan_fisik_mental"   class="form-select" >  <option value="Tidak Ada">Tidak Ada</option> <option value="Ada">Ada</option> </select> </div> </div> </div> <div class="mb-3"> <h5 class="card-title">Data Ayah & Ibu</h5> <div class="row"> <div class="col-6"> <label class="small mb-1" for="nik_ayah">NIK Ayah</label > </div> <div class="col-6"> <label class="small mb-1" for="nama_ayah">Nama Ayah</label > </div> </div> <div class="row"> <div class="col-6"> <input class="form-control" name="nik_ayah" required type="number" placeholder="cth :" /> </div> <div class="col-6"> <input class="form-control" name="nama_ayah" required type="text" placeholder="cth :" /> </div> </div> </div> <div class="mb-3"> <div class="row"> <div class="col-6"> <label class="small mb-1" for="nik_ibu">NIK Ibu</label > </div> <div class="col-6"> <label class="small mb-1" for="nama_ibu">Nama Ibu</label > </div> </div> <div class="row"> <div class="col-6"> <input class="form-control" name="nik_ibu" required type="number" placeholder="cth :" /> </div> <div class="col-6"> <input class="form-control" name="nama_ibu" required type="text" placeholder="cth :" /> </div> </div> </div> </div> </form> </div>  </div>';
  var div = document.createElement("div");
  div.setAttribute("id", "node" + i);
  div.setAttribute("class", "my-2");
  div.innerHTML = variable.trim();
  document.getElementById("form-keluarga").appendChild(div);
  isiId.push(i);
  // console.log(isiId)
  i = i + 1;
}

function removeForm(id) {
  // mencari index yang akan di hapus
  const index = isiId.indexOf(id);
  isiId.splice(index, 1);
  const element = document.getElementById("node" + id);
  element.remove();
}

function getFormData(id) {
  var form = document.getElementById(id);
  var formData = new FormData(form);

  // Convert FormData to an object
  var formDataObject = {};
  formData.forEach(function (value, key) {
    formDataObject[key] = value;
  });

  // Output the form data object
  return formDataObject;
}

function check_data() {
  const data_keluarga = {
    no_reg: document.getElementById("no_reg").value,
    alamat: document.getElementById("alamat").value,
    dusun: document.getElementById("dusun").value,
    rt: document.getElementById("rt").value,
    rw: document.getElementById("rw").value,
    kode_pos: document.getElementById("kode_pos").value,
  };

  isiId.forEach((data_anggota, _index) => {
    data_keluarga[_index] = getFormData("form-warga-" + data_anggota);
  });
  console.log(Object.keys(data_keluarga).length);
  console.log(data_keluarga);
  axios({
    url: `${baseUrl}/api/documents/cde25fb3-ad23-463c-863a-a6f068e3bf6b`,
    method: "post",
    headers: { "content-type": "application/json" },
    data: { ...data_keluarga },
  })
    .then((response) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Surat terbuat ",
        showConfirmButton: false,
        timer: 1800,
      });

      setTimeout(() => {
        window.location.href = "/documents/";
      }, 2000);
    })
    .catch((error) => {
      document.querySelector("#btn-buat-surat").innerHTML = "Buat Surat";

      let resError = "";
      if (typeof error.response.data.errorMessages === "object") {
        for (const key in error.response.data.errorMessages) {
          if (error.response.data.errorMessages.hasOwnProperty(key)) {
            resError += error.response.data.errorMessages[key] + "<br />";
          }
        }
      } else {
        resError = error.response.data.errorMessages;
      }

      Swal.fire({
        icon: "error",
        title: resError,
        showConfirmButton: true,
      });
    });
}
