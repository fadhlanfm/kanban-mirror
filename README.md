A simple kanban application.
Tech stacks: node.js, express, postgres, sequelize, google oauth, bcrypt, cors, dotenv, jsonwebtoken, axios, vue

## Client:

## [https://kanban-app-20912.web.app](https://kanban-app-20912.web.app)

## Server:

## [https://nameless-hollows-14961.herokuapp.com](https://nameless-hollows-14961.herokuapp.com)

## REST endpoint

- [POST /signup](#post-signup)
- [POST /signin](#post-signin)
- [POST /tasks](#post-tasks)
- [GET /tasks](#get-tasks)
- [GET /tasks/:id](#get-tasksid)
- [PUT /tasks/:id](#put-tasksid)
- [DELETE /tasks/:id](#delete-tasksid)

---

> ## POST /signup

Sign up and create a new account

### Requests

#### _Header_

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_

```json
{
  "email": "john@gmail.com",
  "password": "<your password>"
}
```

### Responses

#### _Status 201 Created_

```json
{
  "id": 2,
  "email": "john@gmail.com",
  "password": "<your hashed password>",
  "updatedAt": "2020-05-08T10:04:52.518Z",
  "createdAt": "2020-05-08T10:04:52.518Z",
  "organization": "Hacktiv8"
}
```

#### _Status 400 Bad Request_

```json
{
  "messages": [
    "Please enter the correct email address",
    "Please enter your password"
  ]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## POST /signin

Sign in with email & password account

### Requests

#### _Header_

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_

```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

### Responses

#### _Status 200 OK_

```json
{
  "access_token": "<your access token>"
}
```

#### _Status 400 Bad Request_

```json
{
  "messages": ["Invalid email/password"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## POST /tasks

Create a new task

### Requests

#### _Header_

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "<your access token>"
}
```

#### _Body_

```json
{
  "title": "Test all features",
  "category": "back-log" || "to-do" || "done" || "completed"
}
```

### Responses

#### _Status 201 Created_

```json
{
  "id": 1,
  "title": "Test all features",
  "category": "done",
  "UserId": 1,
  "updatedAt": "2020-05-08T10:09:35.368Z",
  "createdAt": "2020-05-08T10:09:35.368Z"
}
```

#### _Status 400 Bad Request_

```json
{
  "messages": [
    "Title can't be empty",
    "Must be back-log, to-do, done, or completed"
  ]
}
```

#### _Status 403 Forbidden_

```json
{
  "messages": ["Please sign in first"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## GET /tasks

Get all tasks

### Requests

#### _Header_

```json
{
  "access_token": "<your access token>"
}
```

#### _Body_

```json
not needed
```

### Responses

#### _Status 200 OK_

```json
[
  {
    "id": 3,
    "title": "Pull Request",
    "category": "back-log",
    "UserId": 3,
    "createdAt": "2020-05-08T10:35:01.484Z",
    "updatedAt": "2020-05-08T10:35:01.484Z",
    "User": {
      "id": 3,
      "email": "doe@gmail.com",
      "password": "$2b$10$tMNBGQ8.LMIF948Q.ZS6Uu0HM8Ms.rKQh2whSrTXFVWHLHs2gV7s6",
      "organization": "Hacktiv8",
      "createdAt": "2020-05-08T10:34:19.383Z",
      "updatedAt": "2020-05-08T10:34:19.383Z"
    }
  },
  {
    "id": 4,
    "title": "Makan",
    "category": "back-log",
    "UserId": 5,
    "createdAt": "2020-05-08T14:06:20.947Z",
    "updatedAt": "2020-05-08T14:06:20.947Z",
    "User": {
      "id": 5,
      "email": "adad@adad.com",
      "password": "$2b$10$n4ncaAD2AKHDfirRY2tRv.fmYck9hhh2.tG47bHNnBFj3.xI5U6J2",
      "organization": "Hacktiv8",
      "createdAt": "2020-05-08T14:01:36.763Z",
      "updatedAt": "2020-05-08T14:01:36.763Z"
    }
  }
]
```

#### _Status 403 Forbidden_

```json
{
  "messages": ["Please sign in first"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## GET /tasks/:id

Get a task by its ID

### Requests

#### _Header_

```json
{
  "access_token": "<your access token>"
}
```

#### _Body_

```json
not needed
```

#### _Parameters_

| Name |       Description       |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_

```json
{
  "id": 1,
  "title": "Main",
  "category": "done",
  "UserId": 1,
  "createdAt": "2020-05-08T10:09:35.368Z",
  "updatedAt": "2020-05-08T10:09:35.368Z"
}
```

#### _Status 404 Not Found_

```json
{
  "messages": ["Task id 10 is not found"]
}
```

#### _Status 403 Forbidden_

```json
{
  "messages": ["Please sign in first"]
}
```

#### _Status 401 Unauthorized_

```json
{
  "messages": ["You are not authorized"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## PUT /tasks/:id

Update a tasks

### Requests

#### _Header_

```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "<your access token>"
}
```

#### _Body_

Choose the item property(s) that you want to update

```json
{
  "title": "<todo title: string>",
  "category": "back-log" || "to-do" || "done" || "completed"
}
```

#### _Parameters_

| Name |       Description       |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_

```json
{
  "message": "Task id 14 has been updated"
}
```

#### _Status 404 Not Found_

```json
{
  "messages": ["Task id 1 is not found"]
}
```

#### _Status 400 Bad Request_

```json
{
  "messages": ["Must be back-log, to-do, done, or completed"]
}
```

#### _Status 403 Forbidden_

```json
{
  "messages": ["Please sign in first"]
}
```

#### _Status 401 Unauthorized_

```json
{
  "messages": ["You are not authorized"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```

> ## DELETE /tasks/:id

Delete a todo

### Requests

#### _Header_

```json
{
  "access_token": "<your access token>"
}
```

#### _Body_

```json
not needed
```

#### _Parameters_

| Name |       Description       |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_

```json
{
  "message": "Task id 1 has been deleted"
}
```

#### _Status 404 Not Found_

```json
{
  "messages": ["Task id 100 is not found"]
}
```

#### _Status 403 Forbidden_

```json
{
  "messages": ["Please sign in first"]
}
```

#### _Status 401 Unauthorized_

```json
{
  "messages": ["You are not authorized"]
}
```

#### _Status 500 Internal Server Error_

```json
{
  "messages": ["Internal server error"]
}
```
