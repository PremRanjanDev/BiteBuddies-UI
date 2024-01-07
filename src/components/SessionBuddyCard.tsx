import { UserInfo } from "../services/user-service";

type Props = {
  id?: number;
  user?: UserInfo;
  status?: string;
};

const SessionBuddyCard = function ({ id, user, status }: Props) {
  return (
    <div className="border border-orange-600 px-5 py-2 w-fit rounded-md">
      <h2>{user?.name}</h2>

      <div
        className={
          "px-2 rounded-xl " +
          (status === "joined"
            ? "bg-orange-600 text-white"
            : "text-orange-600 border border-orange-600")
        }
      >
        {status}
      </div>
    </div>
  );
};

export default SessionBuddyCard;
