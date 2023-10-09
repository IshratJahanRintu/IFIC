//Live API_URL
// export const API_URL = "https://vivr.ificbankbd.com/smart_ivr_dev/public/index.php/";
// 220 Link
// export const API_URL = "http://192.168.11.220/smart_ivr/public/index.php/";
// Local Link
export const API_URL = "http://192.168.10.70/ificsivr/sivr/public/index.php/";
// export const MEDIA_FILE_PATH = 'https://vivr.ificbankbd.com/ccpro/vivr_content/';
export const APP_BASE_URL = "/sivr/"; //"/sivr/"
export const ALERT_INTERVAL = 300; //30 seconds
export const MAX_ALERT_COUNT = 6;
export const LOGIN_PHONE_API_URL = "login/phone";
export const LOGIN_PIN_API_URL = "login/pin";
export const LOGIN_AUTH_API_URL = "login/auth";
export const VIVR_DATA_API_URL = "vivr-data";
export const VIVR_FEEDBACK_URL = "ice";
export const LOGOUT_API_URL = "logout";
export const MANUAL_LOGOUT = "M";
export const IDLE_LOGOUT = "I";
export const ENGLISH = "EN";
export const BENGALI = "BN";
export const BENGALITEXT = "বাং";
export const SOUND_ON = "ON";
export const SOUND_OFF = "OFF";
export const SUCCESS_LOGIN_PHONE_ERROR_CODE = 1000;
export const SUCCESS_LOGIN_PIN_ERROR_CODE = 1002;
export const LENGTH_OF_PHONE_NUMBER = 10;
export const LENGTH_OF_PIN = 6;
export const DEFAULT_BULLETIN = "Welcome To IFIC Bank Visual IVR (VIVR)";
export const PREVIOUS_BUTTON_IMAGE = "left-arrow.png";
export const HOME_BUTTON_IMAGE = "home.svg";
export const SOUND_ON_BUTTON_IMAGE = "sound.svg";
export const SOUND_OFF_BUTTON_IMAGE = "mute.svg";
export const LOGOUT_BUTTON_IMAGE = "logout.svg";
export const BODY_FULL_BACKGROUND = "home-bg.jpg";
export const BODY_CENTER_BACKGROUND = "g-bg.svg";
export const BODY_CENTER_BACKGROUND_EN = "gplex_welcome-bg-en.png";
export const BODY_CENTER_BACKGROUND_BN = "gplex_welcome-bg-bn.png";
export const BODY_ISLAMIC_BACKGROUND_BN = "islamic.png";
export const BODY_CONVENTIONAL_BACKGROUND_BN = "conventional.png";
export const BODY_CENTER_BACKGROUND_LOGIN = "g-bg.svg";
export const BODY_FOOTER_BACKGROUND = "city-footer-bg.png";
export const CITY_BANK_URL = "https://www.ificbank.com.bd/";
export const YES = "Y";
export const NO = "N";
export const EXP_DATE='EXP_DATE';
export const  HOME_SUB = false;
export const BENGALI_DIGITS = {"0":"0", "1":"১", "2":"২", "3":"৩", "4":"৪", "5":"৫", "6":"৬", "7":"৭", "8":"৮", "9":"৯"};

export const LOGOUT_TEXT = {
    title: {
        "BN": "লগ আউট",
        "EN": "Logout"
    },
    message: {
        "BN": "আপনি কি লগ আউট করতে চান?",
        "EN": "Do you want to logout?",
    },
    label: {
        "YES": {
            "BN": "হ্যাঁ",
            "EN": "Yes"
        },
        "NO": {
            "BN": "না",
            "EN": "No"
        }
    }
};
export const CLOSE_POPUP = {
    "EN": "Close",
    "BN": "বন্ধ"
}
export const ICE_DISPLAY_TEXT = {
    "EN": "Please share your Visual IVR  Service experience with us ",
    "BN": "অনুগ্রহপূর্বক আপনার ভিজ্যুয়াল আইভিআর সেবার অভিজ্ঞতা আমাদের সাথে শেয়ার করুন"
}
export const SESSION_TIMEOUT_TEXT = {
    title: {
        "BN": "",
        "EN": ""
    },
    message: {
        "EN": "Your session will be timeout ",
        "BN": " দুঃখিত, আপনার সময়সীমার মেয়াদটি শেষ হতে যাচ্ছে "
    },
    label: {
        "EN": "Close",
        "BN": "বন্ধ"
    }
}
export const SESSION_TIMEOUT = {
    "EN": "Session Timeout",
    "BN": "নির্ধারিত সময়সীমা "
}
export const YES_TEXT = {
    "EN": "Happy",
    "BN": "সন্তুষ্ট"
};
export const NO_TEXT = {
    "EN": "Unhappy",
    "BN": "অসন্তুষ্ট"
};
export const FEEDBACK_PLAYLIST = {
    "EN": ["audio/7_Please_share_your_Visual_IVR_Service_experience_with_us_EN.wav"],
    "BN": ["audio/7_Please_share_your_Visual_IVR_Service_experience_with_us_BN.wav"]
};
export const SESSION_TIMEOUT_PLAYLIST = {
    "EN": ["audio/Your_session_will_expire_soon_EN.wav"],
    "BN": ["audio/Your_session_will_expire_soon_BN.wav"]
}
export const LINK_TIMEOUT_ERROR_MSG = {
    "EN": "Sorry, Link has been expired",
    "BN": "দুঃখিত, লিঙ্কটির মেয়াদ শেষ হয়ে গেছে"
};
export const LOGIN_PLAYLIST = {
    "EN": ["audio/12_Welcome_to_Gplex_Visual_IVR_Service_n_EN.wav"],
    "BN": ["audio/12_Welcome_to_Gplex_Visual_IVR_Service_n_BN.wav"]
}

export const BLANK_PLAYLIST = {
    "EN": ["audio/BN/blank1sec.wav"],
    "BN": ["audio/EN/blank1sec.wav"]
}

export const GREETINGS = {
    "EN": "Welcome",
    "BN": "স্বাগতম"
}
