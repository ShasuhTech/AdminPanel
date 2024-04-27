
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid, Typography } from "@mui/material";
import { Close } from "mdi-material-ui";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirmation({ open, handleClose, onClick, message , message2}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          borderRadius: 20,
          padding: 20,
          Width: 'px',
          margin: "auto",
          textAlign: "center",
        },
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2} sx={{width:'450px', minHeight:'150px'}}>
        {/* <Grid item>
          <Close onClick={handleClose} style={{ cursor: "pointer" }} />
        </Grid> */}
        <Grid item>
          <Typography variant="h5" fontWeight="normal" fontSize={16}>
          {`Are you sure you want to ${message}`}
         
         
          </Typography>
        </Grid>
       
          <Typography variant="h5" fontWeight="bold" fontSize={16}>
         {`${message2}`}
            
          </Typography>
      
    
        <Grid item container justifyContent="center" spacing={2} style={{marginTop:'15px'}}>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                backgroundColor: "#dae8eb",
                color: "black",
                borderRadius: 20,
                padding: "10px 20px",
                fontWeigh:"normal",
                fontSize:'13px'
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={onClick}
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 20,
                padding: "10px 20px",
                fontWeight:"normal",
                fontSize:'13px'
              }}
            >
              {message}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
