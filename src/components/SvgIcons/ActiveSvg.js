import * as React from "react";
const ActiveSvg = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 16 16"
    fill={props.fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 7.33333L8 9.33333L13.3333 4"
      stroke={props.fill}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3334 8.00008V12.0001C13.3334 12.3537 13.1929 12.6928 12.9428 12.9429C12.6928 13.1929 12.3536 13.3334 12 13.3334H4.00002C3.6464 13.3334 3.30726 13.1929 3.05721 12.9429C2.80716 12.6928 2.66669 12.3537 2.66669 12.0001V4.00008C2.66669 3.64646 2.80716 3.30732 3.05721 3.05727C3.30726 2.80722 3.6464 2.66675 4.00002 2.66675H10"
      stroke={props.fill}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ActiveSvg