// ECHO is on.

import {initializeData} from './Utils/fileOperations'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employees';

// Initialize data and start the server 
initializeData().then(() => {

  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); 

  app.use('/employees', employeeRoutes);


  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

});
