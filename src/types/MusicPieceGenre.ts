import type { Genre } from "./Genre";
import type { MusicPiece } from "./MusicPiece";
import type { MusicPieceGenreId } from "./MusicPieceGenreId";

export interface MusicPieceGenre {
    id: MusicPieceGenreId,
    musicPiece: MusicPiece,
    genre: Genre
}