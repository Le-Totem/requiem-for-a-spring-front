import type { MediaType } from "../enums/MediaType";
import type { MediaInstrument } from "./MediaInstrument";

export interface Media {
    id: number,
    title: string,
    type: MediaType,
    url: string,
    dateAdded: Date,
    dateModified?: Date,
    idTrack: number,
    idUser: number,
    mediaInstruments: MediaInstrument[]
}