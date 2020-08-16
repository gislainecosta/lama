import express from 'express';
import { ShowController } from './../controller/ShowController';

export const showRouter = express.Router();

showRouter.post("/registro", new ShowController().create);
showRouter.get("/info-day", new ShowController().getInfoDay);