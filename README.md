# Yamid Granda Code Challenge

Chekc the 👉👉👉 [DEMO Video Here](https://drive.google.com/file/d/1kaXEjTJOIDcU0Xu1w5CcNOiyD7nb090C/view?usp=sharing) 👈👈👈

## Backend

### Requirements

- `python 3.12.4` or higher
- `pip 24.0` or higher

### Setup Python virtual environment

```sh
pip install virtualenv
python -m venv venv
```

Hint: remember select the virtual python interpreter (`(venv)` prefix)

### Install dependencies

```sh
pip install -r requirements.txt
```

### Run migrations

```sh
python manage.py makemigrations
python manage.py migrate
```

### Run development environment

```sh
python manage.py runserver
# go to http://localhost:8000/orders/api/v1/orders/reports/
```

### Run Unit tests

```sh
python manage.py test
```

## Frontend

### Requirements

- `nodejs 20` or higher
- `pnpm` (recommended, optional) [check the official pnpm documentation](https://pnpm.io/installation)

### Install dependencies

1. go to the `/ui` folder
2. install dependencies using `pnpm install`, or `npm install` commands

### Run development environment

```sh
pnpm dev
# or
npm run dev
# go to http://localhost:3000/
```

### Run Unit tests

```sh
pnpm test
# or
npm run test
```
