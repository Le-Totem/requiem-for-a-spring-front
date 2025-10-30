import type { User } from "./UserInfo";


export function setJwt(jwt: string) {
    localStorage.setItem("jwt", jwt);
}

// TODO explorer solution avec la classe "Option" pour ne pas le "null"
export function getJwt(): string | null {
    return localStorage.getItem("jwt");
}

export function deleteJwt() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
}

// TODO explorer solution avec la classe "Option" pour ne pas le "null"
// Peut être faire une exception ??? On sait pas encore.
export function getUser(): User | null {
    let strUser = localStorage.getItem("user");

    if (strUser != null) {
        return JSON.parse(strUser);
    } else {
        return null;
    }
}

export function isAdmin(groupId: number | undefined): boolean {
    let user = getUser();
    let userGroup = user?.groupsRole.find((e) => e.groupId === groupId);

    return userGroup?.role === "ADMIN";
}

export function isModerator(groupId: number | undefined): boolean {
    let user = getUser();
    let userGroup = user?.groupsRole.find((e) => e.groupId === groupId);

    return userGroup?.role === "MODERATEUR";
}