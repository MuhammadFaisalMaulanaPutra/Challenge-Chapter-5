# BCR-API

BCR-API adalah Kumpulan API untuk CRUD Tabel beserta Authentication System menggunakan Json Web Token.
Didalam API ini terdapat endpoint untuk:

- Create, Read, Update, Delete untuk tabel Car.
- SignUp, SignIn, Signout Menggunakan JWT.

Didalam API ini menggunakan:

- PostgreSQL untuk Database.
- Sequelize untuk ORM Model Migration dan Seeder.
- JsonWebToken untuk Auth System.
- Middleware untuk Authentication.

## Api - Documentation

Api Documentation dapat dilihat di link Postman berikut:

```bash
 https://documenter.getpostman.com/view/27174982/2s93eWzCnY
```

## Installation

- Jalankan command-line dibawah ini

```bash
# Install Package yang dibutuhkan
npm install

# Migration, dan Seed
npm run db:migrate
npm run db:seed
```

- Buat file `.env` sesuaikan dengan file `example.env` atau rename file `example.env` menjadi `.env`.

- Jalankan command-line dibawah ini untuk menjalankan server

```bash
npm run dev
```

## Attributes Table

#### Cars Table

```js
id = INTEGER;
plate = STRING;
model = STRING;
manufacture = STRING;
capacity = INTEGER;
year = INTEGER;
transmission = STRING;
available = BOOLEAN;
whos_create = INTEGER;
whos_update = INTEGER;
whos_delete = INTEGER;
createdAt = DATE;
updatedAt = DATE;
deletedAt = DATE;
```

#### Users Table

```js
id = INTEGER;
username = STRING;
email = STRING;
password = TEXT;
role = STRING;
createdAt = DATE;
updatedAt = DATE;
```
