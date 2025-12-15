# Project Management API

A comprehensive RESTful API for managing projects, tasks, and users built with NestJS, Prisma, and PostgreSQL.

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
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Open-source relational database
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Validation**: [class-validator](https://github.com/typestack/class-validator) - Decorator-based validation
- **Password Hashing**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing library

## 🗄 Database

This project uses **PostgreSQL** as the primary database.

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

project-management-api/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root module
│   ├── prisma/               # Prisma module & service
│   ├── users/                # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   ├── projects/             # Projects module
│   │   ├── project.controller.ts
│   │   ├── project.service.ts
│   │   ├── project.module.ts
│   │   └── dto/
│   └── tasks/                # Tasks module
│       ├── task.controller.ts
│       ├── task.service.ts
│       ├── task.module.ts
│       └── dto/
├── test/                     # E2E tests
├── .env                      # Environment variables
├── package.json
└── tsconfig.json



## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/project_management_db?schema=public"

# Server
PORT=3000

# Node Environment
NODE_ENV=development
