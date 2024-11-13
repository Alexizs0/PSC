import json
import requests
from urllib.parse import urlparse

def handler(request):
    url = request.args.get('url')
    if not url:
        return {"statusCode": 400, "body": json.dumps({'error': 'No URL provided'})}

    try:
        # Fetch the content from the target URL
        response = requests.get(url)
        if response.status_code == 200:
            return {"statusCode": 200, "body": json.dumps({'html': response.text})}
        else:
            return {"statusCode": response.status_code, "body": json.dumps({'error': 'Failed to fetch content'})}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({'error': str(e)})}
