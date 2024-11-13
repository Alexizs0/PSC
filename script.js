import requests
import json

def handler(event, context):
    # Retrieve the URL parameter
    url = event['queryStringParameters'].get('url', None)
    if not url:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing "url" parameter'})
        }

    try:
        # Log the URL to ensure it's being passed correctly
        print(f"Fetching URL: {url}")

        # Send a GET request to the target URL
        response = requests.get(url)

        # Log the status code and response to help debug
        print(f"Response status code: {response.status_code}")
        
        # If the request was successful, return the response content
        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': response.headers.get('Content-Type', 'text/html'),
                    'Access-Control-Allow-Origin': '*',  # Allow CORS
                    'X-Frame-Options': 'ALLOWALL',  # Bypass iframe restrictions
                    'Content-Security-Policy': 'default-src *; script-src *; style-src *',  # Relax CSP
                },
                'body': response.text  # Return the HTML content
            }
        else:
            # If the response wasn't successful, return the error status
            return {
                'statusCode': response.status_code,
                'body': json.dumps({'error': 'Failed to fetch the URL'})
            }
    
    except requests.exceptions.RequestException as e:
        # Log the error in case of network issues or other exceptions
        print(f"Error fetching URL: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Failed to fetch the URL: {str(e)}'})
        }
