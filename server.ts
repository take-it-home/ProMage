import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// import routes
import ProjectRoutes from './routes/projects';
import TaskRoutes from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// move this to env
mongoose.connect('mongodb://localhost:27017/promage');

// routes
app.use('/api/v1/projects', ProjectRoutes);
app.use('/api/v1/tasks', TaskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
