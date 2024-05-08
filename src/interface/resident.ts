export default interface resident {
  nik: string;
  nama: string;
  alamat_sebelumnya: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  jenis_kelamin: "Laki-laki" | "Perempuan";
  agama: "Islam" | "katolik" | "protestan" | "hindu" | "buddha" | "khongHuCu";
  status_pernikahan: "Kawin" | "Belum Kawin" | "Cerai Mati" | "Cerai Hidup";
  pendidikan_terakhir: string;
  // | "Tidak/Belum Sekolah"
  // | "SD/Sederajat"
  // | "SMP/Sederajat"
  // | "SMA/Sederajat"
  // | "D1"
  // | "D2"
  // | "D3"
  // | "S1"
  // | "S2"
  // | "S3";
  status_keluarga: string;
  golongan_darah: string;
  pekerjaan: string;
  no_paspor: string;
  tanggal_berakhir_paspor: Date;
  akta_lahir: string;
  no_akta_lahir: string;
  no_akta_nikah: string;
  akta_nikah: string;
  tanggal_perkawinan: Date;
  no_akta_cerai: string;
  akta_cerai: string;
  tanggal_perceraian: Date;
  kelainan_fisik_mental: string;
  penyandang_cacat: string;
  nama_ayah: string;
  nama_ibu: string;
  nik_ayah: string;
  nik_ibu: string;
  create_at: Date;
  update_at: Date;
}
