export const Status = {
    PENDIG: "PENDIG",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED"
} as const;

export type Status = typeof Status[keyof typeof Status];




