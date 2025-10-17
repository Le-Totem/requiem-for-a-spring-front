import type { MediaInstrument } from "./MediaInstrument";

export interface Instrument {
    id: number,
    name: string,
    mediaInstruments: MediaInstrument[]
}