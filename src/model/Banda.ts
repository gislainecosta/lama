export enum MusicGenre {
    METAL = "Metal",
    SERTANEJO = "Sertanejo",
    CLASSICA = "Classica",
    MPB = "MPB",
    ROCK_NACIONAL = "Rock Nacional"
}

export class Banda{
    constructor(
        private id: string,
        private name: string,
        private music_genre: MusicGenre,
        private responsible: string,
    ){}

    public static toBandaModel(object: any): Banda{
        return new Banda(object.id, object.name, object.music_genre, object.responsible);
    }
}

export interface BandaInputDTO{
    name: string, 
    music_genre: MusicGenre, 
    responsible: string, 
}

export interface BandaCreateDTO {
    id: string,
    name: string,
    music_genre: MusicGenre,
    responsible: string,
}

export interface GetBandaDTO {
    name: string,
    id: string,
}

