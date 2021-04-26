import http.server
import json
import random
import mysql.connector

FILE = 'model_smart_tron.html'
PORT = 8000

class TestHandler(http.server.SimpleHTTPRequestHandler):
    """The test example handler."""

    def do_POST(self):

        true = True
        false = False
        """Handle the smart tron movement request by returning the keys to press/release."""
        length = int(self.headers.get_all('content-length')[0])
        data_string = self.rfile.read(length)
        data = json.loads(data_string)
        data = eval(data)
        print(data)
        print("------")

        # AQUI VAN LOS CALCULOS DEL MODELO
        turn = str(int(random.random()*3))

        #Guardamos los datos en player/ref_matches_players
        if data['player1_step'] == 0:
            try:
                cursor = connection.cursor()
                mySql_insert_query = """INSERT INTO players (name)
                                        SELECT (%s)
                                        WHERE NOT EXISTS (SELECT name FROM players WHERE name = %s) LIMIT 1;"""
                record = (data['player1_name'],data['player1_name'])
                cursor.execute(mySql_insert_query, record)
                connection.commit()
                cursor.close()
            except mysql.connector.Error as error:
                print("Failed to insert record into players table {}".format(error))


            try:
                cursor = connection.cursor()
                mySql_insert_query = """INSERT INTO ref_matches_players(idMatch,idPlayer) VALUES (
                                        (SELECT MAX(id) FROM matches),
                                        (SELECT MAX(id) FROM players WHERE name ='""" + data['player1_name'] + """')
                                        )"""
                print(mySql_insert_query)
                cursor.execute(mySql_insert_query)
                connection.commit()
                cursor.close()
            except mysql.connector.Error as error:
                print("Failed to insert record into ref_matches_players table {}".format(error))

        #For all steps
        try:
            cursor = connection.cursor()
            mySql_insert_query = """INSERT INTO steps(idMatchPlayer, x, y, direction, `left`, `right`, step) VALUES (
                                   (SELECT MAX(ref.id) from ref_matches_players as ref
                                    INNER JOIN players as p
                                    ON ref.idPlayer = p.id and p.name = '""" + data['player1_name'] + """'), %s, %s, %s, %s, %s, %s) """

            record = [float(data["player1_x"]), float(data["player1_y"]),float(data["player1_angle"]), str(data["player1_left"]),str(data["player1_right"]),int(data["player1_step"])]
            print(record)
            cursor.execute(mySql_insert_query, record)
            connection.commit()
            cursor.close()
        except mysql.connector.Error as error:
            print("Failed to insert record into steps table {}".format(error))

        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.flush_headers()
        #turn_left = '0'
        #turn_right = '1'
        #keep_straight = '2'


        self.wfile.write(turn.encode())


def start_server():
    """Start the server."""
    server_address = ("", PORT)
    server = http.server.HTTPServer(server_address, TestHandler)
    server.serve_forever()



#De momento como hay que crear el servidor a cada partida cuando empieza guardamos
# datos en matches
try:
    connection = mysql.connector.connect(host='localhost',
                                         database='smarttron',
                                         user='root',
                                         password='')
    cursor = connection.cursor()
    mySql_insert_query = """INSERT INTO matches(name)
                           VALUES('test') """

    record = 'test'
    cursor.execute(mySql_insert_query, record)
    connection.commit()
    cursor.close()
    start_server()
except mysql.connector.Error as error:
    print("Failed to insert record into matches table {}".format(error))

finally:
    if connection.is_connected():
        connection.close()
        print("MySQL connection is closed")
