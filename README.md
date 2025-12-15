# 🚀 Project Management API

A comprehensive RESTful API for managing projects, tasks, and users built with NestJS, Prisma v7, and PostgreSQL.

> **Database:** PostgreSQL ✅ | **Framework:** NestJS | **ORM:** Prisma v7

## 📋 Project Description

This is a full-featured project management system designed to help teams organize and track their work efficiently. The API provides a complete backend solution for project and task management applications.

## ✨ Key Features & Functionalities

### User Management
- ✅ Create new users with email, name, and password
- ✅ Retrieve all users or specific user by ID
- ✅ Secure password storage with hashing
- ✅ User authentication support

### Project Management
- ✅ Create projects with name, description, and owner
- ✅ Project ownership tracking (each project has an owner)
- ✅ Many-to-many relationship between projects and members
- ✅ Project status tracking (ACTIVE, COMPLETED, ARCHIVED)
- ✅ View all projects or get specific project details
- ✅ Include project owner and members in queries

### Task Management
- ✅ Create tasks within projects
- ✅ Assign tasks to specific users
- ✅ Track task status (TODO, IN_PROGRESS, IN_REVIEW, DONE)
- ✅ Set task priority levels (LOW, MEDIUM, HIGH, URGENT)
- ✅ Add due dates to tasks
- ✅ Update task details including status, priority, and assignee
- ✅ Filter tasks by status and assignee
- ✅ View task details with project and assignee information

### Data Relationships
- ✅ Users can own multiple projects
- ✅ Users can be members of multiple projects
- ✅ Projects can have multiple tasks
- ✅ Tasks belong to one project
- ✅ Tasks can be assigned to one user
- ✅ Cascade delete operations for data integrity

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **ORM**: [Prisma v7](https://www.prisma.io/) - Next-generation ORM with database adapter
- **Database**: **PostgreSQL** ✅ - Open-source relational database (**Chosen for this project**)
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Validation**: [class-validator](https://github.com/typestack/class-validator) - Decorator-based validation
- **Password Hashing**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing library

> **📌 Database Choice:** This project uses **PostgreSQL** as the primary relational database for its robust ACID compliance, excellent support for complex queries, and strong data integrity features.

### Database Schema

#### User Model
- `id` (Int, Primary Key, Auto-increment)
- `email` (String, Unique)
- `name` (String)
- `password` (String, Hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `assignedTasks` - Tasks assigned to this user
- `ownedProjects` - Projects owned by this user
- `projects` - Projects where user is a member

#### Project Model
- `id` (Int, Primary Key, Auto-increment)
- `name` (String)
- `description` (String, Optional)
- `status` (Enum: ACTIVE, COMPLETED, ARCHIVED)
- `ownerId` (Int, Foreign Key to User)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `owner` - User who owns the project
- `tasks` - Tasks in this project
- `members` - Users who are members of this project

#### Task Model
- `id` (Int, Primary Key, Auto-increment)
- `title` (String)
- `description` (String, Optional)
- `status` (Enum: TODO, IN_PROGRESS, IN_REVIEW, DONE)
- `priority` (Enum: LOW, MEDIUM, HIGH, URGENT)
- `dueDate` (DateTime, Optional)
- `projectId` (Int, Foreign Key to Project)
- `assigneeId` (Int, Foreign Key to User, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**Relations:**
- `project` - Project this task belongs to
- `assignee` - User assigned to this task

## Project Structure

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher) - **Required Database**
- npm or yarn

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd project-management-api

# Install dependencies
npm install
```

### Step 2: Set DATABASE_URL

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/project_management_db?schema=public"
PORT=3000
NODE_ENV=development
```

#### 🔧 DATABASE_URL Format Explained

```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]?schema=public
```

| Component | Description | Example |
|-----------|-------------|---------|
| `USERNAME` | PostgreSQL username | `postgres` |
| `PASSWORD` | PostgreSQL password | `mypassword` |
| `HOST` | Database server | `localhost` (for local dev) |
| `PORT` | PostgreSQL port | `5432` (default) |
| `DATABASE_NAME` | Database name | `project_management_db` |

**Full Example:**
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/project_management_db?schema=public"
```

### Step 3: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE project_management_db;

# Exit
\q
```

### Step 4: Run Migrations

```bash
# Apply database migrations (creates all tables)
npx prisma migrate dev --name init
```

This command:
- ✅ Creates migration files in `prisma/migrations/`
- ✅ Applies migrations to your database
- ✅ Generates Prisma Client automatically

### Step 5: Start the Server

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

🎉 **API is now running at:** `http://localhost:3000`

---

## 📜 Available Commands

### Application Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | **Start development server with hot-reload** ⚡ |
| `npm run start` | Start production server |
| `npm run build` | Build for production |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |

### Migration Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npx prisma migrate dev --name <name>` | **Create and apply migration** | After changing `schema.prisma` |
| `npx prisma migrate deploy` | Apply pending migrations | Production deployment |
| `npx prisma migrate reset` | Reset database | Starting fresh ⚠️ (deletes data) |
| `npx prisma generate` | Generate Prisma Client | After schema updates |
| `npx prisma studio` | Open database GUI | Visual data management |

---

## 🧪 Sample API Requests

### 1. Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-12-16T10:00:00.000Z",
  "updatedAt": "2025-12-16T10:00:00.000Z"
}
```

### 2. Create a Project

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "E-commerce Website",
    "description": "Build a complete e-commerce platform",
    "ownerId": 1
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "E-commerce Website",
  "description": "Build a complete e-commerce platform",
  "status": "ACTIVE",
  "ownerId": 1,
  "createdAt": "2025-12-16T10:05:00.000Z",
  "updatedAt": "2025-12-16T10:05:00.000Z"
}
```

### 3. Create a Task

```bash
curl -X POST http://localhost:3000/projects/1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Setup Database Schema",
    "description": "Design and implement database tables",
    "priority": "HIGH",
    "status": "TODO",
    "assigneeId": 1,
    "dueDate": "2025-12-20T10:00:00Z"
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "Setup Database Schema",
  "description": "Design and implement database tables",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2025-12-20T10:00:00.000Z",
  "projectId": 1,
  "assigneeId": 1,
  "createdAt": "2025-12-16T10:10:00.000Z",
  "updatedAt": "2025-12-16T10:10:00.000Z"
}
```

### 4. Get Tasks with Filters

```bash
# Get all tasks for a project
curl http://localhost:3000/projects/1/tasks

# Filter by status
curl http://localhost:3000/projects/1/tasks?status=TODO

# Filter by assignee
curl http://localhost:3000/projects/1/tasks?assigneeId=1

# Multiple filters
curl http://localhost:3000/projects/1/tasks?status=TODO&assigneeId=1
```

### 5. Update a Task

```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS",
    "priority": "URGENT"
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "Setup Database Schema",
  "status": "IN_PROGRESS",
  "priority": "URGENT",
  "updatedAt": "2025-12-16T10:15:00.000Z"
}
```

---

## 📡 API Endpoints

### 👥 Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |

### 📊 Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/projects` | Create a new project |
| `GET` | `/projects` | Get all projects |
| `GET` | `/projects/:id` | Get project by ID |

### ✅ Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/projects/:projectId/tasks` | Create task in project |
| `GET` | `/projects/:projectId/tasks` | Get project tasks (filterable) |
| `GET` | `/tasks/:id` | Get task by ID |
| `PATCH` | `/tasks/:id` | Update a task |

**Query Parameters:**
- `status`: `TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`
- `assigneeId`: Filter by user ID

---

## Project Structure

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/project_management_db?schema=public"

# Server
PORT=3000

# Node Environment
NODE_ENV=development
