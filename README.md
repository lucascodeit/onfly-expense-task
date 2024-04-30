# Projeto Despesas - OnFly

![Drag Racing](./assets-doc/main-logo.png)

Make with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1111px-Love_Heart_symbol.svg.png"
  width="22"
  height="22"> by [Lucas C Correa](https://github.com/lucascco)

## Como executar local

### Requisitos

- Node versão 18 (É necessario estar na versão 18 para rodar as migrations)
- Docker
- Insomnia ou Postman

### Para iniciar o serviço do banco de dados com o docker, rode o comando abaixo na raiz do projeto

```sh
$ docker compose up -d
```

### Instale as dependencias do projeto

```sh
$ yarn
```

### Criar o arquivo .env e copie o conteudo do env.example para o .env

### Execute as migrartions para criar as tabelas no banco de dados

```sh
$ yarn migration:run
```

### Execute o projeto no modo dev

```sh
$ yarn dev
```

### Abra a coleção de requisições para chamar as rotas (Insomnia ou Postman)

Na raiz do projeto você vai encontrar o json com as requisições para a API, voce pode importar usando o Insomnia ou o Postman. Originalmente as reqisições foram criadas pelo Insomnia, por isso pode haver alguns problemas na importação pelo Postman.

### Testes

#### Para rodar os testes de integração siga as etapas a seguir

Execute as migrations no banco de teste

```sh
yarn migration:run:test
```

Execute o comando de testes de integração

```sh
yarn integration:test
```

É necessário limpar o banco de testes para refazer os testes de integração

#### Para rodar os testes unitarios

```sh
yarn test
```
