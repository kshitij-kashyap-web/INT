import requests

while True:
    requests.post("http://localhost:3000/api/data", json={
        "device_id": "attacker",
        "packet_size": 800,
        "request_count": 20
    })
    print("Attack data sent")