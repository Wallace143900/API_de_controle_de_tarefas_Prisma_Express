# M5 - Entrega 1 - Gerenciamento de Tarefas API

Está documentação servirá de base para entrega, todas as rotas deverão se comportar assim como está previsto na documentação abaixo:

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "categoryId?": 1,
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks

Padrão de resposta  (STATUS: 200)

```json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": false,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]  
```

URL Search Params

| Parâmetro | Exemplo de uso | Descrição |
| ------ | ------ | ------ |
| category | /tasks?category=estudo | Forneça o "id" da categoria para trazer somente tarefas da categoria determinada |

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

### Leitura de individual GET /tasks/:1

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "category": {
        "id": 1,
        "name": "Estudo"
    }
}   
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo 

```json
{
    "title?": "Lorem ipsum",
    "content?": "Lorem ipsum",
    "finished?": true,
    "categoryId?": 1,
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": true,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa PATCH /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

### Criação de categoria POST /categories

Padrão de corpo

```json
{
    "name": "Example",
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "Example",
}
```

#### Possíveis erros:

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria POST

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```