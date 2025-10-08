export const MediaType = {
    PDF: "PDF",
    image: "image",
    musescore: "musescore",
    Tuxguitar: "Tuxguitar",
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];