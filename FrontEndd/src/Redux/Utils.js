import axios from "axios";

  export default axios.create({
      baseURL: "https://waycab.devtitechnologie.pro/api/",
      // headers: {
      //     'api_password': 'Eld5TBhHgiIZgJk4c4VEtlnNxY'
      // }
  })
  export const url = "https://waycab.devtitechnologie.pro/api/" ;
  export const imgUrl = "https://waycab.devtitechnologie.pro/" ;

  //setCookie
  export const setCookie = (name, value, days) => {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  };

  //removeCookie
  export const removeCookie = (name) => {
    setCookie(name, '', -1);
  };
  
  //getCookie
  export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
