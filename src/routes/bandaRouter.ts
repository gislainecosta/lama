import express from 'express';
import { BandaController } from './../controller/BandaController';

export const bandaRouter = express.Router();

bandaRouter.post("/registro", new BandaController().register);
bandaRouter.get("/info", new BandaController().getInfoBanda);