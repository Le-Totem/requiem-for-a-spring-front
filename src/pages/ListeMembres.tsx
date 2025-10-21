import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../api/GroupApi";
import type { User } from "../api/GroupApi";
import { Note } from "../components/pathButtons/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";
import "../styles/listemembres.css";

export default function ListeMembres() {
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
    <main className="inscription-container">
      <div className="title-wrapper">
        <TitlePartition text="Liste des Membres" />
      </div>

      <div className="crud">
        <div className="partition-wrapper">
          <div className="notes-on-staff">
            <button className="bouton-note" onClick={() => console.log("Invitation envoyée")}>
              <Note
                x={0}
                y={0}
                xtext={15}
                label="Inviter"
                iconType="blanche"
                isOnStaff={false}
                size={5}
              />
            </button>

            <button className="bouton-note" onClick={() => console.log("Mise à jour ok")}>
              <Note
                x={0}
                y={0}
                xtext={15}
                label="Mettre à jour"
                iconType="blanche"
                isOnStaff={false}
                size={5}
              />
            </button>

            <button className="bouton-note" onClick={() => console.log("Suppression ok")}>
              <Note
                x={0}
                y={0}
                xtext={20}
                label="Supprimer"
                iconType="doubleSharp"
                isOnStaff={false}
                size={5}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="partitions-container">
        {users.length === 0 ? (
          <p>Aucun membre trouvé.</p>
        ) : (
          users.reduce<User[][]>((rows, user, index) => {
            // Regroupe les membres par ligne
            if (index % 2 === 0) rows.push([user]);
            else rows[rows.length - 1].push(user);
            return rows;
          }, []).map((pair, rowIndex) => (
            <div className="partition-wrapper" key={rowIndex}>
              <span className="labelMembres gauche">
                {pair[0] && (
                  <>
                    <Note
                      x={0}
                      y={0}
                      xtext={0}
                      label=""
                      iconType="croche"
                      isOnStaff={false}
                      size={10}
                    />
                    {pair[0].firstname} {pair[0].lastname}
                  </>
                )}
              </span>
      
              <span className="labelMembres droite">
                {pair[1] && (
                  <>
                    <Note
                      x={0}
                      y={0}
                      xtext={0}
                      label=""
                      iconType="croche"
                      isOnStaff={false}
                      size={10}
                    />
                    {pair[1].firstname} {pair[1].lastname}
                  </>
                )}
              </span>
      
              <Partition />
            </div>
          ))
        )}
      </div>

    </main>
  );
}
