import { useEffect } from "react";

export const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const getCookie = (name) => {
  if (typeof document === 'undefined') {
    return null; // Return null if running in a non-browser environment
  }

  const nameEQ = name + '=';
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (const cookie of cookies) {
    let c = cookie.trim();

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }

  return null;
};

export const eraseCookie = (name) => {
  // Erase cookie by setting its expiration date to a past date
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

  

