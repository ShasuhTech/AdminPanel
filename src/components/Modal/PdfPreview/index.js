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
  borderRadius:'10px'
};

export default function PdfPreview({ open, handleClose, data }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-lg"
    >
      <Box sx={style}>
        <Grid
          onClick={handleClose}
          className="absolute  right-4 cursor-pointer font-bold top-3"
        >
          <Close />
        </Grid>
        <iframe
          className="w-[100%] h-[100%] object-contain rounded-lg"
          src={`${data}#toolbar=0`}
        />
      </Box>
    </Modal>
  );
}
