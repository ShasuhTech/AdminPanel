import React from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";
// Define a Marker component with custom styling
const Marker = ({ text }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
    }}
  >
    <RoomIcon style={{ color: "red", fontSize: "50px" }} />
  </div>
);

export default function SimpleMap({ lat, lng }) {
  console.log(lat, lng, "---sdasd");

  const defaultCenter = {
    lat: lat,
    lng: lng,
  };
  const defaultZoom = 11;

  return (
    <div
      style={{
        height: "380px",
        width: "100%",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
        {/* Render the Marker component at the specified coordinates */}
        <Marker
          lat={defaultCenter.lat}
          lng={defaultCenter.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
