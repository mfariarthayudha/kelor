import knex from "../utilities/knex";
import moment from "moment";

moment().local();
moment.locale("id");
interface Period {
  start?: string;
  end?: string;
}

function getPeriodRange(
  periodType: "today" | "monthly" | "annual" | "all",
  format: string
): Period {
  const now = moment();
  switch (periodType) {
    case "today":
      return {
        start: now.startOf("day").format(format),
        end: now.endOf("day").format(format),
      };
    case "monthly":
      return {
        start: now.startOf("month").format(format),
        end: now.endOf("month").format(format),
      };
    case "annual":
      return {
        start: now.startOf("year").format(format),
        end: now.endOf("year").format(format),
      };
    case "all":
    default:
      return {};
  }
}

async function countRecordsForPeriod(
  tableName: string,
  columnName: string,
  periodType: "today" | "monthly" | "annual" | "all",
  format = "YYYY-MM-DD"
): Promise<number> {
  const { start, end } = getPeriodRange(periodType, format);

  const query = knex(tableName).count(`${columnName} as count`);

  if (start && end) {
    query.whereBetween("create_at", [start, end]);
  }

  const [{ count }] = await query;
  return Number(count);
}
export const getDashboardCounts = async (
  periodType: "today" | "monthly" | "annual" | "all"
): Promise<Record<string, number>> => {
  const [dusunCount, rwCount, rtCount, residentCount, documentCount] =
    await Promise.all([
      countRecordsForPeriod("dusun", "dusun_id", periodType),
      countRecordsForPeriod("rw", "rw_id", periodType),
      countRecordsForPeriod("rt", "rt_id", periodType),
      countRecordsForPeriod("residents", "nik", periodType),
      countRecordsForPeriod(
        "document_results",
        "document_result_id",
        periodType,
        "YYYY-MM-DD HH:mm:ss"
      ),
    ]);

  return {
    dusun: dusunCount,
    rw: rwCount,
    rt: rtCount,
    residents: residentCount,
    documents: documentCount,
  };
};
