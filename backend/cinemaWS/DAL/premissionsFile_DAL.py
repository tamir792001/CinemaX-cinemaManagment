import os
import sys
import json

class Premissions_File_DAL:
    def __init__(self):
        self.__path = os.path.join(os.path.dirname(sys.argv[0]), "files/Premissions.json")
    
    def read_file(self):
        try:
            with open(self.__path, "r") as f:
                data = json.load(f)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Read-File (of Premissions_File_DAL)", "code" : 500}
        else:
            return {"data" : data}

    def write_file(self, data):
        try:
            with open(self.__path, "w") as f:
                json.dump(data, f)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Write-File (of Premissions_File_DAL)", "code" : 500}
        else:
            return {"data" : "Premissions.json Updated"}

    