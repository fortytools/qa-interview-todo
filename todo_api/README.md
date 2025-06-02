# README

## Overview

This is a Ruby on Rails API-only application. It provides a backend for managing todos via RESTful endpoints.

## Requirements

- Ruby 3.x
- Rails 8.x
- Sqlite

## Setup

1. Clone the repository:
  ```bash
  git clone git@github.com:fortytools/qa-interview-todo.git
  cd qa-interview-todo/todo_api
  ```

2. Install dependencies:
  ```bash
  bundle install
  ```

3. Set up the database:
  ```bash
  rails db:create db:migrate
  ```

4. Run the test suite:
  ```bash
  bundle exec rspec
  ```

5. Start the server:
  ```bash
  rails server
  ```

## API Endpoints

Typical endpoints include:

- `GET /todos` — List all todos
- `GET /todos/:id` — Show a specific todo
- `POST /todos` — Create a new todo
- `PUT /todos/:id` — Update a todo
- `DELETE /todos/:id` — Delete a todo

## Testing

This project uses RSpec for testing. Run all tests with:

```bash
bundle exec rspec
```