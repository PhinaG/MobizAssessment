// ECHO is on.

import fs from 'fs';

export const readFile = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
};

