# Projeto Despesas - OnFly

![Drag Racing](./assets-doc/main-logo.png)

Make with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1111px-Love_Heart_symbol.svg.png"
  width="22"
  height="22"> by [Lucas C Correa](https://github.com/lucascco)

## Como executar local

### Requisitos

- Node versão 18
- Docker
- Insomnia ou Postman

### Para iniciar o serviço do banco de dados com o docker, rode o comando abaixo na raiz do projeto

```
$ docker compose up -d
```

### Instale as dependencias do projeto

```
$ yarn
```

### Execute as migrartions para criar as tabelas no banco de dados

```
$ yarn migration:run
```

### Execute o projeto no modo dev

```
$ yarn dev
```

### Abra a coleção de requisições para chamar as rotas (Insomnia ou Postman)

Na raiz do projeto você vai encontrar o json com as requisições para a API, voce pode importar usando o Insomnia ou o Postman.
