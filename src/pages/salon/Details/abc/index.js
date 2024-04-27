import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, CardHeader, Dialog, DialogActions, DialogTitle,DialogContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import ProfileDetails from "./ProfileDetails";
import { approveSalonDeatils, salonListByid } from "@/services/api";
import { useRouter } from "next/router";
import User from "../User";
import Services from "../Services";
// import Certificate from "./Certificate";
import Galary from "../Galary";
import Confirmation from "@/components/Modal/Confirmation";
import { toast } from "react-toastify";
import Slot from "../Slot";
import Package from "../Package";
import Offers from "../Offers";
import RequestChange from "../RequestChange";
import ProfileDetails from "../ProfileDetails";
import Certificate from "../Certificate";

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
  const [status, setStatus]=useState()
  const [input , setInput] = useState('')

  const id = router?.query?.id;
  const stage = router?.query?.stage;

  useEffect(() => {
    if (stage) {
      switch (stage) {
        case "2":
          setValue(0); 
          break;
        case "3":
          setValue(0); 
          break;
        case "6":
          setValue(0); 
          break;
        case "7":
          setValue(0);
          break;
        case "8":
          setValue(0);
          break;
        case "9":
          setValue(0); 
          break;
        default:
          setValue(0); 
          break;
      }
    }
  }, [stage]);

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
  }, [router, id]); // Add router and id to the dependency array

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
  };

  const handlePopUpOpen = () => {
    setOpen(true);
  };

  const handlePopUpClose = () => {
    setOpen(false);
    // setStatus(6)
  }

  const changeStatusHandler = (e)=>{
    setStatus(Number(e.target.value))
    handleStatusChange();
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
    const payload = { salonId: salonData?.id, status: status };
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
        <Box>
          <Tabs value={value} aria-label="basic tabs example"  onChange={handleChange}>
            <Tab label="Profile" {...a11yProps(0)}  />
            {stage === "3" || stage === "6" || stage === "7" || stage === "8" || stage === "9" ? (
              <Tab label="Certificate" {...a11yProps(1)} />
            ) : null}
            {stage === "6" || stage === "7" || stage === "8" || stage === "9" ? (
              <Tab label="Gallery" {...a11yProps(2)} />
            ) : null}
            {stage === "7" || stage === "8" || stage === "9" ? (
              <Tab label="Working" {...a11yProps(3)} />
            ) : null}
            {stage === "8" || stage === "9" ? (
              <Tab label="Users" {...a11yProps(4)} />
            ) : null}
            {stage === "9" ? (
              <Tab label="Services" {...a11yProps(5)} />
            ) : null}
          </Tabs>
        </Box>

        <Box>
          {value === 0 && <ProfileDetails />}
          {value === 1 && <Certificate />}
          {value === 2 && <Galary />}
          {value === 3 && <Slot />}
          {value === 4 && <User />}
          {value === 5 && <Services />}
        </Box>
      </Box>
    </Grid>
  );
}
