import type { Instrument } from "./Instrument";
import type { Media } from "./Media";

export interface MediaInstrument {
    idMedia: Media,
    idInstrument: Instrument
}