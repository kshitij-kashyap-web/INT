import requests
import time

while True:
    requests.post("http://localhost:3000/api/data", json={
        "device_id": "device_1",
        "packet_size": 100,
        "request_count": 2
    })
    print("Normal data sent")
    time.sleep(5)