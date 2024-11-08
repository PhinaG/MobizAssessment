// ECHO is on.
import express, { Request, Response } from 'express';

import {readFile, writeFile} from '../Utils/fileOperations'
import path from 'path';
import {v4} from 'uuid'; 


const router = express.Router();

//const employeesFilePath = path.join(__dirname, '../data/employees.json'); //realised this is not working in deployed version as dir is read-only

const employeesFilePath = path.join('/tmp', 'employees.json');

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employmentType: string;
  dateJoined: string;
  [key: string]: any;
}

//Move to a Utils dir
// const readFile = (filePath: string): Promise<Employee[]> => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) reject(err);
//       resolve(JSON.parse(data.toString()));
//     });
//   });
// };

// const writeFile = (filePath: string, data: Employee[]): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, JSON.stringify(data), (err) => {
//       if (err) reject(err);
//       resolve();
//     });
//   });
// };

const currentDatetime = () =>{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}`;
    return dateTimeString
}

// Read all employees
router.get('/', async (req: Request, res: Response) => {
  try {
    const employees = await readFile(employeesFilePath);
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get an employee by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const {id } = req.params;
    let employees = await readFile(employeesFilePath); 
    const index = employees.findIndex(emp => emp.id == id);
    
    if (index !== -1) {
        res.json(employees[index]);
    } 
    else { 
        res.status(404).send({ message: 'Employee not found' }); 
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a new employee
router.post('/', async (req: Request, res: Response) => {
  try {
    let newEmployee = req.body;
    let employees = await readFile(employeesFilePath);
    newEmployee.id = v4(); // Add an Guid to the new employee
    
    if(newEmployee.dateJoined == null || newEmployee.dateJoined == "" || newEmployee.dateJoined == ''){
        newEmployee.dateJoined = currentDatetime();
    }
    newEmployee.lastUpdatedTime = currentDatetime();
    employees.push(newEmployee);
    await writeFile(employeesFilePath, employees);
    res.json(newEmployee);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an exisitng employee
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updatedEmployee = req.body;    
    updatedEmployee.lastUpdatedTime = currentDatetime();
    let employees = await readFile(employeesFilePath);
    const index = employees.findIndex(emp => emp.id == id);
    
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updatedEmployee };
        await writeFile(employeesFilePath, employees); 
        res.json(employees[index]);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete employee
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let employees = await readFile(employeesFilePath);
    const index = employees.findIndex(emp => emp.id == id);

    if (index !== -1) {
      employees = employees.filter(emp => emp.id != id);
      await writeFile(employeesFilePath, employees);
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;

