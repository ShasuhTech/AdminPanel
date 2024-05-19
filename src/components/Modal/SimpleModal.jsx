import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from '@mui/material/Slide';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      TransitionComponent={Transition}
    >
      <Box
        sx={{ ...style, width: !isMobile ? width : "100%", height: "auto%" }}
      >
        {children}
      </Box>
    </Modal>
  );
}
