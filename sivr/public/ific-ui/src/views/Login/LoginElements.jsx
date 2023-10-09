export const getLoginPhoneElements = (language) => {
    let greetings = null;
    if (language === 'EN') {
        greetings = "Welcome";
    } else {
        greetings = "স্বাগতম";
    }
    let elementsData = {
        "language": language,
        "pageHeading": {
            "EN": "Welcome",
            "BN": "স্বাগতম"
        },
        "headingSize": 2,
        "pageContent": [
            {
                "elementId": null,
                "elementValue": null,
                "elementType": "input",
                "inputProperties": {
                    "name": "cli",
                    "type": "number",
                    "maxLength": 11,
                    "minLength": 11,
                    "maxValue": null,
                    "minValue": null,
                    "regex": "/^[0-9]{10,16}$/",
                    "placeholder": {
                        "EN": "1XXXXXXXXX",
                        "BN": "1XXXXXXXXX"
                    },
                    "isRequired:": true,
                    "isChecked": false,
                    "isSelected": false,
                    "maxTry": 3,
                    "eventHandler": null
                },
                "displayTextEN": "Please enter your Mobile Number",
                "displayTextBN": "অনুগ্রহ করে আপনার মোবাইল নাম্বার প্রবেশ করান।",
                "textColor": "#FFFFFF",
                "elementOrder": "1"
            },
            {
                "elementId": null,
                "elementValue": null,
                "elementType": "button",
                "displayTextEN": "Login",
                "displayTextBN": "লগইন",
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

