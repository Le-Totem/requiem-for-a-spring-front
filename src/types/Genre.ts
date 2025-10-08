import type { MusicPieceGenre } from "./MusicPieceGenre";

export interface Genre {
    id: number,
    name: string,
    musicPieceGenre: MusicPieceGenre[]
}