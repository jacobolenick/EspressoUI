import http.server, os, socketserver

os.chdir('/Users/jacobolenick/Documents/Claude')

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

with socketserver.TCPServer(('', 3456), Handler) as httpd:
    httpd.serve_forever()
