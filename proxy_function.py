import json
import requests

def handler(request):
    # Get the URL passed as a query parameter
    url = request.args.get('url')

    if not url:
        return {"statusCode": 400, "body": json.dumps({'error': 'No URL provided'})}

    try:
        # Fetch content from the URL
        response = requests.get(url)

        if response.status_code == 200:
            return {
                "statusCode": 200,
                "body": json.dumps({'html': response.text})
            }
        else:
            return {
                "statusCode": 500,
                "body": json.dumps({'error': 'Failed to fetch content'})
            }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({'error': str(e)})
        }

