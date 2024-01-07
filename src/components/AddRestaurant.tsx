import { Box, Button, FormControl, Modal, TextField } from "@mui/material";

import { useState } from "react";

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

function AddRestaurant({ open, sessionName, onSubmit, onClose }: IProps) {
  const [restaurantDetail, setRestaurantDetail] = useState({
    name: "",
    location: "",
    imageUrl: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(restaurantDetail);
  };

  const handleValueChange = function (e: any) {
    const { name, value } = e.target;
    setRestaurantDetail({ ...restaurantDetail, [name]: value });
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
            <TextField
              required
              id="restaurant-name"
              label="Restaurant name"
              type="text"
              name="name"
              value={restaurantDetail?.name}
              onChange={handleValueChange}
              // color='warning'
              // helperText='Some important text'
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="location"
              label="Restaurant address"
              type="text"
              rows={3}
              multiline
              name="location"
              value={restaurantDetail?.location}
              onChange={handleValueChange}
              // color='warning'
              // helperText='username already exist'
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="image-url"
              label="Image URL"
              name="imageUrl"
              value={restaurantDetail?.imageUrl}
              onChange={handleValueChange}
              // type={signupPassword}
            />
          </FormControl>

          <Box className="flex justify-between items-end">
            <Button
              variant="contained"
              type="submit"
              disabled={!restaurantDetail.name}
            >
              Submit now
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddRestaurant;
