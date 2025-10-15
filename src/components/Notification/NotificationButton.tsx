import React, { useEffect, useState } from "react";
import { Note } from "../Note";
import ModalInvitations from "./ModalInvitation";
import { fetchCurrentUser, fetchUserInvitations } from "../../api/UserApi";
import styles from "./NotificationButton.module.css";

const NotificationButton: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [invitationCount, setInvitationCount] = useState(0);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        const user = await fetchCurrentUser();
        const invitations = await fetchUserInvitations(user.email);
        setInvitationCount(invitations.length);
      } catch (err) {
        console.error("Erreur lors du chargement des invitations", err);
      }
    };

    loadInvitations();
  }, []);

  return (
    <>
      <div className={styles.NotificationButton}>
        <Note
          x={0}
          y={0}
          label=""
          iconType="soupir"
          onClick={() => setOpenModal(true)}
          isOnStaff={false}
          xtext={0}
        />
        
        {invitationCount > 0 && (
          <span className={styles.NotificationNumber}>{invitationCount}</span>
        )}
      </div>

      {openModal && <ModalInvitations onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default NotificationButton;
