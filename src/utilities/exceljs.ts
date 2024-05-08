// import exceljs from "exceljs";

// export function readExcel(filePath: string): Promise<Array<Object>> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const workbook = new exceljs.Workbook();

//       await workbook.xlsx.readFile(filePath);

//       const sheet = workbook.worksheets[0];

//       let columnsName: Array<string> = [];
//       let data: Array<Object> = [];

//       sheet.eachRow((row, rowNumber) => {
//         let dataInRow: { [key: string]: any } = {};

//         row.eachCell((cell, columnNumber) => {
//           if (rowNumber == 1) {
//             columnsName.push(String(cell.value));
//             return;
//           }

//           dataInRow[columnsName[columnNumber - 1]] = cell.value;
//         });

//         if (rowNumber > 1) data.push(dataInRow);
//       });

//       return resolve(data);
//     } catch (error: any) {
//       switch (error?.error) {
//         default:
//           return reject({ error: "unknown-error-occured" });
//       }
//     }
//   });
// }
