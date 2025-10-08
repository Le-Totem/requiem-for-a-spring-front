import type { Group } from "./Group"
import type { Media } from "./Media"
import type { MusicPieceGenre } from "./MusicPieceGenre"

export interface MusicPiece {
    id: number,
    title: string,
    author: string,
    description: string,
    group: Group,
    medias: Media[]
    musicPieceGenres: MusicPieceGenre[]
}