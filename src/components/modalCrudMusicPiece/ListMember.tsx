import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../../api/GroupApi";
import type { User } from "../../api/GroupApi";

interface ModalUsersProps {
  onClose: () => void;
}

const ListUser: React.FC<ModalUsersProps> = ({ onClose }) => {
  const { id } = useParams();
  const groupId = Number(id);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;

    const fetchUsers = async () => {
      try {
        const data = await groupService.getUsersByGroupId(groupId);
        setUsers(data);
      } catch (err) {
        setError("Impossible de récupérer les utilisateurs du groupe");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [groupId]);

  return (
    <div>
      <div>
        <div>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : users.length === 0 ? (
            <p>Aucun membre trouvé.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.firstname} {user.lastname} — {user.email} {user.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUser;
