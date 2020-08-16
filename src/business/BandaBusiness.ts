import { IdGenerator } from './../services/IdGenerator';
import { BandaDatabase } from './../data/BandaDatabse';
import { BandaCreateDTO, MusicGenre } from './../model/Banda';

export class BandaBusiness{
    private bandaDb = new BandaDatabase

    public async createId(name: string, music_genre: MusicGenre, responsible: string): Promise<string> {
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        return id
    }

    public async createBanda(banda: BandaCreateDTO){
        await this.bandaDb.create(banda)
    }

    public async getBanda(termo: string){
        const banda = await this.bandaDb.getBanda(termo)
        return banda
    }
}    


