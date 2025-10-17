const USER_API_URL = "http://localhost:8000/api/users";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzYwNjgyMDk2LCJleHAiOjE3NjA3NTIwOTZ9.Dk8YUrKKGLzfSKhqdHjqo1ZWzwzCC2XpgVF5EHRjrVY";

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