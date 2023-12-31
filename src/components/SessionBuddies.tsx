import { Button } from "@mui/material";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { SessionUsers, inviteUser } from "../services/session-service";
import InviteUser from "./InviteUser";
import SessionBuddyCard from "./SessionBuddyCard";

interface IProps {
  buddies?: SessionUsers[];
  sessionName: string;
  sessionId: number;
}

function SessionBuddies({ buddies, sessionName, sessionId }: IProps) {
  const [openInvite, setOpenInvite] = useState(false);
  const handleInvite = (userIds: number[]) => {
    inviteUser(sessionId, userIds, (res) => {
      buddies?.push(res);
      setOpenInvite(false);
    });
  };

  return (
    <section className="flex flex-col gap-2 w-full justify-center">
      <div className="flex gap-4 text-xl items-center">
        <FaUsers className="text-orange-600" size={40} />
        <h2 className="text-2xl"> Bite Buddies</h2>
        <Button variant="outlined" onClick={() => setOpenInvite(true)}>
          Invite
        </Button>
      </div>
      <InviteUser
        sessionName={sessionName}
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        onSubmit={handleInvite}
      />
      <div className="flex flex-wrap gap-5 py-5">
        {buddies &&
          buddies.map((user, index) => (
            <SessionBuddyCard
              key={index}
              user={user.user}
              status={user.status}
            />
          ))}
      </div>
    </section>
  );
}

export default SessionBuddies;
