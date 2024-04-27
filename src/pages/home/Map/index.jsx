import React from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";
// Define a Marker component with custom styling
const Marker = ({ lat, lng,text }) => (
  <div style={{ color: "red", fontWeight: "bold", fontSize: "20px"  }}>
    <RoomIcon style={{ fontSize: "50px" }} />
  </div>
);

export default function FullMap({ salonSalesByLocation }) {
  //   const defaultCenter = {
  //     lat: lat,
  //     lng: lng
  //   };

  const defaultCenter = {
    lat: 28.535517,
    lng: 77.391029,
  };
  const defaultZoom = 2;

  const mapOptions = {
    styles: [
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  return (
    <div style={{ height: "380px", width: "100%", borderRadius: "10px" ,}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={defaultCenter}
        zoom={defaultZoom}
        options={mapOptions}



      >
        {/* Render the Marker component at the specified coordinates */}
        {salonSalesByLocation.map((location, index) => (
        <Marker
          key={index}
          lat={location.cityLatitude}
          lng={location.cityLongitude}
          text={location.cityName}
        />
        ))}
      </GoogleMapReact>
    </div>
  );
}
