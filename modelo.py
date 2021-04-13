import cgi, cgitb
import json
import sys

def TryAgain():
    data = cgi.FieldStorage()
    output = {"a":"15","b":"17"}
    print('uee')
    return 'ueee'


TryAgain()
