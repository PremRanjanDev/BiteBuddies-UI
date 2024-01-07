import { useEffect, useState } from "react";
import {
  BiteSession,
  createSession,
  getSessionDetail,
  updateSession,
} from "../services/session-service";
import { EditSessionDetail } from "./EditSessionDetail";
import { ViewSessionDetail } from "./ViewSessionDetail";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

type Props = {
  id?: number;
  create?: boolean;
  onSave?: (detail: BiteSession) => void;
};

export const SessionDetail = ({ id, create = false, onSave }: Props) => {
  const auth = useAuth();
  const [sessionDetail, setSessionDetail] = useState<BiteSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log("create: ", create);

  useEffect(() => {
    if (id) {
      loadSessionDetail(id);
    }
    setIsEdit(false);
  }, [id]);

  const loadSessionDetail = (id: number) => {
    setIsLoading(true);
    getSessionDetail(id, setSessionDetail, console.log);
    setIsLoading(false);
  };

  const handleSave = (details: any) => {
    if (details.id) {
      updateSession(
        details,
        (res) => {
          setSessionDetail(res);
          onSave && onSave(res);
          setIsEdit(false);
        },
        () => toast.error("Could not update the details")
      );
    } else {
      createSession(
        { ...details, initiatedByUserId: auth.loggedInUser?.id },
        (res) => {
          setSessionDetail(res);
          setIsEdit(false);
        },
        () => toast.error("Could not create session")
      );
    }
  };

  return (
    <>
      <div>
        {create ? (
          <>
            <div className="text-lg"> Create a new Session</div>
            <EditSessionDetail
              onSaveClick={handleSave}
              onBackClick={() => setIsEdit(false)}
            />
          </>
        ) : sessionDetail ? (
          isEdit ? (
            <EditSessionDetail
              session={sessionDetail}
              onSaveClick={handleSave}
              onBackClick={() => setIsEdit(false)}
            />
          ) : (
            <ViewSessionDetail
              session={sessionDetail}
              onEditClick={() => setIsEdit(true)}
            />
          )
        ) : (
          <div>
            Select a bite seesion to see detail or click CREATE A NEW SESSION
          </div>
        )}
      </div>
    </>
  );
};
