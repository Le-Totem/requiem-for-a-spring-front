export const Role = {
    ADMIN: "ADMIN",
    MODERATEUR: "MODERATEUR",
    UTILISIATEUR: "UTILISIATEUR"
} as const;

export type Role = typeof Role[keyof typeof Role];


