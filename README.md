# User Management API

## Overview

This project is a User Management API built using **Node.js, Express, and MySQL**. It provides authentication, user management, and administrative functionalities such as user verification, role management, and pagination.

## Swagger Documentation

You can access the Swagger documentation at:  
[`http://localhost:3000/api/docs`](http://localhost:3000/api/docs)

---

## Features

- **User Authentication** (Registration, Login)
- **User Management** (CRUD operations, Pagination, Role updates)
- **Admin Controls** (User verification, Role changes, Inactive user tracking)
- **Database Migrations** (MySQL database creation and table management)
- **Middleware** (Authentication, Admin Authorization, Error Handling)

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL
- **Authentication:** JSON Web Token (JWT)
- **ORM/Query Builder:** Raw SQL Queries
- **Environment Management:** dotenv

---

## Installation

### Prerequisites

- Node.js installed
- MySQL server running

### Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/Mohmed-saleh1/backend-challenge.git
   cd backend-challenge
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file in the project root and add the following:
   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```
4. **Run Database Migrations**
   ```sh
   npm run migrate:up  # Creates the database and tables
   ```

---

## Usage

### Running the Server

Start the development server:

```sh
yarn dev
```

The server will run on `http://localhost:3000`

### API Endpoints

#### **Authentication**

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and receive a JWT token

#### **User Management**

- `GET /users/:id` - Retrieve a user by ID
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Delete a user
- `GET /users/top` - Get top active users
- `GET /users/inactive` - Get inactive users
- `GET /users/total` - Get total user count
- `GET /users/total-verified` - Get total verified users
- `POST /users/verify` - Verify a user by email
- `POST /users/update-role` - Update user role
- `GET /users` - Get paginated users (supports filtering by date)

#### **Admin Middleware**

Some routes require admin privileges. Add the `Authorization` header with a valid admin JWT token.

#### **Error Handling**

All errors return a JSON response:

```json
{
  "message": "Error description"
}
```

---

## Project Structure

```
📂 src/
 ├── controllers/         # Request handlers
 ├── services/            # Business logic
 ├── middlewares/         # Middleware (Auth, Admin, Error handling)
 ├── models/              # Database queries
 ├── migrations/          # Database setup and migrations
 ├── utils/               # Utility functions (JWT, Database connection)
 ├── server.ts            # Entry point
 ├── app.ts
 ├── migrate.ts
 ├── swagger.json
```

---

## Deployment

### Build for Production

```sh
npm build
```

### Start Production Server

```sh
npm start
```

## License

This project is released into the public domain. Anyone is free to use, modify, distribute, or do anything with this project without any restrictions.
