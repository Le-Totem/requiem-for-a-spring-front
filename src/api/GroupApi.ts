import type { Status } from "../enums/Status";
import type { Role } from "../enums/Role";

export interface GroupDto {
  id?: number;
  name: string;
  creation_date: string;
  is_everyone_admin: boolean
}

export interface UserRoleDto {
  id_user: string;
  id_group: number;
  role: Role
  group: GroupDto;
}

export interface User{
  id: string;
  firstname: string;
  lastname: string;
  email:string;
  role:Role;
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
  groupName?: string;
}

// services/groupService.ts
const API_BASE_URL = 'https://51.210.4.227/api/groups';

// Fonction pour obtenir le token JWT 
const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); 
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzYwMzM5MzkxLCJleHAiOjE3NjA0MDkzOTF9.-wELrSTNgtMgDkJLmAWeT4xTM0BmMBjEtiQcivJEQkg"; 
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


  
// Récupérer des utilisateurs par rapport à l'ID de l'ensemble
getUsersByGroupId: async (groupId: number): Promise<User[]> => {
  const response = await fetch(`https://51.210.4.227/api/users/group/${groupId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs du groupe");
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
  // Mettre à jour le statut d'une invitation (ACCEPTED / REFUSED)
  updateInvitationStatus: async (
    invitationId: number,
    status: Status
  ): Promise<InvitationDto> => {
    const response = await fetch(
      `${API_BASE_URL}/invitations/${invitationId}/status?status=${status}`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok)
      throw new Error("Erreur lors de la mise à jour du statut de l'invitation");
    return response.json();
  },

    // Mettre a jour un ensemble 
  update: async (id: number, newName: string): Promise<GroupDto> => {
    const response = await fetch(`${API_BASE_URL}/${id}/update`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour de l'ensemble");
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