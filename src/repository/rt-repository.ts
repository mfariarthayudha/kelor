import knex from "../utilities/knex";

export const getAddressByRtId = async (rt_id: string) => {
  const dusun = await knex("rt")
    .select("dusun.nama_dusun", "rw.no_rw", "rt.no_rt")
    .innerJoin("rw", "rt.rw_id", "rw.rw_id")
    .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
    .where("rt_id", rt_id)
    .then((res) => {
      return res[0];
    });
  return dusun;
};
