import {API_URL} from "../config/Constants";
import Axios from "axios";
import { JSEncrypt } from 'jsencrypt'

export const vivrDataCall = async (url, data, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    if(token){
        data.token = token ;
    }
    const response = await Axios.post(API_URL + url, data, config);
    // console.log(response.data);
    return response.data;


    // try {
    //     const pub_key = `-----BEGIN PUBLIC KEY-----
    // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlyo7wxNRU0oCwzge9qDm
    // ntOhXPpR43n2uo3+YVdB3bS/1PzNcNGyzKHgmZYgNNwYD32KdCKF+U6JwG5zYQ+L
    // 81Y6xwNNyTGz7Yz/iTLEYXOcM6ftZcbI8BZdnsuGutVELMMkgSgiRi2S/AXpc1oV
    // +B5mvWfhBSrP8TOasgxgWLshGIPCol/NaCJ0tDK0LdEASuTsczd492kBsraoFxuL
    // +sVjrjF/oD7QDhT8zz1pZn/lptwIGgCkTEZlxSyUzQc+uy0JmCIUt+vj5A4k5WdK
    // QsWLI9fZUgEP/maqHoj//isjmAOStLyxdUiVXqniv7e+6hZUZQiCITrKR2ffOjBE
    // oe6+6pjSBCpmGaYDjDdxJ1oB0SzYGv05pMZoiekZ2IqHaGAMl+Re/fYPa7LPyNd2
    // xImQGq6Ppz4M0j7H2f9M7zFHMCVTQsNh/s0u8xAQBCrAFfCyXGE/0JglFW65bBp+
    // Ny/1oQCI/GHJY93A8+Y9Q26FGZ80rml6ow00FbSBXaj5KYLhH7X12SCEp/t5dena
    // PpZZSZhP6MHihoVA7wtV0nHJKbpNeGpozSHUTl6Wa4asz/37airhhwc0VG0Ft84B
    // +18v1baiSuws1JtXOEWtwXWphCpaji+/lCzjPKbRrWc52LQGhj1I9K7tG+3cu9g0
    // +usr98P3lh7Utk8LZh2d7QsCAwEAAQ==
    // -----END PUBLIC KEY-----`;

    //     const config = {
    //         headers: {Authorization: `Bearer ${token}`}
    //     };
    //     let vivrInfo = {
    //         data: JSON.parse(JSON.stringify(data)),
    //         key:data.key,
    //         token: token,
    //       };
      
    //       const encrypt = new JSEncrypt()
    //       encrypt.setPublicKey(pub_key)
    //       vivrInfo.data = encrypt.encrypt(JSON.stringify(vivrInfo.data));
    //       const response = await Axios.post(API_URL + url, vivrInfo, config);
    //       return response.data;
    // } catch (error) {
    //     console.log("ErrorPage Occurred:");
    //     console.log(error);
    // }
}
