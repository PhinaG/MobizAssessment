// ECHO is on.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employees';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.use('/employees', employeeRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
