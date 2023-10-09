export const getErrorElements = (language) => {
    let elementsData = {
        "language": language,
        "pageHeading": {
            "EN": "Sorry. Page Not Found!",
            "BN": "দুঃখিত। পেজটি পাওয়া যায়নি!"
        },
        // "headingSize": 2,
        "pageContent": [
            // {
            //     "elementId": null,
            //     "elementValue": null,
            //     "elementType": "button",
            //     "displayTextEN": "Previous Menu",
            //     "displayTextBN": "পূর্ববর্তী মেনু",
            //     "backgroundColor": "#DF1E26",
            //     "textColor": "#FFFFFF",
            //     "onClickHandler": null,
            //     "elementOrder": "2"
            // }

        ],
        "previousPage": null,
        "homePage": null
    };
    const errorElements = {
        elementsData: elementsData
    }
    return errorElements;
}
