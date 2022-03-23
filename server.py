
from gevent import monkey # fixes thread issue
monkey.patch_all() # ^
from flask import Flask
from scraper import *

app = Flask(__name__)

#### EXAMPLE ROUTE
@app.route("/programmers") 

def programmers():
    return {"programmers": ["henry", "ryan", "wasay", "angela"]}
####

@app.route('/user/<id>') # /user route
def user(id): 
    if(id == "test"):
        print("returning test data")
        f = open('taylor.json')
        dat = json.load(f)
        return dat
    data = scrape(id) # calls scraper function with id parameter
    #print("here's the data: ", data)
    return data


if __name__ == "__main__": # entry point
    app.run(debug=False)