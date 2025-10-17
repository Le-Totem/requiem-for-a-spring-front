const API_USERS = "http://localhost:8000/api/users";
const API_INVITATIONS = "http://localhost:8000/api/invitations";

export async function getListeMembres() {
    const res = await fetch(`${API_USERS}/all`);
    if (!res.ok) throw new Error("Erreur récupération membres");
    return res.json();
}

export async function envoyerInvitation(email: string, groupId: number) {
    const res = await fetch(`${API_INVITATIONS}/create/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Erreur invitation");
    return res.json();
}

export async function supprimerMembre(id: string) {
    const res = await fetch(`${API_USERS}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression membre");
    return res.json();
}
