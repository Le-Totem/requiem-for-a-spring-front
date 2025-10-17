const USER_API_URL = "http://localhost:8000/api/users";
// const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzYwMzM5MzkxLCJleHAiOjE3NjA0MDkzOTF9.-wELrSTNgtMgDkJLmAWeT4xTM0BmMBjEtiQcivJEQkg";

export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");
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

export async function fetchUserInvitations(email: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${USER_API_URL}/email/${email}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export async function sendVerificationCode(email: string, code: number): Promise<string> {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${USER_API_URL}/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ email, code: code.toString() })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${errorBody}`);
    }

    return response.text(); // retourne le message du serveur ("Code envoyé avec succès")
  } catch (error) {
    throw new Error(`Une erreur est survenue lors de l'envoi du code : ${error}`);
  }
}
