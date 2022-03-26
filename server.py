
from gevent import monkey # fixes thread issue
monkey.patch_all() # ^
from flask import Flask
from scraper import *

app = Flask(__name__)


c = open('cached_users.json')
cached_users = json.load(c)

#### EXAMPLE ROUTE
@app.route("/programmers") 

def programmers():
    return {"programmers": ["henry", "ryan", "wasay", "angela"]}
####

@app.route('/user/<id>') # /user route
def user(id): 
    if(id == "test"):
        print("returning test data")
        f = open('test.json')
        dat = json.load(f)
        return dat
    if(id in cached_users["usernames"]):
        print("returning cached userdata:", id)
        f = open('test.json')
        dat = json.load(f)
        return dat

    data = scrape(id) # calls scraper function with id parameter
    with open(id+'.json', 'w') as fp: # saves to cache
        json.dump(data, fp,  indent=4)
    with open('cached_users.json', 'w') as fp: # saves to cache
        cached_users["usernames"] += [id]
        json.dump(cached_users, fp,  indent=4)
    return data



@app.route('/audio/<id>') # /audio route
def song(id): 
    audio_data = get_audio(id)
    print("song get", audio_data)
    return audio_data





if __name__ == "__main__": # entry point
    app.run(debug=False)