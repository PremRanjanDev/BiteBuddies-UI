import { useEffect, useState } from "react";
import { BiteSession, getActiveSessions } from "../services/session-service";
import Loader from "./Loader";
import { SessionDetail } from "./SessionDetail";
import SessionPreviewCard from "./SessionPreviewCard";
import { useAuth } from "../context/AuthProvider";
import { LoginPopup } from "./LoginPopup";
import { UserLogin } from "./UserLogin";
import { Button } from "@mui/material";

export const Dashboard = () => {
  const auth = useAuth();
  const [activeSessions, setActiveSessions] = useState<BiteSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewSession, setCreateNewSession] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    loadActiveSessions();
  }, []);

  useEffect(() => {}, [activeSessions]);

  const loadActiveSessions = async () => {
    setIsLoading(true);
    await getActiveSessions(setActiveSessions, console.log);
    setIsLoading(false);
  };

  const handleShowDetails = function (id: number) {
    setSelectedId(id);
    setCreateNewSession(false);
  };

  //gap-10 px-2 h-[100vh] overflow-hidden
  return (
    <>
      {isLoading && <Loader />}
      {auth.loggedInUser ? (
        <div className="flex">
          <div className="flex flex-col gap-5 p-2 w-[25%]">
            <Button
              variant="contained"
              onClick={() => {
                setSelectedId(null);
                setCreateNewSession(true);
              }}
            >
              + Create new session
            </Button>
            {activeSessions.length &&
              activeSessions.map((session: BiteSession, index: number) => (
                <SessionPreviewCard
                  key={index}
                  session={session}
                  selected={selectedId === session.id}
                  onDetailClick={handleShowDetails}
                />
              ))}
          </div>
          <div className="w-[75%] p-2">
            {selectedId ? (
              <SessionDetail id={selectedId} />
            ) : createNewSession ? (
              <SessionDetail create={true} onSave={activeSessions.push} />
            ) : (
              <div>Select a session to see details</div>
            )}
          </div>
        </div>
      ) : (
        <UserLogin />
      )}
    </>
  );
};
