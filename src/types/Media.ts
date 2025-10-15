import type { MediaType } from "../enums/MediaType";
import type { MediaInstrument } from "./MediaInstrument";
import type { MusicPiece } from "./MusicPiece";
// import type { MusicPiece } from "./User";
// import type { MusicPiece } from "./MediaInstrument";

export interface Media {
    id: number,
    title: string,
    type: MediaType,
    url: string,
    dateAdded: Date,
    dateModified: Date,
    idTrack: MusicPiece,
    // idUser: User,
    mediaInstruments: MediaInstrument[]
}