import http.server

FILE = 'model_smart_tron.html'
PORT = 8000


class TestHandler(http.server.SimpleHTTPRequestHandler):
    """The test example handler."""

    def do_POST(self):
        content_length = int(self.headers.getheader('content-length'))
        body = self.rfile.read(content_length)
        try:
            result = json.loads(body, encoding='utf-8')
            # process result as a normal python dictionary
            ...
            self.wfile.write('Request has been processed.')
        except Exception as exc:
            self.wfile.write('Request has failed to process. Error: %s', exc.message)
        # """Handle a post request by returning the square of the number."""
        # print(self.headers)
        # length = int(self.headers.get_all('content-length')[0])
        # print(self.headers.get_all('content-length'))
        # data_string = self.rfile.read(length)
        # print(data_string)
        # self.send_response(200)
        # self.send_header("Content-type", "text/plain")
        # self.end_headers()
        # self.flush_headers()
        # self.wfile.write(data_string.encode())


def start_server():
    """Start the server."""
    server_address = ("", PORT)
    server = http.server.HTTPServer(server_address, TestHandler)
    print('ueeea')
    server.serve_forever()


start_server()
