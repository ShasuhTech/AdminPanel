
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import { Button, CardHeader, Dialog, DialogActions, DialogTitle,DialogContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem, DialogContentText } from "@mui/material";

// import ProfileDetails from "./ProfileDetails";

import { useRouter } from "next/router";

import { approveSalonDeatils, salonListByid } from "@/services/api";

import User from "./User";

import Services from "./Services";

// import Certificate from "./Certificate";

import Galary from "./Galary";

import Confirmation from "@/components/Modal/Confirmation";

import { toast } from "react-toastify";

import Slot from "./Slot";

import Package from "./Package";

import Offers from "./Offers";

import RequestChange from "./RequestChange";

import ProfileDetails from "./ProfileDetails";

import Certificate from "./Certificate";
 
function a11yProps(index) {

  return {

    id: `simple-tab-${index}`,

    "aria-controls": `simple-tabpanel-${index}`,

  };

}
 
 
export default function SalonDetails() {

  const router = useRouter();

const [value, setValue] = useState(0);

  const [salonData, setSalonData] = useState({});

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState(""); 

  const [open, setOpen] = useState(false);

  const [status, setStatus]=useState(1)

  const [input , setInput] = useState('')
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState(""); 

  const id = router?.query?.id;
 
 
const call = async () => {

    if (!id) {

      return;

    }

    const payload = {

      id,

include:'address'

};

    try {

const resp = await salonListByid(payload);

setSalonData(resp?.data);

} catch (error) {

console.error(error);

    }

  };
 
useEffect(() => {

    call();
   


  }, [router, id,]); // Add router and id to the dependency array
 
  console.table(salonData, "-");
 
  const handleStatusChange = () => {

    setOpenConfirmation(true);

    // Determine confirmation message based on status selection

    if (status === 5) {

      setConfirmationMessage("approve");

    } else if (status === 6) {

      setConfirmationMessage("reject");
 
}

  };
 
const handleCloseConfirmation = () => {

    setOpenConfirmation(false);
    setStatus(1)

};
 
const handleConfirmationSubmit = async () => {

    setOpenConfirmation(false);

    const payload = { salonId: salonData?.id, status };
 
try {

      const resp = await approveSalonDeatils(payload);

      if (resp?.code === 200) {

        toast.success("Successfully Updated");

        router.push('/salon/active');

      }

    } catch (error) {

      toast.error(error.message);

}

};
 
const handleChange = (event, newValue) => {

    setValue(newValue);

};
 
  const handleClickOpen = () => {

    setOpenConfirmation(true);

};
 
 
const handleClose = () => {

    setOpenConfirmation(false);
    setStatus(1)

};
 
  const handlePopUpOpen = () => {

    setOpen(true);

};
 
  const handlePopUpClose = () => {

    setOpen(false);

    // setStatus(6)

  }
 

const changeStatusHandler = (e) => {
  const selectedStatus = e.target.value;
  setStatus(selectedStatus); 
  if (selectedStatus === 5) {
    setConfirmationMessage("Approve");
    setOpenConfirmation(true); 
  } else if (selectedStatus === 6) {
    setConfirmationMessage("Reject");
    setOpenRemarksModal(true)
  }
}

    
 
  const onChangeHandler = (e)=>{

          setInput(e.target.value)
}

  // const handleStatusChange = async(e)=>{

  //   const selectedStatus = e.target.value;

  //   setStatus(selectedStatus);

  //   const payload = { salonId: salonData?.id, status: selectedStatus };

  //   try {

  //     const resp = await approveSalonDeatils(payload);

  //     if (resp?.code === 200) {

  //       toast.success("Successfully Updated");

  //       handleClose();

  //       router.push('/salon/active')

  //     }

  //     console.log(resp);

  //   } catch (error) {

  //     toast.error(error.message); // Fix error message

  //   }

  // }
 
  const approveDetails = async () => {

    let payload = { salonId: salonData?.id, status: status };
     if (status === 6) {
            payload = {
              ...payload,
              remarks: remarks 
            };
          }

try {

      const resp = await approveSalonDeatils(payload);

      if (resp?.code === 200) {

        toast.success("Successfully Updated");

        handleClose();

        router.push('/salon/active')

}

      console.log(resp);

} catch (error) {

      toast.error(error.message); // Fix error message

}

  };

console.log(value, "value");

// function handle for remarks modal
const handleRemarksChange = (e) => {
  const { value } = e.target;
  setRemarks(value);
  // Check for errors and update the error state
  if (value.trim() === "") {
    setRemarksError("Remarks cannot be empty");
  } else {
    setRemarksError("");
  }
};

const handleRemarksSubmit = () => {
  if (remarks.trim() === "") {
    setRemarksError("Remarks cannot be empty");
  } else {
    setRemarksError("");
    // Proceed with submission logic
    setOpenRemarksModal(false);
    setOpenConfirmation(true);
  }
  // setOpenRemarksModal(false);
  // setOpenConfirmation(true);
};

const handleRemarksModalClose = () => {
  setOpenRemarksModal(false);
  // setSelectedAction(""); 
  setRemarks("");
  setStatus("1")
};
 
  return (

<Grid>

      <Box

  sx={{

          width: "100%",

          backgroundColor: "white",

          mt: 2,

          boxShadow: 10,

          borderRadius: 3,

}}

      >

<Box

          // sx={{

          //   borderBottom: 1,

          //   borderColor: "divider",

          //   display: "flex",

          //   justifyContent: "space-between",

          //   padding: "10px 10px",

          // }}

          className="lg:flex border-b px-3 py-1 lg:justify-between items-center overflow-set"

        >

          <Grid className="   flex">

            <Tabs

              value={value}

              onChange={handleChange}

              aria-label="basic tabs example"

              sx={{

                "& .MuiTab-root": { fontSize: "14px", fontWeight: "bold" },

              }}

            >

              <Tab label="Profile" {...a11yProps(0)} />

              <Tab label="Users" {...a11yProps(1)} />

              <Tab label="Services" {...a11yProps(2)} />

              <Tab label="Certificate" {...a11yProps(3)} />

              <Tab label="Gallery" {...a11yProps(4)} />

              <Tab label="Working" {...a11yProps(5)} />

              <Tab label="Package" {...a11yProps(6)} />

              <Tab label="Offers" {...a11yProps(7)} />

              <Tab label="Request Change" {...a11yProps(8)} />

            </Tabs>

          </Grid>

          {router?.query?.status !== "true" && (

            // <button

            //   onClick={handlePopUpOpen}

            //   className="bg-blue-500 text-white px-4 font-bold rounded-md py-3 lg:mt-0 mt-2"

            // >

            //   Change Status

            // </button>

            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">

            {/* <InputLabel id="demo-select-small-label">Update Status</InputLabel> */}

<Select

              labelId="demo-select-small-label"

              id="demo-select-small"

              value={status}

              // label="Change Status"

              onChange={changeStatusHandler}
              style={{width:'140px', height:'40px',}}
              >

              {/* <MenuItem value={0} disabled >Select Type</MenuItem> */}
              
            <MenuItem value={1} disabled>Update Status</MenuItem>

              <MenuItem value={5}>Approved</MenuItem>

              <MenuItem value={6}>Reject</MenuItem>
 
</Select>

          </FormControl>

          )}

        </Box>
 
        {openConfirmation && (

          <Confirmation

            open={openConfirmation}

            // handleClose={handleCloseConfirmation}

            // onClick={handleConfirmationSubmit}

            message={confirmationMessage} 

            // salonName={salonData.name}

          />

        )}

        {value == 0 && (

          <ProfileDetails value={value} index={0} data={salonData} />

        )}

        {value == 1 && <User value={value} index={1} data={salonData} />}

        {value == 2 && <Services value={value} index={2} data={salonData} />}

        {value == 3 && <Certificate value={value} index={3} data={salonData} />}

        {value == 4 && <Galary value={value} index={4} data={salonData} />}

        {value == 5 && <Slot value={value} index={5} data={salonData} />}

        {value == 6 && <Package value={value} index={6} data={salonData} />}

        {value == 7 && <Offers value={value} index={7} data={salonData} />}

        {value == 8 && (

          <RequestChange value={value} index={8} data={salonData} />

        )}

      </Box>

      {openConfirmation && (

        <Confirmation

          open={openConfirmation}

          handleClose={handleClose}

          onClick={approveDetails}

          salonName = {salonData.name}
          message={confirmationMessage}
          message2 = {salonData?.name}

        />

      )}
 
<Dialog open={open} onClose={handlePopUpClose}>

        <DialogTitle  

        style={{

            fontFamily: 'Arial, sans-serif',

            fontWeight: 'bold',

            fontSize: '20px',

            color: '#333' ,

          marginLeft:'auto',

        marginRight:'auto'}}

            >

              {salonData.name}
 
          </DialogTitle>
 
        <DialogContent style={{width:'550px', height:'220px'}}>

          <div style={{display:'flex', width:'400px', marginBottom:'15px', marginTop:'30px',}}>

            <strong> Status : </strong>
 
            <div style={{width:"300px"}}>

            <select value={status} onChange={changeStatusHandler}  

      style={{

      marginLeft: '45px',

      padding: '8px 12px',

      fontSize: '14px',

      border: '1px solid #ccc',

      borderRadius: '5px',

      backgroundColor: 'white',

      backgroundImage: 'linear-gradient(to bottom, #f9f9f9, #e9e9e9)',

      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',

      cursor: 'pointer',

      width: '100%',

      boxSizing: 'border-box',}}>

          <option value={5}>Approved</option>

          <option value={6}>Reject</option>

        </select>

              </div>

          </div>

          <div >

  <label htmlFor="remarks" style={{}}><strong> Remarks : </strong></label>

  <input type="text" id="remarks" name="remarks"  style={{ padding: '8px 12px',

      fontSize: '14px',

      border: '1px solid #ccc',

      borderRadius: '5px',

      width: '300px', 

      marginLeft:'25px', marginTop:'25px'}} onChange={onChangeHandler}/>

</div>

        </DialogContent>
 
        <DialogActions>

          <Button variant="outlined" onClick={handlePopUpClose} color="error" style={{marginRight:'25px'}}>

            Close

          </Button>

          <Button variant="contained" onClick={approveDetails} color="primary" style={{marginRight:'25px'}}>

            Submit

          </Button>

        </DialogActions>
 
      </Dialog>


      {/*Modal for rejection remarks  */}

      <Dialog open={openRemarksModal} onClose={handleRemarksModalClose} sx={{borderRadius:'20px'}}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the combo:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            label="Remarks"
            type="text"
            fullWidth
            value={remarks}
            // onChange={(e) => setRemarks(e.target.value)}
            onChange={handleRemarksChange} 
            error={!!remarksError} 
            helperText={remarksError}
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleRemarksModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleRemarksSubmit} variant="contained" style={{marginRight:'15px', marginLeft:'15px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>

);

}