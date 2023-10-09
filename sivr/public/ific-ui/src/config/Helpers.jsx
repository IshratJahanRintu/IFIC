import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const isLoggedIn = () => {
    if ((typeof (cookies.get('token')) !== "undefined")) {
        return true;
    }
    return false;
}


export const isDevice = () =>{
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}