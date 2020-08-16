import { Request, Response } from "express";
import { Authenticator } from '../services/Authenticator';
import { ShowInputDTO, ShowCreateDTO } from '../model/Show';
import { ShowBusiness } from './../business/ShowBusiness';
import { BandaDatabase } from './../data/BandaDatabse';
import { ShowDatabase } from './../data/ShowDatabse';

export class ShowController{
    public async create(req: Request, res: Response) {

        try {
            const input: ShowInputDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            if (!input.week_day || !input.start_time || !input.end_time || !input.band_id) {
                throw new Error("Invalid input");
            }

            const start = Number(input.start_time)
            const end = Number(input.end_time)

            if ( start === NaN || end === NaN){
                throw new Error("Insira valores númericos entre 8 e 23");
            }

            if( start < 8 || start > 22){
                throw new Error("Insira valores de início entre 8 e 22");
                
            }

            if (end < 9 || end > 23) {
                throw new Error("Insira valores de término entre 9 e 23");
            }

            if (end <= start) {
                throw new Error("Insira um valor de término maior");
            }

            const token = req.headers.token as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            if (authenticationData.role !== "Admin") {
                throw new Error("Você não ter permissão para cadastrar um novo Show. Faça Login como Administrador");
            }

            const newBanda = new BandaDatabase();
            const nameBanda = await newBanda.bandaExists(input.band_id);

            if (nameBanda.quantity === 0) {
                throw new Error("Esta banda não está cadastrada!");
            }

            const newShow = new ShowDatabase
            const schedule = await newShow.scheduleAlreadyExists(input.week_day, input.start_time, input.end_time)

            if (schedule.quantity !== 0) {
                throw new Error("Não pode criar show neste horário. Por favor consulte nossa agenda e tente novamente!");
            }
         
            const showBusiness = new ShowBusiness();
            const showId = await showBusiness.createId(input.week_day, input.start_time, input.end_time, input.band_id)

            const show: ShowCreateDTO ={
                id: showId,
                week_day: input.week_day, 
                start_time: input.start_time, 
                end_time: input.end_time, 
                band_id:input.band_id
            }
            
            await showBusiness.createShow(show)
            res.status(200).send("Show cadastrado com sucesso!")

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public async getInfoDay(req: Request, res: Response): Promise<any> {
        try {
            if (!req.body.week_day) {
                throw new Error("Invalid input");
            }

            const token = req.headers.token as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const dataAgora = Math.floor(Date.now() / 1000)

            if (dataAgora > authenticationData.exp) {
                throw new Error("Faça Login novamente!");
            }

            const showBusiness = new ShowBusiness;

            const bandsList = await showBusiness.getDayShows(req.body.week_day)
            console.log(bandsList)

//            res.status(200).send(shows)

        } catch (error) {
            res.status(420).send({ error: error.message })
        }
    }
}