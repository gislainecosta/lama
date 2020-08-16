export enum dayWeek {
    SEXTA = "Sexta",
    SABADO = "Sábado",
    DOMINGO = "Domingo"
}

export interface ShowInputDTO{
    week_day: dayWeek, 
    start_time: number, 
    end_time: number, 
    band_id: string
}

export interface ShowCreateDTO {
    id: string,
    week_day: dayWeek,
    start_time: number,
    end_time: number,
    band_id: string
}