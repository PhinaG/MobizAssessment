import fs from 'fs';
import { Employee } from '../routes/employees';
import path from 'path';

//New file path to the writable /tmp directory 
const tmpDir = '/tmp'; 
const filePath = path.join(tmpDir, 'employees.json');

export const readFile = (filePath: string): Promise<Employee[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
};


export const writeFile = (filePath: string, data: Employee[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

//Check if a dir exists and if not create one, then write to the file
const ensureDirExists = async (dir:string): Promise<void> => { 
    try { 
        await fs.promises.access(dir); 
    } catch { 
        await fs.promises.mkdir(dir, { recursive: true }); 
    } 
}; 

// Function to initialize data 
export const initializeData = async (): Promise<void> => { 
    const initialDataPath = path.join(__dirname, '../data/employees.json'); 
    // Check if the directory exists and create one if it doesn't
    await ensureDirExists(tmpDir);     
    try { 
        await fs.promises.access(filePath); 
    } catch { 
        const data = await fs.promises.readFile(initialDataPath, 'utf-8'); 
        await fs.promises.writeFile(filePath, data); 
    } 
};



