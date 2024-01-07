import { Button } from "@mui/material";
import { FaClock } from "react-icons/fa";

import { BiteSession } from "../services/session-service";
import SessionBuddies from "./SessionBuddies";
import SessionResturant from "./SessionResturant";

interface Props {
  session: BiteSession;
  onEditClick: () => void;
}

export const ViewSessionDetail = ({ session, onEditClick }: Props) => {
  return (
    <>
      <div>
        <div className="flex gap-5">
          <h1 className="text-3xl">{session.name}</h1>
          <Button variant="outlined" onClick={onEditClick}>
            Edit
          </Button>
        </div>

        <div className="text-left py-2">
          <h1>{session.description}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3" title="Started at">
        <small className="text-orange-600">
          <FaClock />
        </small>
        {session.startsAt
          ? new Date(session.startsAt).toUTCString().slice(0, 16)
          : "Yet to decide"}
      </div>

      <div className="flex items-center gap-3" title="Create by">
        <span className="text-orange-600">Initiated By</span>
        {session.initiatedBy.name}
      </div>

      {/* <div className="flex items-center gap-3" title="Create by">
        <span className="text-orange-600">Created on</span>
        {session.createdAt &&
          new Date(session.createdAt).toUTCString().slice(0, 16)}
      </div> */}

      <div className="overflow-x-hidden">
        <SessionResturant
          sessionName={session.name}
          resturants={session.sessionRestaurant}
        />
      </div>
      {/* <SessionBuddies buddies={session.sessionUsers} /> */}
      <SessionBuddies
        sessionName={session.name}
        buddies={session.sessionUsers}
      />
    </>
  );
};
