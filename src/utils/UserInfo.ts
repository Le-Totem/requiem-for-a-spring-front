export interface UserGroup {
    groupId: number,
    role: string
}

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    groupsRole: UserGroup[]
}