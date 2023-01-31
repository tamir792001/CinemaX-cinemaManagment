from datetime import datetime, timedelta
import time
import jwt

key = "secret"
algo = "HS256"
payload = {
    "name": "avi",
    "createdAt" : str(datetime.now()),
    "exp" : datetime.utcnow() 
}


token = jwt.encode(payload,key, algo)
print(token)
time.sleep(2)
print(datetime.utcnow() == payload["exp"])
try:
    p = jwt.decode(token, key, algo)
except jwt.exceptions.ExpiredSignatureError:
    print("the token passed out")
else:
    print(p)