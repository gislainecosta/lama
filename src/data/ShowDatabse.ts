import { BaseDatabase } from './BaseDatabase';
import { ShowCreateDTO, dayWeek } from '../model/Show';

export class ShowDatabase extends BaseDatabase{
    private static COLUMN_START: string = "start_time"
    private static COLUMN_END: string = "end_time"
    private static COLUMN_DAY: string = "week_day"
    private static COLUMN_BANDA_ID: string = "band_id"
    private static TABLE_NAME = "SHOWS_LAMA"
    
    public async create(show: ShowCreateDTO){
        try {
            await super.getConnection()
            .insert({
                id: show.id,
                week_day: show.week_day,
                start_time: show.start_time,
                end_time: show.end_time,
                band_id: show.band_id
            })
            .into(ShowDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

        await BaseDatabase.destroyConnection();
    }

    public async scheduleAlreadyExists(week_day: dayWeek, start_time: number, end_time: number): Promise<any> {
        const result = await this.getConnection()
            .raw(`
                SELECT COUNT(*) as quantity FROM ${ShowDatabase.TABLE_NAME}
                WHERE ${ShowDatabase.COLUMN_DAY} = "${week_day}" AND(
                    (${end_time} > ${ShowDatabase.COLUMN_START} AND ${start_time} < ${ShowDatabase.COLUMN_START} AND ${end_time} <${ShowDatabase.COLUMN_END}) OR
                    (${start_time} <=${ShowDatabase.COLUMN_END} AND ${end_time} <${ShowDatabase.COLUMN_END} AND ${start_time} >${ShowDatabase.COLUMN_END}) OR
                    (${end_time} < ${ShowDatabase.COLUMN_START} AND ${start_time} >=${ShowDatabase.COLUMN_END} AND ${end_time} <= ${ShowDatabase.COLUMN_START} AND ${end_time} <${ShowDatabase.COLUMN_END}) OR
                    (${end_time} >= ${ShowDatabase.COLUMN_START} AND ${start_time} <=${ShowDatabase.COLUMN_END} AND ${start_time} >= ${ShowDatabase.COLUMN_START})
                )
            `);
        return result[0][0]

        await BaseDatabase.destroyConnection();
    }
    
    public async getDayShows(week_day: dayWeek): Promise<any> {
        try {
            const result = await this.getConnection()
                .select(ShowDatabase.COLUMN_BANDA_ID)
                .from(ShowDatabase.TABLE_NAME)
                .where({ week_day })

            return result;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
        await BaseDatabase.destroyConnection();
    }

} 