const USER_API_URL = "http://localhost:8000/api/users";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE3NjA0MjMyODAsImV4cCI6MTc2MDQ5MzI4MH0.LkpkR6uNUMtoYpTFA5zFjcEcTEBkw283SFqV7tffYXs";

export async function fetchCurrentUser() {
    try {
        const userData = await fetch(`${USER_API_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!userData.ok) {
            const errorBody = await userData.text();
            throw new Error(`Erreur HTTP ${userData.status}: ${errorBody}`);
        };

        return userData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchCurrentUser: ${error}`);
    }
}