// ECHO is on.

import { Employee } from '../routes/employees';
import { readFile, writeFile} from '../Utils/fileOperations';
import fs from 'fs';

// Mock the 'fs' module
jest.mock('fs');

describe('readFile', () => {
  const filePath = './mockPath.json';
  const mockData = JSON.stringify({ id: 1, firstName: 'Test Employee' });
  
  const mockUpdatedData: Employee[] = [
  { id: 1, firstName: 'Test', lastName: "Employee", email:"employee@exasmple.com", employmentType: "permanent", dateJoined: new Date().toDateString()},
  {id: 2, firstName: 'Test', lastName: "Employee 2", email:"employee2@exasmple.com", employmentType: "intern", dateJoined: new Date().toDateString()}
  ];

  it('should read a file and parse JSON', async () => {
    

    // Mock fs.readFile
    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(null, Buffer.from(mockData));
    });

    const result = await readFile(filePath);

    expect(result).toEqual({ id: 1, firstName: 'Test Employee' });
  });

  it('should throw an error when the file cannot be read', async () => {
    const filePath = './mockPath.json';

    // Mock fs.readFile to throw an error
    (fs.readFile as unknown as jest.Mock).mockImplementation((path, callback) => {
      callback(new Error('File read error'), null);
    });

    await expect(readFile(filePath)).rejects.toThrow('File read error');
  });

  it('should write employee list to a file', async () => { 
    (fs.writeFile as unknown as jest.Mock).mockImplementation((path, data, callback) => { 
      callback(null); }); 
      await writeFile(filePath, mockUpdatedData); 
      expect(fs.writeFile).toHaveBeenCalledWith( filePath, 
        JSON.stringify(mockUpdatedData), 
        expect.any(Function) ); 
  });
      
});

