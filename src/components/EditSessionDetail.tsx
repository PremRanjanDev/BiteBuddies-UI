import { Button, FormControl, Input, TextField } from "@mui/material";
import { useState } from "react";
import { BiteSession } from "../services/session-service";
import { objectsEqual } from "../services/utils";
import ConfirmationDialog from "./ConfirmationDialog";

interface Props {
  session?: BiteSession;
  onSaveClick: (
    details:
      | BiteSession
      | { name: string; description: string; startsAt?: Date }
  ) => void;
  onBackClick: () => void;
}

export const EditSessionDetail = ({
  session,
  onSaveClick,
  onBackClick,
}: Props) => {
  const [editedSession, setEditedSession] = useState<
    BiteSession | { name: string; description: string; startsAt?: Date }
  >(session || { name: "", description: "", startsAt: undefined });
  // const [confirmExit, setConfirmExit] = useState(false);
  const [confirmation, setConfirmation] = useState({
    open: false,
    title: "",
    content: "",
    onClose: () => {},
    onConfirm: () => {},
  });
  const handleSave = (e: any) => {
    e.preventDefault();
  };

  const handleBackClick = () => {
    if (!objectsEqual(session, editedSession)) {
      const confirm = {
        open: true,
        title: "Discard change?",
        content: "You have some unsaved changedm do you want to discard?",
        onClose: () => setConfirmation({ ...confirm, open: false }),
        onConfirm: onBackClick,
      };
      setConfirmation(confirm);
    } else {
      onBackClick();
    }
  };

  const handleChange = (e: any) => {
    console.log(e);
    setEditedSession({ ...editedSession, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col gap-4 w-96">
      {confirmation.open && <ConfirmationDialog {...confirmation} />}
      <form onSubmit={handleSave}>
        <FormControl className="flex gap-4">
          <TextField
            required
            id="name"
            label="Name"
            name="name"
            value={editedSession.name}
            onChange={handleChange}
          />
          <TextField
            multiline
            rows={3}
            id="description"
            label="Description"
            name="description"
            value={editedSession?.description}
            onChange={handleChange}
          />
          <div>
            <Input
              type="date"
              name="startAt"
              value={editedSession?.startsAt}
              onChange={handleChange}
            />
            <Input
              type="time"
              name="startAt"
              value={editedSession?.startsAt}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outlined" onClick={handleBackClick}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => onSaveClick(editedSession)}
            >
              Save
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};
