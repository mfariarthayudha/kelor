import knex from "../utilities/knex";
import family from "../interface/family";

export const getIdAndAlamatByNoKK = async (no_kk: string) => {
  const id_alamat = await knex("families")
    .select(
      "families.alamat",
      "families.rt_id",
      "families.rw_id",
      "families.dusun_id",
      "dusun.nama_dusun",
      "rw.no_rw",
      "rt.no_rt"
    )
    .innerJoin("dusun", "families.dusun_id", "dusun.dusun_id")
    .innerJoin("rw", "families.rw_id", "rw.rw_id")
    .innerJoin("rt", "families.rt_id", "rt.rt_id")
    .where({ no_kk: no_kk })
    .then((res) => {
      return res[0];
    });

  return id_alamat;
};

export const getIdAlamatByNoKK = async (no_kk: string) => {
  const alamat = await knex("families")
    .select(
      "families.alamat",
      "families.rt_id",
      "families.rw_id",
      "families.dusun_id"
    )
    .where({ no_kk: no_kk })
    .then((res) => {
      console.log(res);
      return res[0];
    });

  return alamat;
};
export const insertFamily = async (
  obj: family,
  approved: number = 1,
  trx: any = null
) => {
  const query = knex("families").insert({
    no_kk: obj.no_kk,
    alamat: obj.alamat,
    rt_id: obj.rt,
    rw_id: obj.rw,
    kode_pos: obj.kode_pos,
    dusun_id: obj.dusun,
    approved: approved,
    create_at: obj.create_at,
    update_at: obj.update_at,
  });
  if (trx) {
    return await query.transacting(trx);
  } else {
    return await query;
  }
};
