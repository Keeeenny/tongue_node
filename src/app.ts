import express from 'express';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use(router);

app.use(errorHandler)

//listen to port
app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
