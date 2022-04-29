# ControlCow

Para rodar Api local

Configuração url caso for rodar emulador ou device
Caso for utilizar direto no emulador:
http://10.0.2.2:3000/

Caaso for utilizar direto no device e necessario pegar o ipv4 da sua rede para pode utilizar e que o celular esteja conectado também na rede
http://192.168.xx.xx:3000/

comandos para rodar json-server:

Rodar no emulador pode inserir esse comando direto no terminal
json-server --watch db.json

Rodar no Device deve inserir host ipv4 da rede que e o mesmo que celular esta conectado
json-server --host 192.168.15.56 --watch db.json