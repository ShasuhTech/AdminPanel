import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { Close } from "mdi-material-ui";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  height: 850,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function SimpleModal({
  open,
  handleClose,
  data,
  children,
  width,
}) {
  const isMobile = window.innerWidth <= 400;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg"
    >
      <Box
        sx={{ ...style, width: !isMobile ? width : "100%", height: "auto%" }}
      >
        {children}
      </Box>
    </Modal>
  );
}
