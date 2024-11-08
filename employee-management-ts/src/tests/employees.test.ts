import request from 'supertest';
import express from 'express';
import fs from 'fs';
import employeeRoutes from '../routes/employees';

jest.mock('fs');

const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);

interface Employee {
  id: string;
  firstName: string;
  [key: string]: any;
}

describe('Employee CRUD Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read all employees', async () => {
    const mockData: Employee[] = [{ id: '1', firstName: 'Test Employee' }];
    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(JSON.stringify(mockData)));
    });

    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  it('should get an employee by ID', async () => {
    const mockData: Employee[] = [{ id: '1', firstName: 'Test Employee' }];
    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(JSON.stringify(mockData)));
    });

    const res = await request(app).get('/employees/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData[0]);
  });

  it('should add a new employee', async () => {
    const initialData: Employee[] = [{ id: '1', firstName: 'Test Employee' }];
    const newEmployee: Employee = { id: '2', firstName: 'Test Employee 2' };
   

    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(JSON.stringify(initialData)));
    });

    (fs.writeFile as unknown as jest.Mock).mockImplementation((path, data, callback) => {
      callback(null);
    });

    const res = await request(app).post('/employees').send(newEmployee);
    expect(res.status).toBe(200);
  });

  it('should update an existing employee', async () => {
    const initialData: Employee[] = [{ id: '1', firstName: 'Test Employee' }];
    const updatedEmployee: Employee = { id: '1', firstName: 'Test Employee 2' };


    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(JSON.stringify(initialData)));
    });

    (fs.writeFile as unknown as jest.Mock).mockImplementation((path, data, callback) => {
      callback(null);
    });

    const res = await request(app).put('/employees/1').send(updatedEmployee);
    expect(res.status).toBe(200);
    });


  it('should delete an employee', async () => {
    const initialData: Employee[] = [{ id: '1', firstName: 'Test Employee' }];

    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(JSON.stringify(initialData)));
    });

    (fs.writeFile as unknown as jest.Mock).mockImplementation((path, data, callback) => {
      callback(null);
    });

    const res = await request(app).delete('/employees/1');
    expect(res.status).toBe(200);
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify([]),
      expect.any(Function)
    );
  });
});
