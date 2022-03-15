import * as fs from "fs";
import * as papaparse from "papaparse";

// load csv file from disk
async function loadFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export const csvToArrays = async (
  filePath: string
): Promise<Record<string, any>[]> => {
  const csv = await loadFile(filePath);
  const [columnHeaders, ...data] = await papaparse.parse(csv).data.slice(2);

  let transposedColumns: Record<string, any>[] = [];

  data.forEach((row) => {
    row.forEach((cell, columnIndex) => {
      if (!!cell) {
        if (!transposedColumns[columnIndex + 1]) {
          transposedColumns[columnIndex + 1] = [];
        }

        const cellObject = {
          model: columnHeaders[columnIndex],
          value: cell,
        };

        transposedColumns[columnIndex + 1].push(cellObject);
      }
    });
  });

  return transposedColumns;
};
