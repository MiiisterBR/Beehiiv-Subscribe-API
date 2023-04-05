//set debug to true to log data to the console
const debug = false;

//set up constants for the API key and publication ID
const api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const publication_id = "pub_xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx";

// Set up constants for UTM tracking parameters and the referring site URL
const utm_source = 'Homepage';
const utm_medium = 'Website';
const utm_campaign = 'Subscribe';
const referring_site = document.location.href;

// Wait for the document to finish loading
document.addEventListener("readystatechange", (event) => {
    // Select all elements with the class "wpcf7-submit"
    // When the document is fully loaded
    if (event.target.readyState === "complete") {
        const elements = document.querySelectorAll(".wpcf7-submit");
        // For each "wpcf7-submit" element
        for (let i = 0; i < elements.length; i++) {
            //add a click event listener
            elements[i].addEventListener("click", (event) => {
                //prevent the default form submission behavior
                event.preventDefault();

                //set up constants for the URL, email address, and data payload
                const url = document.location.origin + '/wp-admin/admin-ajax.php';
                const emails = document.querySelectorAll(".wpcf7-email");
                let email = '';
                for (let i = 0; i < emails.length; i++) {
                    if (emails[i].value) {
                        email = emails[i].value;
                    }
                }
                const data = {
                    action: "misterbr_beehiiv_ajax_for_subscribe",
                    reactivate_existing: false,
                    send_welcome_email: false,
                    publication_id,
                    referring_site,
                    utm_campaign,
                    utm_medium,
                    utm_source,
                    api_key,
                    email,
                };

                //log the current page title and data to the console

                if (debug) {
                    console.log('__________________');
                    console.log('Email: ' + email);
                    console.log('Title: ' + document.title.replace("WGMI Media -", "").replace("- WGMI Media", "").trim());
                    console.debug(data);
                    console.log('__________________');
                }
                //clear the email input field
                clearInputs();

                //show a success message
                showSuccessMessage(i);

                //if the email address is not empty
                if (email) {
                    //send a POST request with the data payload to the URL
                    jQuery.post(url, data, function (response) {
                        if (debug) {
                            //log the response to the console
                            console.log(response);
                        }
                    });
                } else {
                    //if the email address is empty, show an alert
                    alert('Please enter your email address');
                }
            })
        }
    }
})

// Function to clear the email input field
function clearInputs() {
    const inputs = document.querySelectorAll(".wpcf7-email");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

// Function to show a success message
function showSuccessMessage(i) {
    const successMessage = document.querySelectorAll(".wpcf7-response-output");
    successMessage[i].innerHTML = "Subscribed successfully";
    successMessage[i].style.borderBottomColor = "none";
    successMessage[i].style.borderRightColor = "none";
    successMessage[i].style.borderLeftColor = "none";
    successMessage[i].style.borderTopColor = "none";
    successMessage[i].style.color = "#2db100";
    successMessage[i].style.border = "none";
    successMessage[i].style.padding = "0";
    successMessage[i].style.margin = "0";
    successMessage[i].style.marginTop = "-11px";
    successMessage[i].style.display = "block";
}