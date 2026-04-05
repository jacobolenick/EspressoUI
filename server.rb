require 'webrick'

server = WEBrick::HTTPServer.new(
  Port: 3456,
  DocumentRoot: File.dirname(__FILE__),
  Logger: WEBrick::Log.new('/dev/null'),
  AccessLog: []
)

trap('INT') { server.shutdown }
server.start
