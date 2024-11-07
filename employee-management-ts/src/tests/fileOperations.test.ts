// ECHO is on.

import { readFile } from './fileOperations';
import fs from 'fs';

// Mock the 'fs' module
jest.mock('fs');

describe('readFile', () => {
  it('should read a file and parse JSON', async () => {
    const filePath = './mockPath.json';
    const mockData = JSON.stringify({ id: 1, firstName: 'Test Employee' });

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
});

