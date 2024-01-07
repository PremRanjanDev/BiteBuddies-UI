import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Modal,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import { UserInfo } from "../services/user-service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  sessionName: string;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

function InviteUser({ open, sessionName, onSubmit, onClose }: IProps) {
  const [params, setParams] = useState<any[]>([]);
  const [selectUserId, setSelectUserId] = useState<number>();

  const [users, setUsers] = React.useState<UserInfo[]>([]);
  const [value, setValue] = React.useState<UserInfo[]>([]);

  const handleSubmit = function () {
    const userIds = value.map((u) => u.id);
    onSubmit(userIds);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <h2>{`Submit a new resturaunt for ${sessionName}`}</h2>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue as UserInfo[]); // Ensure newValue is treated as UserInfo[]
              }}
              multiple
              id="tags-filled"
              options={users}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              freeSolo
              renderTags={(value: UserInfo[], getTagProps) =>
                value.map((option: UserInfo, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option.name}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Users"
                  placeholder="Search"
                />
              )}
            />
          </FormControl>

          <Box className="flex justify-between items-end">
            <Button variant="contained" type="submit" disabled={!selectUserId}>
              Invite now
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default InviteUser;
