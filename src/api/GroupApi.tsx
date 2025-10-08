export interface GroupDto {
  id?: number;
  name: string;
  creationDate: Date;
  isEveryoneAdmin: boolean
}

export interface UserRoleDto {
  id_user: string;
  id_group: number;
  role: Role
  group: GroupDto;
}
export enum Role {
  ADMIN = 'ADMIN',
  MODERATEUR = 'MODERATEUR',
  UTILISIATEUR = 'UTILISIATEUR',
}

export interface MusicPieceDto {
  id: number;
  title: string;
  author: string;
  description: string;
  groupId: number;

}

export interface InvitationDto {
  id?: number;
  email: string;
  status: Status;
  created_at: Date; 
  groupId: number;
}
export enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}


// services/groupService.ts
const API_BASE_URL = 'http://localhost:8000/api/groups';

// Fonction pour obtenir le token JWT 
const getAuthHeaders = () => {
//   const token = localStorage.getItem('token'); 
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE3NTk5MDY0NzcsImV4cCI6MTc1OTkxMDA3N30.7wvLZKX-6K_mH0ojIObCogOPfw11LkCneYi9gSdQINg";
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const groupService = {
  // Récupérer tous les ensembles
  getAll: async (): Promise<GroupDto[]> => {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des ensembles');
    return response.json();
  },

   //Récupérer les ensembles de l'utilisateur connecté
 getMyGroups: async (): Promise<UserRoleDto[]> => {
  const response = await fetch(`${API_BASE_URL}/my-groups`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erreur lors de la récupération de vos ensembles');
  return response.json();
},


  // Récupérer un ensemble par ID
  getById: async (id: number): Promise<GroupDto> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Ensemble non trouvé');
    return response.json();
  },

  // Récupérer les morceaux d'un ensemble
  getMusicByGroup: async (groupId: number): Promise<MusicPieceDto[]> => {
    const response = await fetch(`${API_BASE_URL}/${groupId}/track`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erreur lors de la récupération des morceaux');
    return response.json();
  },

  // Récupérer les invitations d'un ensemble
  getInvitations: async (id: number): Promise<InvitationDto[]> => {
    const response = await fetch(`${API_BASE_URL}/${id}/invitations`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des invitations');
    return response.json();
  },

  // Créer un ensemble
  create: async (groupDto: GroupDto): Promise<GroupDto> => {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(groupDto),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de l\'ensemble');
    return response.json();
  },

  // Inviter un utilisateur dans un ensemble 
  inviteUser: async (groupId: number, invitationDto: InvitationDto): Promise<InvitationDto> => {
    const response = await fetch(`${API_BASE_URL}/${groupId}/invite_user`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(invitationDto),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'invitation');
    return response.json();
  },

  // Supprimer un ensemble
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de l\'ensemble');
  },
};