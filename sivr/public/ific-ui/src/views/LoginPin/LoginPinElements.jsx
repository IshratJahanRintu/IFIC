import {BENGALI, ENGLISH} from "../../config/Constants";

export const getLoginPinElements = (language) => {
    if(language !== ENGLISH && language !== BENGALI){
        language = ENGLISH;
    }

    let greetings = null;
    if (language === ENGLISH) {
        greetings = "Welcome";
    } else {
        greetings = "স্বাগতম";
    }

    const elementsData = {
        "language": language,
        "pageHeading": {
            "EN": "Login",
            "BN": "লগইন"
        },
        "headingSize": 2,
        "pageContent": [
            {
                "elementId": null,
                "elementValue": null,
                "elementType": "input",
                "inputProperties": {
                    "name": "pin",
                    "type": "password",
                    "maxLength": 6,
                    "minLength": 6,
                    "maxValue": null,
                    "minValue": null,
                    "regex": "/^[0-9]{6}$/",
                    "placeholder": {
                        "EN": "OTP (One Time Password)",
                        "BN": "ওটিপি (ওয়ান টাইম পাসওয়ার্ড)"
                    },
                    "isRequired:": true,
                    "isChecked": false,
                    "isSelected": false,
                    "maxTry": 3,
                    "eventHandler": null
                },
                "displayTextEN": "Please Enter OTP (One Time Password)",
                "displayTextBN": "অনুগ্রহ করে ওটিপি (ওয়ান টাইম পাসওয়ার্ড) প্রবেশ করান",
                "textColor": "#FFFFFF",
                "elementOrder": "1"
            },
            {
                "elementId": null,
                "elementValue": null,
                "elementType": "button",
                "displayTextEN": "Next",
                "displayTextBN": "পরবর্তী",
                "backgroundColor": "#DF1E26",
                "textColor": "#FFFFFF",
                "onClickHandler": null,
                "elementOrder": "2"
            }

        ],
        "previousPage": null,
        "homePage": null
    };

    const loginPhoneElements = {
        greetings: greetings,
        elementsData: elementsData
    }
    return loginPhoneElements;
}

