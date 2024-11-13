import requests
import json

def handler(event, context):
    url = event['queryStringParameters'].get('url', None)

    if not url:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Missing "url" parameter'})
        }

    try:
        # Send the request to the target URL
        response = requests.get(url)

        # If the website uses X-Frame-Options or CSP headers, we may need to bypass or relax them
        headers = {
            'Content-Type': response.headers.get('Content-Type', 'text/html'),
            'Access-Control-Allow-Origin': '*',  # Allow cross-origin requests
            'X-Frame-Options': 'ALLOWALL',  # Allow the content to be embedded
            'Content-Security-Policy': 'default-src *; script-src *; style-src *',  # Relax CSP headers
        }

        return {
            'statusCode': response.status_code,
            'headers': headers,
            'body': response.text  # Return the HTML content as text
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
