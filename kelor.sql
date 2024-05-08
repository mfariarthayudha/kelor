-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 07, 2024 at 01:03 PM
-- Server version: 8.0.36
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kelor`
--

-- --------------------------------------------------------

--
-- Table structure for table `document_input_fields`
--

CREATE TABLE `document_input_fields` (
  `document_input_field_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_type_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parent` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `label` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `variable_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `show_order` tinyint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_input_fields`
--

INSERT INTO `document_input_fields` (`document_input_field_id`, `document_type_id`, `parent`, `type`, `label`, `variable_name`, `show_order`, `created_at`, `updated_at`) VALUES
('6277d815-5919-4d6e-a921-52370b4a1ace', '2c853586-a436-4614-ae0b-c0592d430db5', NULL, 'text', 'Nama Lengkap', 'fullName', 1, '2024-03-27 08:45:31', '2024-03-27 08:45:31'),
('a4a3ff60-4139-414c-a800-a4516ffb9187', '66f48cec-a0b5-4747-97e9-260032b9e7ba', NULL, 'text', 'Nama Lengkap', 'fullName', 0, '2024-03-27 08:20:56', '2024-03-27 08:20:56');

-- --------------------------------------------------------

--
-- Table structure for table `document_results`
--

CREATE TABLE `document_results` (
  `document_result_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_type_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nomor_surat` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '-',
  `nik` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `applicant_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `signed` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_results`
--

INSERT INTO `document_results` (`document_result_id`, `document_type_id`, `nomor_surat`, `nik`, `applicant_name`, `content`, `signed`, `created_at`) VALUES
('02c62b24-8c8a-4521-a0e7-bfa3c8c7da85', '2b76a6b5-6c9e-4dea-90f8-6eec0183530a', '4156315415', '31162002', 'Jose Rafael', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN DOMISILI USAHA</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN DOMISILI USAHA</u></h5>        <p class=\"mb-1\">Nomor : 4156315415</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row\">          <p class=\"ms-5 ps-5\">Dasar :</p>          <ol>            <li>              Akta Pendirian Nomor 30 tanggal 10 April 2024 atas nama              PT. Abadi Jaya            </li>            <li>Tanda Daftar Perusahaan PT. Abadi Jaya</li>            <li>Surat Izin Usaha Perdagangan Menengah PT. Abadi Jaya</li>          </ol>        </div>        <div class=\"row\">          <p class=\"mb-2\">            Yang bertanda tangan di bawah ini Kepala Desa Cipayung Kecamatan            Megamendung Kabupaten Bogor, menerangkan bahwa:          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 35%\">Nama</td>                <td>: Jose Rafael</td>              </tr>              <tr>                <td>Tempat.Tgl. lahir</td>                <td>: Tangerang, 16 November 2001</td>              </tr>              <tr>                <td>Jenis Kelamin</td>                <td>: Laki-laki</td>              </tr>              <tr>                <td>Pekerjaan</td>                <td>: Pelajar</td>              </tr>              <tr>                <td>Agama</td>                <td>: Katolik</td>              </tr>              <tr>                <td>Kewarganegaraan</td>                <td>: WNI</td>              </tr>              <tr>                <td>Alamat</td>                <td>: Jl Maulana Hassanudin</td>              </tr>              <tr>                <td>No. KTP</td>                <td>: 31162002</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"my-2\">            Nama tersebut diatas telah membuka / mempunyai Usaha sebagaimana            tersebut dibawah ini :          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 40%\">Nama Perusahaan</td>                <td>: PT. Abadi Jaya</td>              </tr>              <tr>                <td>Jenis Usaha</td>                <td>: Makanan</td>              </tr>              <tr>                <td>Penanggung Jawab</td>                <td>: Fito</td>              </tr>              <tr>                <td>Jumlah Karyawan</td>                <td>: 123</td>              </tr>              <tr>                <td>Alamat Perusahaan</td>                <td>: jl maulana hassanudin</td>              </tr>              <tr>                <td>Status Bangunan</td>                <td>: Kontrak</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"mx-1 my-2\">Surat Keterangan ini berlaku Sampai dengan:</p>          <p class=\"fw-bold\"><u>CATATAN:</u></p>          <ol>            <li>Agar melengkapi perizinan sesuai yang dimiliki</li>            <li>              Menjaga ketertiban, kenyamanan, dan keamanan di lingkungan              kerjanya            </li>            <li>Tunduk atas aturan dan peraturan yang berlaku</li>            <li>Koordinasi dengan RT/RW, aparat Desa setempat</li>            <li>Menyesuaikan dengan adat istiadat dan budaya setempat</li>            <li>Agar memberdayakan Sumber Daya Manusia di Wilayah setempat</li>          </ol>          <p class=\"text-center my-1\">            Demikian Surat Keterangan ini di berikan untuk dapat dipergunakan            sebagaimana mestinya          </p>        </div>        <div class=\"text-center justify-content-center\">          <div class=\"row\">            <div class=\"col-6\">              <p>No.Reg.503 / 598494 / IX / Perek - 2018</p>            </div>            <div class=\"col-6\"><p>Cipayung. 05 Mei 2024</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\"><p>CAMAT MEGAMENDUNG</p></div>            <div class=\"col-6\"><p>KEPALA DESA CIPAYUNG</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <br />              <br />              <br />            </div>            <div class=\"col-6\">              <img                src=\"http://localhost:3100/signature.png\"                alt=\"ttd kades\"                width=\"70%\"              />            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p class=\"fw-bold\"><u> Drs.H.HADIJANA,S.Sos,M.Si </u></p>            </div>            <div class=\"col-6\">              <p class=\"fw-bold\"><u>H.CACUH BUDIAWAN. SE</u></p>            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p>Pembina Tk.I</p>              <p>Nip.196903061990101001</p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-05 23:55:46'),
('1083aaa5-60a2-43fb-99f1-83a076699635', 'bde3a863-a632-4d63-b155-3c2896d3e989', '1416416', '202031059', 'Zidan', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</u></h5>        <p class=\"mb-1\">Nomor : 1416416</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row\">          <p class=\"my-3\">            Kepala Desa Cipayung, Kecamatan Megamendung, Kabupaten Bogor, dengan            ini menerangkan :          </p>          <table class=\"ms-5 ps-5 mb-3\">            <tr>              <td>Nama</td>              <td>: Zidan</td>            </tr>            <tr>              <td>Jenis Kelamin</td>              <td>: Laki-laki</td>            </tr>            <tr>              <td>Tempat/Tanggal Lahir</td>              <td>: Jakarta, 03 Mei 2002</td>            </tr>            <tr>              <td>NIK</td>              <td>: 202031059</td>            </tr>            <tr>              <td>Status/Agama</td>              <td>: Anak/Islam</td>            </tr>            <tr>              <td>Pekerjaan</td>              <td>: Pelajar</td>            </tr>            <tr>              <td>Warga Negara</td>              <td>: WNI</td>            </tr>            <tr>              <td>Asal Sekolah</td>              <td>: SMK YZA</td>            </tr>            <tr>              <td>Tempat Tinggal</td>              <td>: Jl Cipayung</td>            </tr>          </table>        </div>        <div class=\"row\">          <p class=\"mb-3\">            Bahwa nama tersebut diatas adalah benar saat ini bertempat tinggal            di Desa Cipayung, Kecamatan Megamendung, Kabupaten Bogor dan menurut            keterangan dari RT. setempat bahwa yang bersangkutan saat ini            termasuk Keluarga Kurang Mampu / Keluarga Ekonomi Lemah.          </p>          <p class=\"mb-3\">Surat keterangan ini dibuat untuk :­</p>          <p class=\"text-center mb-5 pb-3 fw-bold\">            MELENGKAPI PERSYARATAN ADMINISTRASI KE            <span class=\"text-uppercase\"> SMK YZA </span>          </p>          <p>            Demikian surat keterangan ini di buat dengan sebenarnya untuk dapat            di pergunakan sebagai mana mestinya.          </p>        </div>        <div class=\"row d-flex justify-content-end\">          <div class=\"col-6 text-center\">            <p>Cipayung, 05 Mei 2024</p>            <p>KEPALA DESA CIPAYUNG</p>            <img src=\"http://localhost:3100/signature.png\" alt=\"ttd kades\" width=\"70%\" />            <p class=\"fw-bold\"><u>H. CACUH BUDIAWAN, SE</u></p>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-05 22:14:57'),
('13af1955-bb9c-46d1-9c94-18134d121578', 'cde25fb3-ad23-463c-863a-a6f068e3bf6b', '63254452', '32012430103650432', 'zeko de leafer', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link      rel=\"stylesheet\"      href=\"http://localhost:3100/css/print_vertical.css\"    />    <title>Surat KK 101 F</title>  </head>  <body>    <header class=\"d-flex justify-content-center my-1\">      <img        src=\"http://localhost:3100/logo_cipayung.png\"        alt=\"logo_desa_cipayung\"        class=\"me-2\"        width=\"5%\"        height=\"5%\"      />      <div class=\"text-center my-auto\">        <p class=\"mb-1\">No Reg : 400.12.2.1 / 63254452 -pem</p>        <h5 class=\"fw-bold\">          FORMULIR ISIAN BIODATA PENDUDUK UNTUK WNI ( PERKELUARGA )        </h5>      </div>      <p class=\"position-absolute top-0 end-0\">F-1.01</p>    </header>    <main>      <div class=\"container-fluid\">        <div class=\"row mb-1\">          <div class=\"col-8\">            <p class=\"my-1\" style=\"font-size: x-small\">              Perhatian : Isilah Formulir ini dengan huruf cetak dan jelas serta              mengikuti TATA CARA PENGISIAN FORMULIR PADA HALAMAN SEBALIKNYA            </p>            <p class=\"fw-bold\">DATA KEPALA KELUARGA</p>            <!-- <p class=\"m-n1\"></p> -->            <table class=\"no-border\">              <tr>                <td>Nama Kepala Keluarga</td>                <td>: &nbsp;</td>                <td class=\"kotak\">zeko de leafer</td>              </tr>              <tr>                <td>Alamat</td>                <td>: &nbsp;</td>                <td class=\"kotak\">Jl Bogor raya</td>              </tr>              <tr>                <td>Kode Pos</td>                <td>:</td>                <td>                                    <span class=\"kotak\">1</span>                                    <span class=\"kotak\">2</span>                                    <span class=\"kotak\">3</span>                                    <span class=\"kotak\">1</span>                                    <span class=\"kotak\">1</span>                                    <span class=\"mx-3\">RT</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">4</span>                  <span class=\"mx-3\">RW</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">5</span>                  <span class=\"mx-3\">Jumlah Anggota Keluarga</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">2</span>                  <span class=\"kotak\">Orang</span>                </td>              </tr>            </table>          </div>          <div class=\"col-4\">            <table>              <tr>                <td>Diisi oleh Petugas</td>                <td>:</td>                <td colspan=\"7\">Nanang Supriyanto</td>              </tr>              <tr>                <td>Kode Nama Propinsi</td>                <td>:</td>                <td class=\"kotak\">3</td>                <td class=\"kotak\">2</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">JAWA BARAT</td>              </tr>              <tr>                <td>Kode Nama Kabupaten/kota</td>                <td>:</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">1</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">BOGOR</td>              </tr>              <tr>                <td>Kode Nama Kecamatan</td>                <td>:</td>                <td class=\"kotak\">2</td>                <td class=\"kotak\">6</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">MEGAMENDUNG</td>              </tr>              <tr>                <td>Kode Nama Kelurahan/Desa</td>                <td>:</td>                <td class=\"kotak\">2</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">6</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">CIPAYUNG</td>              </tr>              <tr>                <td>Kode Dusun/Dukuh/Kp</td>                <td>: &nbsp;</td>                <td colspan=\"7\" class=\"kotak\">CIPAYUNG</td>              </tr>            </table>          </div>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Nama Lengkap</th>                <th>NIK</th>                <th>Alamat Sebelumnya</th>                <th>No Paspor</th>                <th>Tgl Berakhir Paspor</th>              </tr>            </thead>            <tbody>                            <tr>                <td>1</td>                <td>zeko de leafer</td>                <td>32012430103650432</td>                <td>jl maulana hassanudin</td>                <td>-</td>                <td>-</td>              </tr>                            <tr>                <td>2</td>                <td>Shik</td>                <td>3201260103651232</td>                <td>-</td>                <td>-</td>                <td>-</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Jenis Kelamin</th>                <th>Tempat Lahir</th>                <th>Tgl Lahir</th>                <th>Umur</th>                <th>Akta Surat/ Surat Lahir</th>                <th>No. Akte Kelahiran / Surat Kanal lahir</th>                <th>Gol. Darah</th>                <th>Agama</th>                <th>Status</th>                <th>Akt perkawinan / buku nikah</th>                <th>No. Akt perkawinan / buku Nikah</th>                <th>Tgl perkawinan</th>                <th>Akt Cerai / Surat Cerai</th>                <th>No. Akta Cerai</th>                <th>Tgl. perceraian</th>              </tr>            </thead>            <tbody class=\"fit-content\">                            <tr>                <td>1</td>                <td>Laki-laki</td>                <td>tangerang</td>                <td width=\"100px\">2000-11-10</td>                <td>23</td>                <td>-</td>                <td>Tidak Ada</td>                <td>-</td>                <td>Katolik</td>                <td>Kawin</td>                <td>Ada</td>                <td>11111</td>                <td>2023-11-10</td>                <td>Tidak Ada</td>                <td></td>                <td>-</td>              </tr>                            <tr>                <td>2</td>                <td>Perempuan</td>                <td>tangerang</td>                <td width=\"100px\">2001-11-10</td>                <td>22</td>                <td>-</td>                <td>Tidak Ada</td>                <td>-</td>                <td>Islam</td>                <td>Kawin</td>                <td>Ada</td>                <td>11111</td>                <td>2023-11-10</td>                <td>Tidak Ada</td>                <td></td>                <td>-</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Status hubungan Dalam Keluarga</th>                <th>Kelainan Fisik & Mental</th>                <th>Penyandang Cacat</th>                <th>Pendidikan terakhir</th>                <th>Pekerjaan</th>                <th>NIK Ibu</th>                <th>Nama Lengkap Ibu</th>                <th>NIK Ayah</th>                <th>Nama Lengkap Ayah</th>              </tr>            </thead>            <tbody>                            <tr>                <td>1</td>                <td>Kepala Keluarga</td>                <td>Tidak Ada</td>                <td>Tidak Ada</td>                <td>Diploma IV / Strata I</td>                <td>Polisi</td>                <td>355544477626</td>                <td>Sati</td>                <td>3135145642545</td>                <td>Budi</td>              </tr>                            <tr>                <td>2</td>                <td>Istri</td>                <td>Tidak Ada</td>                <td>Tidak Ada</td>                <td>Diploma I / II</td>                <td>Ibu Rumah Tangga</td>                <td>3222555454</td>                <td>Sati</td>                <td>3255554456</td>                <td>Budi</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"separately\">          <div class=\"row mt-n3\">            <div class=\"col-4\">              <p>                Nama Ketua RT                <span class=\"kotak\"> 0</span>                <span class=\"kotak\">4</span>                : Jeje              </p>            </div>            <div class=\"col-2\">&nbsp;</div>            <div class=\"col-4 text-center\">              <p>Mengetahui</p>            </div>            <div class=\"col-2 text-center\">              <p>Cipayung, 07 Mei 2024</p>            </div>          </div>          <div class=\"row\">            <div class=\"col-4\">              <p>                Nama Ketua RW                <span class=\"kotak\">0</span>                <span class=\"kotak\">5</span>                : Fitto              </p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Petugas Register</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Camat Megamendung</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Kepala Desa Cipayung</p>            </div>            <div class=\"col-2 text-center\"><p>Kepala Keluarga</p></div>          </div>          <div class=\"row mt-2\">            <div class=\"col-4\">              <p>Pernyataan</p>              <p>Demikian Formulir ini saya/kami isi dengan sesungguhnya,</p>              <p>Apabila keterangan tersebut tidak sesuai dengan keadaan</p>              <p>                yang sebenarnya, saya bersedia dikenakan sanksi sesuai ketentuan              </p>            </div>            <div class=\"col-2 text-center\">              <img                src=\"http://localhost:3100/signature.png\"                alt=\"Tanda Tangan Petugas\"                width=\"70%\"                class=\"ms-3\"              />            </div>            <div class=\"col-2\">&nbsp;</div>            <div class=\"col-2 text-center\">              <img                src=\"(village-chief-signature)\"                 width=\"70%\"                class=\"ms-3\"              />            </div>            <div class=\"col-2\">&nbsp;</div>          </div>          <div class=\"row\">            <div class=\"col-4\">              <p>peraturan perundang-undangan yang berlaku</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Nanang Supriyanto</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">..................</p>              <p class=\"\">Nip :</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">H. CACUH BUDIAWAN, SE</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">zeko de leafer</p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 0, '2024-05-07 12:33:59'),
('14a23ceb-3ac7-4e53-b486-cee164149703', 'cde25fb3-ad23-463c-863a-a6f068e3bf6b', 'sdgfwt452df23432', '123123', 'Fitto', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link      rel=\"stylesheet\"      href=\"http://localhost:3100/css/print_vertical.css\"    />    <title>Surat KK 101 F</title>  </head>  <body>    <header class=\"d-flex justify-content-center my-1\">      <img        src=\"http://localhost:3100/logo_cipayung.png\"        alt=\"logo_desa_cipayung\"        class=\"me-2\"        width=\"5%\"        height=\"5%\"      />      <div class=\"text-center my-auto\">        <p class=\"mb-1\">No Reg : 400.12.2.1 / sdgfwt452df23432 -pem</p>        <h5 class=\"fw-bold\">          FORMULIR ISIAN BIODATA PENDUDUK UNTUK WNI ( PERKELUARGA )        </h5>      </div>      <p class=\"position-absolute top-0 end-0\">F-1.01</p>    </header>    <main>      <div class=\"container-fluid\">        <div class=\"row mb-1\">          <div class=\"col-8\">            <p class=\"my-1\" style=\"font-size: x-small\">              Perhatian : Isilah Formulir ini dengan huruf cetak dan jelas serta              mengikuti TATA CARA PENGISIAN FORMULIR PADA HALAMAN SEBALIKNYA            </p>            <p class=\"fw-bold\">DATA KEPALA KELUARGA</p>            <!-- <p class=\"m-n1\"></p> -->            <table class=\"no-border\">              <tr>                <td>Nama Kepala Keluarga</td>                <td>: &nbsp;</td>                <td class=\"kotak\">Fitto</td>              </tr>              <tr>                <td>Alamat</td>                <td>: &nbsp;</td>                <td class=\"kotak\">jl tes banru</td>              </tr>              <tr>                <td>Kode Pos</td>                <td>:</td>                <td>                                    <span class=\"kotak\">1</span>                                    <span class=\"kotak\">5</span>                                    <span class=\"kotak\">2</span>                                    <span class=\"kotak\">4</span>                                    <span class=\"kotak\">5</span>                                    <span class=\"mx-3\">RT</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">9</span>                  <span class=\"mx-3\">RW</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">2</span>                  <span class=\"mx-3\">Jumlah Anggota Keluarga</span>                  <span class=\"kotak\">0</span>                  <span class=\"kotak\">3</span>                  <span class=\"kotak\">Orang</span>                </td>              </tr>            </table>          </div>          <div class=\"col-4\">            <table>              <tr>                <td>Diisi oleh Petugas</td>                <td>:</td>                <td colspan=\"7\">Nanang Supriyanto</td>              </tr>              <tr>                <td>Kode Nama Propinsi</td>                <td>:</td>                <td class=\"kotak\">3</td>                <td class=\"kotak\">2</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">JAWA BARAT</td>              </tr>              <tr>                <td>Kode Nama Kabupaten/kota</td>                <td>:</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">1</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">BOGOR</td>              </tr>              <tr>                <td>Kode Nama Kecamatan</td>                <td>:</td>                <td class=\"kotak\">2</td>                <td class=\"kotak\">6</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">MEGAMENDUNG</td>              </tr>              <tr>                <td>Kode Nama Kelurahan/Desa</td>                <td>:</td>                <td class=\"kotak\">2</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">0</td>                <td class=\"kotak\">6</td>                <td>&nbsp;</td>                <td>&nbsp;</td>                <td class=\"kotak\">CIPAYUNG</td>              </tr>              <tr>                <td>Kode Dusun/Dukuh/Kp</td>                <td>: &nbsp;</td>                <td colspan=\"7\" class=\"kotak\">DUSUN 1</td>              </tr>            </table>          </div>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Nama Lengkap</th>                <th>NIK</th>                <th>Alamat Sebelumnya</th>                <th>No Paspor</th>                <th>Tgl Berakhir Paspor</th>              </tr>            </thead>            <tbody>                            <tr>                <td>1</td>                <td>Fitto</td>                <td>123123</td>                <td>jl maulana hassanudin</td>                <td>-</td>                <td>-</td>              </tr>                            <tr>                <td>2</td>                <td>Fara</td>                <td>153215413242</td>                <td>jl hj mali</td>                <td>-</td>                <td>-</td>              </tr>                            <tr>                <td>3</td>                <td>Rafi</td>                <td>415314543242</td>                <td>jl ciupaying</td>                <td>-</td>                <td>-</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Jenis Kelamin</th>                <th>Tempat Lahir</th>                <th>Tgl Lahir</th>                <th>Umur</th>                <th>Akta Surat/ Surat Lahir</th>                <th>No. Akte Kelahiran / Surat Kanal lahir</th>                <th>Gol. Darah</th>                <th>Agama</th>                <th>Status</th>                <th>Akt perkawinan / buku nikah</th>                <th>No. Akt perkawinan / buku Nikah</th>                <th>Tgl perkawinan</th>                <th>Akt Cerai / Surat Cerai</th>                <th>No. Akta Cerai</th>                <th>Tgl. perceraian</th>              </tr>            </thead>            <tbody class=\"fit-content\">                            <tr>                <td>1</td>                <td>Laki-laki</td>                <td>Lampung</td>                <td width=\"100px\">2002-12-10</td>                <td>21</td>                <td>-</td>                <td>Tidak Ada</td>                <td>-</td>                <td>Islam</td>                <td>Kawin</td>                <td>Ada</td>                <td>11111</td>                <td>2023-11-17</td>                <td>Tidak Ada</td>                <td></td>                <td>-</td>              </tr>                            <tr>                <td>2</td>                <td>Perempuan</td>                <td>Jakarta</td>                <td width=\"100px\">2005-11-10</td>                <td>18</td>                <td>213423</td>                <td>Tidak Ada</td>                <td>-</td>                <td>Islam</td>                <td>Kawin</td>                <td>Ada</td>                <td>11111</td>                <td>2023-11-17</td>                <td>Tidak Ada</td>                <td></td>                <td>-</td>              </tr>                            <tr>                <td>3</td>                <td>Laki-laki</td>                <td>bogor</td>                <td width=\"100px\">2022-02-05</td>                <td>2</td>                <td>11111</td>                <td>Ada</td>                <td>-</td>                <td>Islam</td>                <td>Belum kawin</td>                <td>Tidak Ada</td>                <td>-</td>                <td>-</td>                <td>Tidak Ada</td>                <td></td>                <td>-</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"row mx-auto mb-2\">          <table class=\"nomor table-bordered border-dark\">            <thead>              <tr>                <th>No.</th>                <th>Status hubungan Dalam Keluarga</th>                <th>Kelainan Fisik & Mental</th>                <th>Penyandang Cacat</th>                <th>Pendidikan terakhir</th>                <th>Pekerjaan</th>                <th>NIK Ibu</th>                <th>Nama Lengkap Ibu</th>                <th>NIK Ayah</th>                <th>Nama Lengkap Ayah</th>              </tr>            </thead>            <tbody>                            <tr>                <td>1</td>                <td>Kepala Keluarga</td>                <td>Tidak Ada</td>                <td>Tidak Ada</td>                <td>Strata II</td>                <td>Polisi</td>                <td>11245645</td>                <td>Siti</td>                <td>45424541</td>                <td>Budi</td>              </tr>                            <tr>                <td>2</td>                <td>Istri</td>                <td>Tidak Ada</td>                <td>Tidak Ada</td>                <td>Tidak / Belum Sekolah</td>                <td>Ibu Rumah Tangga</td>                <td>12312312</td>                <td>sfdasdad</td>                <td>123123</td>                <td>asdasd</td>              </tr>                            <tr>                <td>3</td>                <td>Anak</td>                <td>Tidak Ada</td>                <td>Tidak Ada</td>                <td>Tidak / Belum Sekolah</td>                <td>Pelajar</td>                <td>4561564</td>                <td>Fara</td>                <td>15414157</td>                <td>Fito</td>              </tr>                          </tbody>          </table>        </div>        <div class=\"separately\">          <div class=\"row mt-n3\">            <div class=\"col-4\">              <p>                Nama Ketua RT                <span class=\"kotak\"> 0</span>                <span class=\"kotak\">9</span>                : Zidan              </p>            </div>            <div class=\"col-2\">&nbsp;</div>            <div class=\"col-4 text-center\">              <p>Mengetahui</p>            </div>            <div class=\"col-2 text-center\">              <p>Cipayung, 05 Mei 2024</p>            </div>          </div>          <div class=\"row\">            <div class=\"col-4\">              <p>                Nama Ketua RW                <span class=\"kotak\">0</span>                <span class=\"kotak\">2</span>                : Jose Rafael              </p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Petugas Register</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Camat Megamendung</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Kepala Desa Cipayung</p>            </div>            <div class=\"col-2 text-center\"><p>Kepala Keluarga</p></div>          </div>          <div class=\"row mt-2\">            <div class=\"col-4\">              <p>Pernyataan</p>              <p>Demikian Formulir ini saya/kami isi dengan sesungguhnya,</p>              <p>Apabila keterangan tersebut tidak sesuai dengan keadaan</p>              <p>                yang sebenarnya, saya bersedia dikenakan sanksi sesuai ketentuan              </p>            </div>            <div class=\"col-2 text-center\">              <img                src=\"http://localhost:3100/signature.png\"                alt=\"Tanda Tangan Petugas\"                width=\"70%\"                class=\"ms-3\"              />            </div>            <div class=\"col-2\">&nbsp;</div>            <div class=\"col-2 text-center\">              <img                src=\"(village-chief-signature)\"                alt=\"Tanda Tangan Kepala Desa\"                width=\"70%\"                class=\"ms-3\"              />            </div>            <div class=\"col-2\">&nbsp;</div>          </div>          <div class=\"row\">            <div class=\"col-4\">              <p>peraturan perundang-undangan yang berlaku</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Nanang Supriyanto</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">..................</p>              <p class=\"\">Nip :</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">H. CACUH BUDIAWAN, SE</p>            </div>            <div class=\"col-2\">              <p class=\"text-center\">Fitto</p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 0, '2024-05-05 12:01:49'),
('1f9c4362-3075-4e99-a684-ab02a49cda2c', '2b76a6b5-6c9e-4dea-90f8-6eec0183530a', '1416416', '202031059', 'Zidan', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN DOMISILI USAHA</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN DOMISILI USAHA</u></h5>        <p class=\"mb-1\">Nomor : 1416416</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row\">          <p class=\"ms-5 ps-5\">Dasar :</p>          <ol>            <li>              Akta Pendirian Nomor 30 tanggal 04 Februari 2022 atas nama              PT. Abadi Jaya            </li>            <li>Tanda Daftar Perusahaan PT. Abadi Jaya</li>            <li>Surat Izin Usaha Perdagangan Menengah PT. Abadi Jaya</li>          </ol>        </div>        <div class=\"row\">          <p class=\"mb-2\">            Yang bertanda tangan di bawah ini Kepala Desa Cipayung Kecamatan            Megamendung Kabupaten Bogor, menerangkan bahwa:          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 35%\">Nama</td>                <td>: Zidan</td>              </tr>              <tr>                <td>Tempat.Tgl. lahir</td>                <td>: Jakarta, 03 Mei 2002</td>              </tr>              <tr>                <td>Jenis Kelamin</td>                <td>: Laki-laki</td>              </tr>              <tr>                <td>Pekerjaan</td>                <td>: Pelajar</td>              </tr>              <tr>                <td>Agama</td>                <td>: Islam</td>              </tr>              <tr>                <td>Kewarganegaraan</td>                <td>: WNI</td>              </tr>              <tr>                <td>Alamat</td>                <td>: Jl Cipayung</td>              </tr>              <tr>                <td>No. KTP</td>                <td>: 202031059</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"my-2\">            Nama tersebut diatas telah membuka / mempunyai Usaha sebagaimana            tersebut dibawah ini :          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 40%\">Nama Perusahaan</td>                <td>: PT. Abadi Jaya</td>              </tr>              <tr>                <td>Jenis Usaha</td>                <td>: Makanan</td>              </tr>              <tr>                <td>Penanggung Jawab</td>                <td>: Fito</td>              </tr>              <tr>                <td>Jumlah Karyawan</td>                <td>: 132</td>              </tr>              <tr>                <td>Alamat Perusahaan</td>                <td>: jl maulana hassanudin</td>              </tr>              <tr>                <td>Status Bangunan</td>                <td>: Kontrak</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"mx-1 my-2\">Surat Keterangan ini berlaku Sampai dengan:</p>          <p class=\"fw-bold\"><u>CATATAN:</u></p>          <ol>            <li>Agar melengkapi perizinan sesuai yang dimiliki</li>            <li>              Menjaga ketertiban, kenyamanan, dan keamanan di lingkungan              kerjanya            </li>            <li>Tunduk atas aturan dan peraturan yang berlaku</li>            <li>Koordinasi dengan RT/RW, aparat Desa setempat</li>            <li>Menyesuaikan dengan adat istiadat dan budaya setempat</li>            <li>Agar memberdayakan Sumber Daya Manusia di Wilayah setempat</li>          </ol>          <p class=\"text-center my-1\">            Demikian Surat Keterangan ini di berikan untuk dapat dipergunakan            sebagaimana mestinya          </p>        </div>        <div class=\"text-center justify-content-center\">          <div class=\"row\">            <div class=\"col-6\">              <p>No.Reg.503 / 598494 / IX / Perek - 2018</p>            </div>            <div class=\"col-6\"><p>Cipayung. 05 Mei 2024</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\"><p>CAMAT MEGAMENDUNG</p></div>            <div class=\"col-6\"><p>KEPALA DESA CIPAYUNG</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <br />              <br />              <br />            </div>            <div class=\"col-6\">              <img                src=\"http://localhost:3100/signature.png\"                alt=\"ttd kades\"                width=\"70%\"              />            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p class=\"fw-bold\"><u> Drs.H.HADIJANA,S.Sos,M.Si </u></p>            </div>            <div class=\"col-6\">              <p class=\"fw-bold\"><u>H.CACUH BUDIAWAN. SE</u></p>            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p>Pembina Tk.I</p>              <p>Nip.196903061990101001</p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-05 12:06:56'),
('2c045793-f07e-4f8b-9f7f-40a261557700', 'bde3a863-a632-4d63-b155-3c2896d3e989', '4156315415', '202031059', 'Zidan', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</u></h5>        <p class=\"mb-1\">Nomor : 4156315415</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row\">          <p class=\"my-3\">            Kepala Desa Cipayung, Kecamatan Megamendung, Kabupaten Bogor, dengan            ini menerangkan :          </p>          <table class=\"ms-5 ps-5 mb-3\">            <tr>              <td>Nama</td>              <td>: Zidan</td>            </tr>            <tr>              <td>Jenis Kelamin</td>              <td>: Laki-laki</td>            </tr>            <tr>              <td>Tempat/Tanggal Lahir</td>              <td>: Jakarta, 03 Mei 2002</td>            </tr>            <tr>              <td>NIK</td>              <td>: 202031059</td>            </tr>            <tr>              <td>Status/Agama</td>              <td>: Anak/Islam</td>            </tr>            <tr>              <td>Pekerjaan</td>              <td>: Pelajar</td>            </tr>            <tr>              <td>Warga Negara</td>              <td>: WNI</td>            </tr>            <tr>              <td>Asal Sekolah</td>              <td>: STM</td>            </tr>            <tr>              <td>Tempat Tinggal</td>              <td>: Jl Cipayung</td>            </tr>          </table>        </div>        <div class=\"row\">          <p class=\"mb-3\">            Bahwa nama tersebut diatas adalah benar saat ini bertempat tinggal            di Desa Cipayung, Kecamatan Megamendung, Kabupaten Bogor dan menurut            keterangan dari RT. setempat bahwa yang bersangkutan saat ini            termasuk Keluarga Kurang Mampu / Keluarga Ekonomi Lemah.          </p>          <p class=\"mb-3\">Surat keterangan ini dibuat untuk :­</p>          <p class=\"text-center mb-5 pb-3 fw-bold\">            MELENGKAPI PERSYARATAN ADMINISTRASI KE            <span class=\"text-uppercase\"> STM </span>          </p>          <p>            Demikian surat keterangan ini di buat dengan sebenarnya untuk dapat            di pergunakan sebagai mana mestinya.          </p>        </div>        <div class=\"row d-flex justify-content-end\">          <div class=\"col-6 text-center\">            <p>Cipayung, 06 Mei 2024</p>            <p>KEPALA DESA CIPAYUNG</p>            <img src=\"http://localhost:3100/signature.png\" alt=\"ttd kades\" width=\"70%\" />            <p class=\"fw-bold\"><u>H. CACUH BUDIAWAN, SE</u></p>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-06 06:38:38');
INSERT INTO `document_results` (`document_result_id`, `document_type_id`, `nomor_surat`, `nik`, `applicant_name`, `content`, `signed`, `created_at`) VALUES
('561618b6-89ff-4988-9e54-d87e8ecc9db6', '2b76a6b5-6c9e-4dea-90f8-6eec0183530a', '1416416', '2020231211', 'Jose Rafael', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN DOMISILI USAHA</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN DOMISILI USAHA</u></h5>        <p class=\"mb-1\">Nomor : 1416416</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row\">          <p class=\"ms-5 ps-5\">Dasar :</p>          <ol>            <li>              Akta Pendirian Nomor 30 tanggal 02 Mei 2024 atas nama              PT. Abadi Jaya            </li>            <li>Tanda Daftar Perusahaan PT. Abadi Jaya</li>            <li>Surat Izin Usaha Perdagangan Menengah PT. Abadi Jaya</li>          </ol>        </div>        <div class=\"row\">          <p class=\"mb-2\">            Yang bertanda tangan di bawah ini Kepala Desa Cipayung Kecamatan            Megamendung Kabupaten Bogor, menerangkan bahwa:          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 35%\">Nama</td>                <td>: Jose Rafael</td>              </tr>              <tr>                <td>Tempat.Tgl. lahir</td>                <td>: Tangerang, 10 November 2004</td>              </tr>              <tr>                <td>Jenis Kelamin</td>                <td>: Laki-laki</td>              </tr>              <tr>                <td>Pekerjaan</td>                <td>: Pelajar</td>              </tr>              <tr>                <td>Agama</td>                <td>: Kristen</td>              </tr>              <tr>                <td>Kewarganegaraan</td>                <td>: WNI</td>              </tr>              <tr>                <td>Alamat</td>                <td>: Jl Maulana Hassanudin</td>              </tr>              <tr>                <td>No. KTP</td>                <td>: 2020231211</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"my-2\">            Nama tersebut diatas telah membuka / mempunyai Usaha sebagaimana            tersebut dibawah ini :          </p>          <div class=\"ms-5 ps-5\">            <table>              <tr>                <td style=\"width: 40%\">Nama Perusahaan</td>                <td>: PT. Abadi Jaya</td>              </tr>              <tr>                <td>Jenis Usaha</td>                <td>: Makanan</td>              </tr>              <tr>                <td>Penanggung Jawab</td>                <td>: Fito</td>              </tr>              <tr>                <td>Jumlah Karyawan</td>                <td>: 1231</td>              </tr>              <tr>                <td>Alamat Perusahaan</td>                <td>: jl bogor raya</td>              </tr>              <tr>                <td>Status Bangunan</td>                <td>: Kontrak</td>              </tr>            </table>          </div>        </div>        <div class=\"row\">          <p class=\"mx-1 my-2\">Surat Keterangan ini berlaku Sampai dengan:</p>          <p class=\"fw-bold\"><u>CATATAN:</u></p>          <ol>            <li>Agar melengkapi perizinan sesuai yang dimiliki</li>            <li>              Menjaga ketertiban, kenyamanan, dan keamanan di lingkungan              kerjanya            </li>            <li>Tunduk atas aturan dan peraturan yang berlaku</li>            <li>Koordinasi dengan RT/RW, aparat Desa setempat</li>            <li>Menyesuaikan dengan adat istiadat dan budaya setempat</li>            <li>Agar memberdayakan Sumber Daya Manusia di Wilayah setempat</li>          </ol>          <p class=\"text-center my-1\">            Demikian Surat Keterangan ini di berikan untuk dapat dipergunakan            sebagaimana mestinya          </p>        </div>        <div class=\"text-center justify-content-center\">          <div class=\"row\">            <div class=\"col-6\">              <p>No.Reg.503 / 598494 / IX / Perek - 2018</p>            </div>            <div class=\"col-6\"><p>Cipayung. 07 Mei 2024</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\"><p>CAMAT MEGAMENDUNG</p></div>            <div class=\"col-6\"><p>KEPALA DESA CIPAYUNG</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <br />              <br />              <br />            </div>            <div class=\"col-6\">              <img                src=\"http://localhost:3100/signature.png\"                alt=\"ttd kades\"                width=\"70%\"              />            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p class=\"fw-bold\"><u> Drs.H.HADIJANA,S.Sos,M.Si </u></p>            </div>            <div class=\"col-6\">              <p class=\"fw-bold\"><u>H.CACUH BUDIAWAN. SE</u></p>            </div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p>Pembina Tk.I</p>              <p>Nip.196903061990101001</p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-07 12:42:47'),
('5995c12b-b0a5-4894-8194-19030c69a46d', '8b963d84-b2a2-43cb-9e9a-e7892905d7f3', '598494', '202031059', 'Zidan', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</u></h5>        <p class=\"mb-1\">Nomor : 1416416</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row mb-3\">          <p>            Berdasarkan Surat Keterangan Rawat Inap dari Rumah Sakit Hermina Pada            Hari Jumat 03 Mei 2024. Perihal Permohonan Surat            Keterangan Keluarga Kurang Mampu Alamat jl Cinangka RT 02/06, Desa            Cipayung, Kecamatan Megamendung, Kabupaten Bogor, Yang di tanda            tangani oleh Ketua RT / RW setempat.          </p>          <p class=\"my-3\">            Atas dasar tersebut di atas dengan ini kami menerangkan bahwa :          </p>          <table class=\"ms-1\">            <tr>              <td>Nama</td>              <td>: Zidan</td>            </tr>            <tr>              <td>Tempat Tanggal Lahir</td>              <td>: Jakarta, 03 Mei 2002</td>            </tr>            <tr>              <td>Jenis Kelamin</td>              <td>: Laki-laki</td>            </tr>            <tr>              <td>Alamat</td>              <td>: Jl Cinangka</td>            </tr>            <tr>              <td>&nbsp;</td>              <td>&nbsp;</td>            </tr>            <tr>              <td>NIK</td>              <td>: 202031059</td>            </tr>          </table>        </div>        <div class=\"row\">          <p>            Berdasarkan data Registrasi kependudukan yang ada di Kantor Desa            Kami, Nama tersebut adalah benar Warga Desa Cipayung, Kecamatan            Megamendung, Kabupaten Bogor, yang tergolong dalam Kategori            <strong>KELUARGA KURANG MAMPU</strong>          </p>          <p>            Surat keterangan ini dibuat sesuai permohonan yang bersangkutan,            Untuk melengkapi persyaratan administrasi keringanan biaya            <strong>              <span class=\"text-uppercase\"> Rumah Sakit Hermina</span></strong            >          </p>        </div>        <p class=\"mb-5\">          Demikian surat keterangan ini di buat dengan sebenarnya untuk dapat di          pergunakan sebagai mana mestinya.        </p>        <div class=\"text-center justify-content-center\">          <div class=\"row\">            <div class=\"col-6\"><p>No Reg : 598494</p></div>            <div class=\"col-6\"><p>Cipayung, 07 Mei 2024</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\"><p>Mengetahui,</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p>CAMAT MEGAMENDUNG</p>              <br />              <br />              <br />              <br />              <p class=\"fw-bold\"><u>Drs.H.HADIJANA,S.Sos,M.Si</u></p>            </div>            <div class=\"col-6\">              <p>KEPALA DESA CIPAYUNG</p>              <br />              <br />              <p class=\"text-muted\">Materai 10.000</p>              <br />              <p class=\"fw-bold\"><u>H. CACUH BUDIAWAN, SE</u></p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 0, '2024-05-07 11:06:08'),
('97b3590a-5273-46f1-b25f-47af1a9f3898', '8b963d84-b2a2-43cb-9e9a-e7892905d7f3', '598494', '202031059', 'Zidan', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU</u></h5>        <p class=\"mb-1\">Nomor : 1416416</p>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row mb-3\">          <p>            Berdasarkan Surat Keterangan Rawat Inap dari Rumah Sakit Hermina Pada            Hari Rabu 01 Mei 2024. Perihal Permohonan Surat            Keterangan Keluarga Kurang Mampu Alamat Jl Cipayung RT 09/02, Desa            Cipayung, Kecamatan Megamendung, Kabupaten Bogor, Yang di tanda            tangani oleh Ketua RT / RW setempat.          </p>          <p class=\"my-3\">            Atas dasar tersebut di atas dengan ini kami menerangkan bahwa :          </p>          <table class=\"ms-1\">            <tr>              <td>Nama</td>              <td>: Zidan</td>            </tr>            <tr>              <td>Tempat Tanggal Lahir</td>              <td>: Jakarta, 03 Mei 2002</td>            </tr>            <tr>              <td>Jenis Kelamin</td>              <td>: Laki-laki</td>            </tr>            <tr>              <td>Alamat</td>              <td>: Jl Cipayung</td>            </tr>            <tr>              <td>&nbsp;</td>              <td>&nbsp;</td>            </tr>            <tr>              <td>NIK</td>              <td>: 202031059</td>            </tr>          </table>        </div>        <div class=\"row\">          <p>            Berdasarkan data Registrasi kependudukan yang ada di Kantor Desa            Kami, Nama tersebut adalah benar Warga Desa Cipayung, Kecamatan            Megamendung, Kabupaten Bogor, yang tergolong dalam Kategori            <strong>KELUARGA KURANG MAMPU</strong>          </p>          <p>            Surat keterangan ini dibuat sesuai permohonan yang bersangkutan,            Untuk melengkapi persyaratan administrasi keringanan biaya            <strong>              <span class=\"text-uppercase\"> Rumah Sakit Hermina</span></strong            >          </p>        </div>        <p class=\"mb-5\">          Demikian surat keterangan ini di buat dengan sebenarnya untuk dapat di          pergunakan sebagai mana mestinya.        </p>        <div class=\"text-center justify-content-center\">          <div class=\"row\">            <div class=\"col-6\"><p>No Reg : 598494</p></div>            <div class=\"col-6\"><p>Cipayung, 06 Mei 2024</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\"><p>Mengetahui,</p></div>          </div>          <div class=\"row\">            <div class=\"col-6\">              <p>CAMAT MEGAMENDUNG</p>              <br />              <br />              <br />              <br />              <p class=\"fw-bold\"><u>Drs.H.HADIJANA,S.Sos,M.Si</u></p>            </div>            <div class=\"col-6\">              <p>KEPALA DESA CIPAYUNG</p>              <br />              <br />              <p class=\"text-muted\">Materai 10.000</p>              <br />              <p class=\"fw-bold\"><u>H. CACUH BUDIAWAN, SE</u></p>            </div>          </div>        </div>      </div>    </main>  </body></html>', 0, '2024-05-06 06:32:40'),
('a11fca9c-15a4-4bce-b8c0-841a26e359f4', 'eb9ddbbf-d970-4c8f-9c87-800a3761a1d6', '-', '3105454', 'Fitto', '<!DOCTYPE html><html>  <head>    <meta charset=\"UTF-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />    <title>SURAT PERNYATAAN KETERANGAN USAHA</title>    <link      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css\"      rel=\"stylesheet\"      integrity=\"sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65\"      crossorigin=\"anonymous\"    />    <link rel=\"stylesheet\" href=\"http://localhost:3100/css/print.css\" />  </head>  <body>    <header class=\"d-flex justify-content-center my-2 me-5\">  <img    src=\"http://localhost:3100/logo_cipayung.png\"    alt=\"logo_desa_cipayung\"    class=\"me-2\"    width=\"10%\"  />  <div class=\"text-center my-auto\">    <h5 class=\"fw-bold\"><u>SURAT PERNYATAAN SKU</u></h5>      </div>  </header>    <main>      <div class=\"container\">        <div class=\"row me-4\">          <p class=\"mb-2\">Yang bertanda tangan dibawah ini saya :</p>          <table>            <tr>              <td>Nama</td>              <td>: Fitto</td>            </tr>            <tr>              <td>Jenis Kelamin</td>              <td>: Laki-laki</td>            </tr>            <tr>              <td>Tempat .Tgl. lahir</td>              <td>: Lampung, 11 Mei 2002</td>            </tr>            <tr>              <td>Pekerjaan</td>              <td>: Ketua RW</td>            </tr>            <tr>              <td>Alamat</td>              <td>: Jl Cipayung</td>            </tr>          </table>          <p class=\"my-4\">            Dengan ini Menyatakan yang sebenarnya sebagai berikut :          </p>          <ol class=\"indent\">            <li class=\"mb-3\">              <p>Bahwa benar pada saat ini saya mempunyai usaha</p>              <table class=\"ms-2\">                <tr>                  <td>Jenis Usaha</td>                  <td>: Makanan</td>                </tr>                <tr>                  <td>Lokasi Usaha</td>                  <td>: Jl Nin Aja Lagi</td>                </tr>              </table>            </li>            <li class=\"my-3 pe-2\">              Bahwa surat pernyataan ini saya buat dengan sebenarnya dalam              keadaan sehat jasmani dan rohani tanpa ada paksaan dari pihak              manapun juga dan menjadi tanggung jawab saya sepenuhnya apabila              terbukti tidak benar.            </li>          </ol>        </div>        <p class=\"my-2 mb-2\">          Demikian surat pernyataan ini saya buat untuk melengkapi persyaratan          pembuatan surat pernyataan Keterangan        </p>        <!-- </div>-->        <div class=\"row text-center\">          <div class=\"col\">            <p>Mengetahui,</p>            <p>Ketua RT 09/02</p>            <br />            <br />            <br />            <p>Zidan</p>          </div>          <div class=\"col\">            <p>Cipayung, 06 Mei 2024</p>            <p>Yang Menyatakan</p>            <br />            <p class=\"text-muted\">Materai 10.000</p>            <br />            <p>Fitto</p>          </div>        </div>      </div>    </main>  </body></html>', 1, '2024-05-06 03:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `document_types`
--

CREATE TABLE `document_types` (
  `document_type_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_type` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `requirements` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_types`
--

INSERT INTO `document_types` (`document_type_id`, `document_type`, `requirements`, `created_at`, `updated_at`) VALUES
('18d1c2d6-05f4-4123-a4fb-beb8f4dbd75b', 'Dokumen Zaws', 'kertas;buku tulis;pena', '2024-02-27 04:08:24', '2024-02-27 04:21:52'),
('2ae5108e-6771-4a2f-ae40-bbf97708c6ca', 'KEDATANGAN', 'Kartu keluarga;Foto Copy Buku Nikah;Pengantar RT;Surat Pindah \r\n;Foto Copy E-Ktp', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('2b76a6b5-6c9e-4dea-90f8-6eec0183530a', 'Surat Keterangan Domisili Usaha', 'Pengantar RT;Kartu keluarga;Foto Copy E-Ktp;Akta Pendirian;Foto Copy PBB;Surat Kepemilikan/Sewa/Kontrak;Izin Lingkungan;Perusahaan baru\r\n', '2024-03-08 08:41:28', '2024-03-08 08:41:28'),
('392d4045-50d8-4721-9ab7-7affe8fee236', 'PERBEDAAN NAMA', 'Foto Copy Ijazah/Akta Kelahiran;Kartu keluarga;Pengantar RT;Foto Copy E-Ktp;Foto Copy Buku Nikah', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('44cf2768-e439-4aa8-8ac9-6b9c10d4472d', 'Dokumen Penting Zaws', 'KTP;Kartu Keluarga', '2024-02-27 06:45:14', '2024-02-27 06:45:14'),
('47b1f95b-9182-472c-8a98-ed306e3fe9af', 'SURUSAHA', NULL, '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('66f48cec-a0b5-4747-97e9-260032b9e7ba', 'Surat keterangan kelor', 'sehat;keren', '2024-03-27 08:20:56', '2024-03-27 08:20:56'),
('712886fb-eee0-425c-ac01-bc02820bcb84', 'BELUM NIKAH', 'Kartu keluarga;Foto Copy E-Ktp;Pengantar RT', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('81c1e8ed-c151-422f-9c06-1c3a5485308b', 'KEMATIAN', 'Foto Copy E-Ktp;Surat Kematian dari Rumah sakit (Jika meninggalnya di Rumah Sakit);Data Yang Meninggal;Kartu keluarga;Pengantar RT', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('8b963d84-b2a2-43cb-9e9a-e7892905d7f3', 'Surat Keterangan Keluarga Miskin (Rumah Sakit)', 'Pengantar RT;Kartu keluarga;Foto Copy E-Ktp;Surat Keterangan dari Rumah Sakit untuk Rumah Sakit\r\n\r\n\r\n', '2024-04-09 08:48:54', '2024-04-09 08:48:54'),
('9b59c091-ee4a-4fe8-b6e2-759eb54ad944', 'NUMPANG NIKAH (NA)', 'Foto Copy E-Ktp Kedua Calon;Foto Copy Ijazah/Akta Kelahiran;Pengantar RT;Foto Copy E-Ktp Kedua Orang Tua Calon;Foto Copy Akta Cerai/Surat Kematian (Jika Bersetatus Cerai/Kawin);Kartu keluarga Kedua Calon', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('9ded4981-d68f-4002-b38e-39f9e4199c16', 'DOMISILI/SKTTS', 'Kartu keluarga;Pengantar RT;Foto Copy E-Ktp', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('a2adf727-4c94-4b4b-9607-2cee28c39c9c', 'KELAHIRAN', 'Kartu keluarga;Kelahiran Bidan / Paraji;Foto Copy E-Ktp;Pengantar RT', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('a64dd61c-3887-4fef-9960-98210ed4c694', 'PENGANTAR KARTU TANDA PENDUDUK (KTP)', 'Kartu keluarga;Foto Copy Buku Nikah\r\n;Foto Copy Ijazah/Akta Kelahiran;Pengantar RT;Foto Copy E-Ktp', '2024-02-21 21:22:48', '2024-02-21 21:22:48'),
('a73d36c4-aca7-401a-a0e9-984a5f9af356', 'BELUM BEKERJA', 'Pengantar RT;Foto Copy E-Ktp;Kartu keluarga', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('ab1aa1d3-acfb-4f5a-9f8d-69f7551249a9', 'SURAT KETERANGAN USAHA', 'Kartu keluarga;foto usaha yang sedang melayani;Pengantar RT;Surat Pernyataan Dari Desa;Foto Copy E-Ktp', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('bde3a863-a632-4d63-b155-3c2896d3e989', 'Surat Keterangan Keluarga Miskin (Sekolah)', 'Pengantar RT;Kartu keluarga;Foto Copy E-Ktp;Surat Keterangan dari Rumah Sakit untuk Rumah Sakit\r\n\r\n\r\n', '2024-04-09 18:17:55', '2024-04-09 18:17:55'),
('bf824561-3e5d-4498-a4d4-36c0994c434d', 'SURAT KETERANGAN CATATAN KEPOLISIAN', 'Foto Copy E-Ktp;Pengantar RT;Kartu keluarga', '2024-02-21 21:29:45', '2024-02-21 21:29:45'),
('cde25fb3-ad23-463c-863a-a6f068e3bf6b', 'Surat KK F101', 'Kartu keluarga;Kelahiran Bidan / Paraji;Pengantar RT;Foto Copy Buku Nikah\r\n;Foto Copy E-Ktp', '2024-05-01 00:49:28', '2024-05-01 00:49:28'),
('df3efbf7-b3c9-4b5b-8eef-5a3117be8ce1', 'PENGANTAR PINDAH', 'Kartu keluarga 3 Lembar;Foto Copy E-Ktp 3 Lembar;Alamat Pindah;Pengantar RT', '2024-02-21 21:25:30', '2024-02-21 21:25:30'),
('eb9ddbbf-d970-4c8f-9c87-800a3761a1d6', 'Surat Pernyataan SKU', NULL, '2024-04-06 11:12:07', '2024-04-06 11:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `dusun`
--

CREATE TABLE `dusun` (
  `dusun_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nama_dusun` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `kepala_dusun_nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jumlah_warga` int NOT NULL,
  `luas_wilayah` int NOT NULL,
  `keterangan` text COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` date NOT NULL,
  `update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dusun`
--

INSERT INTO `dusun` (`dusun_id`, `nama_dusun`, `kepala_dusun_nik`, `jumlah_warga`, `luas_wilayah`, `keterangan`, `create_at`, `update_at`) VALUES
('1892c182-7fdb-482d-97c8-f753b48713bf', 'Cipayung', '31162002', 13691, 78600, '-', '2024-05-05', '2024-05-07'),
('a5b986cc-91bd-4c98-a97a-7da3035e3ac7', 'Cinangka', '3201261903610001', 12565, 14621, '-', '2024-05-05', '2024-05-06');

-- --------------------------------------------------------

--
-- Table structure for table `families`
--

CREATE TABLE `families` (
  `no_kk` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rt_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rw_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dusun_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `kode_pos` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `approved` tinyint(1) DEFAULT '1',
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `families`
--

INSERT INTO `families` (`no_kk`, `alamat`, `rt_id`, `rw_id`, `dusun_id`, `kode_pos`, `approved`, `create_at`, `update_at`) VALUES
('324505550552', 'Jl Cipayung', '158b9232-37c5-4c4a-aaf9-8535fb119ae5', '6db56915-8288-41d1-849c-eaa4e14098bb', '1892c182-7fdb-482d-97c8-f753b48713bf', '11422', 1, '2024-05-07', '2024-05-07'),
('3255544789891', 'jl Cinangka', '0fea3674-6dbe-4661-a2ac-737009ec0f80', '85b02dd2-6799-4a23-9bff-e11b1f929ee5', 'a5b986cc-91bd-4c98-a97a-7da3035e3ac7', '11543', 1, '2024-05-07', '2024-05-07'),
('326997850001', 'Jl Bogor raya', 'e0b210a6-4261-4970-bffa-a61decb55526', '6db56915-8288-41d1-849c-eaa4e14098bb', '1892c182-7fdb-482d-97c8-f753b48713bf', '15415', 1, '2024-05-07', '2024-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `families_member`
--

CREATE TABLE `families_member` (
  `no_kk` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status_keluarga` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `families_member`
--

INSERT INTO `families_member` (`no_kk`, `nik`, `status_keluarga`) VALUES
('3255544789891', '202031059', 'Anak'),
('324505550552', '3105454', 'Anak'),
('326997850001', '31162002', 'Kepala Keluarga'),
('326997850001', '312258412', 'Anak'),
('3255544789891', '3201260103650002', 'Kepala Keluarga'),
('324505550552', '3201260903800001', 'Kepala Keluarga'),
('3255544789891', '3201261402700003', 'Anak'),
('324505550552', '3201261903610001', 'Anak'),
('3255544789891', '3201262404690002', 'Anak');

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alamat_sebelumnya` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tempat_lahir` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `agama` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_pernikahan` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pendidikan_terakhir` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `golongan_darah` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pekerjaan` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kewarganegaraan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'WNI',
  `no_paspor` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_berakhir_paspor` date DEFAULT NULL,
  `no_akta_lahir` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `akta_lahir` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `no_akta_nikah` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `akta_nikah` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_perkawinan` date DEFAULT NULL,
  `no_akta_cerai` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `akta_cerai` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_perceraian` date DEFAULT NULL,
  `penyandang_cacat` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kelainan_fisik_mental` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nik_ayah` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nik_ibu` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_ayah` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_ibu` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`nik`, `nama`, `alamat_sebelumnya`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `agama`, `status_pernikahan`, `pendidikan_terakhir`, `golongan_darah`, `pekerjaan`, `kewarganegaraan`, `no_paspor`, `tanggal_berakhir_paspor`, `no_akta_lahir`, `akta_lahir`, `no_akta_nikah`, `akta_nikah`, `tanggal_perkawinan`, `no_akta_cerai`, `akta_cerai`, `tanggal_perceraian`, `penyandang_cacat`, `kelainan_fisik_mental`, `nik_ayah`, `nik_ibu`, `nama_ayah`, `nama_ibu`, `create_at`, `update_at`) VALUES
('202031059', 'Zidan', NULL, 'Jakarta', '2002-05-03', 'Laki-laki', 'Islam', 'Belum kawin', 'Akademi / Diploma III / Sarjana Muda', '-', 'Pelajar', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '315648646841', '31415814536', 'Budi', 'Siti', NULL, '2024-05-06'),
('3105454', 'Fitto', NULL, 'Lampung', '2002-05-11', 'Laki-laki', 'Islam', 'Belum kawin', 'Akademi / Diploma III / Sarjana Muda', '-', 'Ketua RW', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '4561516581', '3121321312', 'Budi', 'Sati', NULL, '2024-05-06'),
('31162002', 'Jose Rafael', 'jl maulana hassanudin', 'Tangerang', '2002-11-16', 'Laki-laki', 'Katolik', 'Kawin', 'Akademi / Diploma III / Sarjana Muda', '-', 'Pelajar', 'WNI', NULL, NULL, 'Tidak Ada', NULL, '1234523', 'Tidak Ada', '2023-07-16', NULL, 'Ada', NULL, 'Tidak Ada', 'Tidak Ada', '3156045201', '13205156335', 'Budi', 'Sati', NULL, '2024-05-07'),
('312258412', 'Jeje', 'jl maulana hassanudin', 'Tangerang', '2000-04-16', 'Perempuan', 'Katolik', 'Kawin', 'Tidak / Belum Sekolah', '-', 'Pelajar', 'WNI', NULL, NULL, 'Ada', '232423', '1234523', 'Ada', '2023-07-16', NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '3156045201', '13205156335', 'Budi', 'Sati', NULL, NULL),
('3201260103650002', 'Firmansyah Thalar', NULL, 'bogor', '1976-04-16', 'Laki-laki', 'Islam', 'Belum kawin', 'Tidak / Belum Sekolah', '-', 'Kepala Dusun', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '315657515522', '31253465435', 'Budi', 'Sati', NULL, '2024-05-06'),
('3201260903800001', 'Suripto', NULL, 'Cipayung', '1974-05-19', 'Laki-laki', 'Islam', 'Belum kawin', 'Diploma IV / Strata I', '-', 'Ketua RT', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '4561516581', '456145313', 'Budi', 'Sati', NULL, '2024-05-06'),
('3201261402700003', 'Muksin', NULL, 'bogor', '1975-11-10', 'Laki-laki', 'Islam', 'Belum kawin', 'Diploma IV / Strata I', '-', 'Kepala Dusun', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '315657515522', '31253465435', 'Budi', 'Sati', NULL, NULL),
('3201261903610001', ' Suparman Saepudin', NULL, 'Cipayung', '1974-06-19', 'Laki-laki', 'Islam', 'Belum kawin', 'Tidak / Belum Sekolah', '-', 'Kepala Dusun', 'WNI', '', NULL, 'Tidak Ada', '-', NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '54153610351', '315131531', 'Budi', 'Siti', NULL, NULL),
('3201262404690002', 'Ugih', 'jl maulana hassanudin', 'Bogor', '1973-11-10', 'Laki-laki', 'Islam', 'Belum kawin', 'Akademi / Diploma III / Sarjana Muda', '-', 'Ketua RT', 'WNI', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, NULL, 'Tidak Ada', NULL, 'Tidak Ada', 'Tidak Ada', '32222453434', '32689789676', 'Budi', 'Sati', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rt`
--

CREATE TABLE `rt` (
  `rt_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `no_rt` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ketua_rt_nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jumlah_keluarga` int NOT NULL,
  `jumlah_warga` int NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rw_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` date NOT NULL,
  `update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rt`
--

INSERT INTO `rt` (`rt_id`, `no_rt`, `ketua_rt_nik`, `jumlah_keluarga`, `jumlah_warga`, `keterangan`, `rw_id`, `create_at`, `update_at`) VALUES
('0db39d88-c9d2-4623-bf72-951a18496a62', '08', '3105454', 23, 143, '-', '9d90bbb3-8a63-4d6d-b292-709ecc2bc1e2', '2024-05-07', '2024-05-07'),
('0fea3674-6dbe-4661-a2ac-737009ec0f80', '02', '3201261903610001', 32, 145, '-', '85b02dd2-6799-4a23-9bff-e11b1f929ee5', '2024-05-07', '2024-05-07'),
('158b9232-37c5-4c4a-aaf9-8535fb119ae5', '04', '202031059', 32, 123, '-', '6db56915-8288-41d1-849c-eaa4e14098bb', '2024-05-06', '2024-05-07'),
('6dbe0308-f0ac-4069-a363-8b0af203a6ca', '03', '3201260103650002', 40, 123, '-', '9f26f21b-d53d-4b8c-9f85-69bb56bc1a45', '2024-05-06', '2024-05-06'),
('70266968-7e7f-4d77-8ccc-1473c51eb82c', '05', '31162002', 42, 134, '-', '9f26f21b-d53d-4b8c-9f85-69bb56bc1a45', '2024-05-07', '2024-05-07'),
('a11eaa97-0a82-4e89-a910-9862a3af6aea', '07', '3201262404690002', 37, 143, '-', '85b02dd2-6799-4a23-9bff-e11b1f929ee5', '2024-05-06', '2024-05-07'),
('c6ff1cea-daaf-4d8d-957a-94a1740afab3', '09', '202031059', 33, 102, '-', '9d90bbb3-8a63-4d6d-b292-709ecc2bc1e2', '2024-05-06', '2024-05-06'),
('e0b210a6-4261-4970-bffa-a61decb55526', '01', '3201261402700003', 42, 153, '-', '6db56915-8288-41d1-849c-eaa4e14098bb', '2024-05-07', '2024-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `rw`
--

CREATE TABLE `rw` (
  `rw_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `no_rw` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ketua_rw_nik` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jumlah_keluarga` int NOT NULL,
  `jumlah_warga` int NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dusun_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_at` date NOT NULL,
  `update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rw`
--

INSERT INTO `rw` (`rw_id`, `no_rw`, `ketua_rw_nik`, `jumlah_keluarga`, `jumlah_warga`, `keterangan`, `dusun_id`, `create_at`, `update_at`) VALUES
('6db56915-8288-41d1-849c-eaa4e14098bb', '05', '3105454', 152, 543, '-', '1892c182-7fdb-482d-97c8-f753b48713bf', '2024-05-06', '2024-05-06'),
('85b02dd2-6799-4a23-9bff-e11b1f929ee5', '06', '3201260903800001', 140, 467, '-', 'a5b986cc-91bd-4c98-a97a-7da3035e3ac7', '2024-05-06', '2024-05-06'),
('9d90bbb3-8a63-4d6d-b292-709ecc2bc1e2', '02', '202031059', 123, 123, '-', '1892c182-7fdb-482d-97c8-f753b48713bf', '2024-05-06', '2024-05-06'),
('9f26f21b-d53d-4b8c-9f85-69bb56bc1a45', '01', '3105454', 121, 523, '-', 'a5b986cc-91bd-4c98-a97a-7da3035e3ac7', '2024-05-06', '2024-05-06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sess` json NOT NULL,
  `expired` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `sess`, `expired`) VALUES
('Km4QOu0-qzSumgEj-gSdNxRez0-JqNFK', '{\"user\": {\"role\": \"admin\", \"userId\": \"9bcd7a44-dd28-4580-b948-7d1c20f090d1\", \"username\": \"admin\"}, \"cookie\": {\"path\": \"/\", \"secure\": false, \"expires\": \"2024-05-07T13:02:25.731Z\", \"httpOnly\": true, \"originalMaxAge\": 7200000}}', '2024-05-07 13:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `tes`
--

CREATE TABLE `tes` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `judul` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `content` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tes`
--

INSERT INTO `tes` (`id`, `judul`, `content`) VALUES
('437fd5fd-09a8-11ef-9641-b42e9952a2d9', 'tesaja', '{\"isi\": {\"tes\": \"asade\", \"apakek\": \"anjayani\"}, \"title\": \"ini dari title\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(123) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('9bcd7a44-dd28-4580-b948-7d1c20f090d1', 'admin', '', '$2a$10$34xOS4w3YFoJzmfjrQfPbeRvPlOO73LAwkuzpTHxcLFx.IakS3FNO', 'admin', '2024-02-01 02:13:29', '2024-02-01 02:13:29');

-- --------------------------------------------------------

--
-- Table structure for table `village_chiefs`
--

CREATE TABLE `village_chiefs` (
  `village_chief_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `signature` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL,
  `deleted_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `village_chiefs`
--

INSERT INTO `village_chiefs` (`village_chief_id`, `full_name`, `signature`, `is_active`, `created_at`, `deleted_at`) VALUES
('435164131351', 'zeko leafar', 'http://localhost:3100/signature.png', 1, '2024-04-07 12:44:53', '2024-04-07 12:44:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `document_input_fields`
--
ALTER TABLE `document_input_fields`
  ADD PRIMARY KEY (`document_input_field_id`);

--
-- Indexes for table `document_results`
--
ALTER TABLE `document_results`
  ADD PRIMARY KEY (`document_result_id`),
  ADD KEY `document_type_id` (`document_type_id`);

--
-- Indexes for table `document_types`
--
ALTER TABLE `document_types`
  ADD PRIMARY KEY (`document_type_id`);

--
-- Indexes for table `dusun`
--
ALTER TABLE `dusun`
  ADD PRIMARY KEY (`dusun_id`);

--
-- Indexes for table `families`
--
ALTER TABLE `families`
  ADD PRIMARY KEY (`no_kk`),
  ADD KEY `families_ibfk_1` (`rt_id`),
  ADD KEY `families_ibfk_2` (`rw_id`),
  ADD KEY `families_ibfk_3` (`dusun_id`);

--
-- Indexes for table `families_member`
--
ALTER TABLE `families_member`
  ADD UNIQUE KEY `nik_2` (`nik`),
  ADD KEY `no_kk` (`no_kk`),
  ADD KEY `nik` (`nik`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`nik`);

--
-- Indexes for table `rt`
--
ALTER TABLE `rt`
  ADD PRIMARY KEY (`rt_id`),
  ADD KEY `id_rw` (`rw_id`);

--
-- Indexes for table `rw`
--
ALTER TABLE `rw`
  ADD PRIMARY KEY (`rw_id`),
  ADD KEY `id_dusun` (`dusun_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `tes`
--
ALTER TABLE `tes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `village_chiefs`
--
ALTER TABLE `village_chiefs`
  ADD PRIMARY KEY (`village_chief_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `document_results`
--
ALTER TABLE `document_results`
  ADD CONSTRAINT `document_results_ibfk_1` FOREIGN KEY (`document_type_id`) REFERENCES `document_types` (`document_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `families`
--
ALTER TABLE `families`
  ADD CONSTRAINT `families_ibfk_1` FOREIGN KEY (`rt_id`) REFERENCES `rt` (`rt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `families_ibfk_2` FOREIGN KEY (`rw_id`) REFERENCES `rt` (`rw_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `families_ibfk_3` FOREIGN KEY (`dusun_id`) REFERENCES `rw` (`dusun_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `families_member`
--
ALTER TABLE `families_member`
  ADD CONSTRAINT `families_member_ibfk_1` FOREIGN KEY (`nik`) REFERENCES `residents` (`nik`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `families_member_ibfk_2` FOREIGN KEY (`no_kk`) REFERENCES `families` (`no_kk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rt`
--
ALTER TABLE `rt`
  ADD CONSTRAINT `rt_ibfk_2` FOREIGN KEY (`rw_id`) REFERENCES `rw` (`rw_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `rw`
--
ALTER TABLE `rw`
  ADD CONSTRAINT `rw_ibfk_1` FOREIGN KEY (`dusun_id`) REFERENCES `dusun` (`dusun_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
