import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { Close } from "mdi-material-ui";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Default width for responsiveness
  height: "90%", // Default height for responsiveness
  maxWidth: 800, // Maximum width for desktop and laptop
  maxHeight: 800, // Maximum height for desktop and laptop
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

export default function ImagePreview({ open, handleClose, data }) {
  const isMobile = window.innerWidth <= 400;
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="rounded-lg"
      >
        <Box sx={{
          ...style,
          width: isMobile ? 400 : "90%", // Adjust width for mobile
          height: isMobile ? 400 : "90%", // Adjust height for mobile
          maxWidth: isMobile ? 400 : 800, // Adjust max-width for desktop/laptop
          maxHeight: isMobile ? 400 : 800 // Adjust max-height for desktop/laptop
        }}>
        <Grid
          onClick={handleClose}
          className="absolute  right-4 cursor-pointer font-bold top-3"
        >
          <Close />
        </Grid>
          <img
            src={data}
            alt=""
            className="w-[100%] h-[100%] object-contain  rounded-lg"
          />
        </Box>
      </Modal>
  );
}
