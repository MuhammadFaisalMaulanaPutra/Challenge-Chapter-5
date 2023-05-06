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

- Buat file `.env` sesuaikan dengan file `example.env` atau rename file `example.env` menjadi `.env`

## Attributes Table

#### Cars Tabel

```js
car.attributes = {
  id: {
    DataTypes: INTEGER,
    autoIncrement: true,
  },
  plate: {
    DataTypes: STRING,
  },
  model: {
    DataTypes: STRING,
  },
  manufacture: {
    DataTypes: STRING,
  },
  capacity: {
    DataTypes: INTEGER,
  },
  year: {
    DataTypes: INTEGER,
  },
  transmission: {
    DataTypes: STRING,
  },
  available: {
    DataTypes: BOOLEAN,
  },
  whos_create: {
    DataTypes: INTEGER,
  },
  whos_update: {
    DataTypes: INTEGER,
  },
  whos_delete: {
    DataTypes: INTEGER,
  },
  createdAt: {
    allowNull: false,
    DataTypes: DATE,
  },
  updatedAt: {
    allowNull: false,
    DataTypes: DATE,
  },
  deletedAt: {
    DataTypes: DATE,
  },
};
```

#### Users Table

```js
user.attributes = {
  id: {
    DataTypes: INTEGER,
    autoIncrement: true,
  },
  username: {
    DataTypes: STRING,
  },
  email: {
    DataTypes: STRING,
  },
  password: {
    DataTypes: TEXT,
  },
  role: {
    DataTypes: STRING,
  },
  createdAt: {
    allowNull: false,
    DataTypes: DATE,
  },
  updatedAt: {
    allowNull: false,
    DataTypes: DATE,
  },
};
```
