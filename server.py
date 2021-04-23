import http.server
import json

FILE = 'model_smart_tron.html'
PORT = 8000


class TestHandler(http.server.SimpleHTTPRequestHandler):
    """The test example handler."""

    def do_POST(self):
        """Handle the smart tron movement request by returning the keys to press/release."""
        length = int(self.headers.get_all('content-length')[0])
        data_string = self.rfile.read(length)
        data = json.loads(data_string)
        print(data)

        # AQUI VAN LOS CALCULOS DEL MODELO

        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.flush_headers()

        turn_left = '0'
        turn_right = '1'
        keep_straight = '2'
        self.wfile.write(turn_right.encode())


def start_server():
    """Start the server."""
    server_address = ("", PORT)
    server = http.server.HTTPServer(server_address, TestHandler)
    server.serve_forever()


start_server()
