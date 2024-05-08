import { Request, Response } from "express";
import knex from "../../utilities/knex";
import moment from "moment";
import { getResidentFull } from "../../repository/resident-repository";
// import { getResidentMain } from "../../repository/resident-repository";

// export const getAccountById = async (request: Request, response: Response) => {
//   const getUser = await knex("users")
//     .where("user_id", request.session.user.userId)
//     .then((res) => {
//       return res[0]
//     })

//   return response.render("pages/home/account", { user: getUser })
// }
export const residentAdd = (request: Request, response: Response) => {
  return response.render("pages/data/add/resident");
};

export const residentUpdate = async (request: Request, response: Response) => {
  try {
    const nik: string = request.params.nik;

    const residentMore = await getResidentFull(nik).then((result: any) => {
      return result.map((resident: any) => {
        delete resident.update_at;
        return {
          ...resident,
          tanggal_lahir:
            resident.tanggal_lahir !== null
              ? moment(resident.tanggal_lahir).format("yyyy-MM-DD")
              : "",
          tanggal_berakhir_paspor:
            resident.tanggal_berakhir_paspor !== null
              ? moment(resident.tanggal_berakhir_paspor).format("yyyy-MM-DD")
              : "",
          tanggal_perceraian:
            resident.tanggal_perceraian !== null
              ? moment(resident.tanggal_perceraian).format("yyyy-MM-DD")
              : "",
          tanggal_perkawinan:
            resident.tanggal_perkawinan !== null
              ? moment(resident.tanggal_perkawinan).format("yyyy-MM-DD")
              : "",
          update_at: moment(resident.update_at).format("dddd, DD MMMM YYYY"),
        };
      });
    });

    console.log("resident:", residentMore[0]);
    return response.render("pages/data/edit/resident", residentMore[0]);
  } catch (error) {
    //console.log(error);
    return response.redirect("/error/404");
  }
};
// export const getResidentByNik = async (request: Request, response: Response) => {
//   const getResident = await knex("residents")
//     .where("nik", request.params.nik)
//     .then((result: any) => {
//       return result.map((document: any) => {
//         return {
//           ...document,
//           tanggal_lahir: moment(document.tanggal_lahir).format("yyyy-MM-DD"),
//         }
//       })
//     })
//   return response.render("pages/data/resident", { resident: getResident[0] })
// }
export const getresidentAll = async (request: Request, response: Response) => {
  const resident = await knex("residents")
    .select("nik", "nama", "tanggal_lahir", "jenis_kelamin", "pekerjaan")
    .then((result: any) => {
      return result.map((document: any) => {
        return {
          ...document,
          tanggal_lahir: moment(document.tanggal_lahir).format("DD MMMM YYYY"),
        };
      });
    });
  // console.log(resident);
  return response.render("pages/data/index/list-resident", {
    resident: resident,
  });
};
