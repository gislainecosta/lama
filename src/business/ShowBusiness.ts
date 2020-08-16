import { IdGenerator } from '../services/IdGenerator';
import { ShowDatabase } from '../data/ShowDatabse';
import { ShowCreateDTO, dayWeek } from '../model/Show';

export class ShowBusiness{
    private showDb = new ShowDatabase

    public async createId(week_day: dayWeek, start_time: number, end_time: number, band_id: string): Promise<string> {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        return id
    }

    public async createShow(show: ShowCreateDTO){
        await this.showDb.create(show)
    }

    public async getDayShows(week_day: dayWeek){
        const show = await this.showDb.getDayShows(week_day)
        return show
    }
}    


