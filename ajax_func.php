<?php
function misterbr_beehiiv_ajax_for_subscribe(): void
{
    $api_key = $_POST['api_key'];
    $publication_id = $_POST['publication_id'];
    $email = $_POST['email'];
    $utm_source = $_POST['utm_source'];
    $utm_medium = $_POST['utm_medium'];
    $utm_campaign = $_POST['utm_campaign'];
    $referring_site = $_POST['referring_site'];

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.beehiiv.com/v2/publications/' . $publication_id . '/subscriptions',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
"publication_id": "' . $publication_id . '",
"email": "' . $email . '",
"utm_source": "' . $utm_source . '",
"utm_medium": "' . $utm_medium . '",
"utm_campaign": "' . $utm_campaign . '",
"referring_site": "' . $referring_site . '"
}',
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $api_key,
            'Content-Type: application/json',
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);

    wp_send_json_success([
        'status' => 'success',
        'message' => 'Subscribed successfully',
        'data' => $response
    ]);
}

add_action('wp_ajax_nopriv_misterbr_beehiiv_ajax_for_subscribe', 'misterbr_beehiiv_ajax_for_subscribe');
add_action('wp_ajax_misterbr_beehiiv_ajax_for_subscribe', 'misterbr_beehiiv_ajax_for_subscribe');
