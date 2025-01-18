import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoute.js';

import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/course', courseRoute);

mongoose
  .connect('mongodb+srv://jenitjosephjose:ogshoxlvUSAGLH65@cluster0.rn63q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });





  
