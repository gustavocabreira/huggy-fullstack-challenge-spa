# Huggy Fullstack Challenge

### Candidato: Gustavo de Sousa Cabreira
### Vaga: Pessoa Desenvolvedora Fullstack (PHP + Vue.js)

## Sobre o projeto

Aplicação em Vue.js para gerenciar os contatos de um usuário. É possível cadastrar, atualizar, excluir e recuperar informações de contato por meio de uma interface simples e segura.

## Tecnologias Utilizadas

- Vue.js
- Tailwind 4
- Vite
- Pinia

## Instalação

### Requisitos

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Deverá ter as portas `80` e `8080` abertas e desocupadas.

Para fins de simuação mais próxima possível de um ambiente de produção, o servidor nginx está configurado para uso de subdomínios localhost:

- http://spa.localhost.com
- http://api.localhost.com

Então é necessário adicionar esses domínios ao /etc/hosts da maquina host:

```bash
echo -e "127.0.0.1 api.localhost.com\n127.0.0.1 web.localhost.com" | sudo tee -a /etc/hosts
```

Caso você esteja utlizando o Windows, você pode adicionar o arquivo hosts.txt no seu diretório de usuário.

### Executando o projeto

1. Crie a network `internal` e `spa` com os seguintes comandos:

```bash
docker network create internal
docker network create spa
```

2. Clone o repositório

```bash
git clone https://github.com/gustavocabreira/huggy-fullstack-challenge-spa.git
```

3. Entre na pasta do projeto

```bash
cd huggy-fullstack-challenge-spa
```

4. Gere o arquivo .env
```
cp .env.example .env
```

5. Atualize sua `.env`, na raiz do projeto, com o número do Twilio
```
VITE_TWILIO_CALLER_ID=<número>
```

6. Execute o comando para instalar o projeto

```bash
docker compose up -d --build
```