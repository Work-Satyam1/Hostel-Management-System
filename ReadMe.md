# 🏨 Hostel Management System — Backend

A REST API backend for a Hostel Management System built using **Node.js, Express.js, MongoDB, Mongoose, JWT and bcryptjs**.

The system is designed to manage students, hostels, rooms, room allocation, attendance, GPS-based attendance, complaints, leave requests and notices.

> 🚧 Current Stage: Authentication + Student + Hostel + Warden + Room + Room Allocation APIs completed.  
> ➡️ Next: Attendance Management + GPS/Geofencing.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Authentication](#-authentication)
- [User Roles](#-user-roles)
- [API Documentation](#-api-documentation)
- [Student APIs](#-student-apis)
- [Hostel APIs](#-hostel-apis)
- [Middleware](#-middleware)
- [Database Models](#-database-models)
- [API Request Flow](#-api-request-flow)
- [Permissions](#-permissions)
- [Postman Testing](#-postman-testing)
- [Security](#-security)
- [Upcoming Features](#-upcoming-features)
- [Development Roadmap](#-development-roadmap)
- [GitHub Security](#-github-security)

---

# 📖 Project Overview

The Hostel Management System is a full-stack application intended to digitize hostel operations.

The final system will have:

```text
                    HOSTEL MANAGEMENT SYSTEM
                              |
              +---------------+---------------+
              |                               |
       React Native App                 React Admin Panel
        Student App                       Admin Panel
              |                               |
              +---------------+---------------+
                              |
                            Axios
                              |
                              ▼
                     Node.js + Express
                              |
                         JWT Auth
                              |
                              ▼
                           MongoDB
```

---

# 🛠️ Tech Stack

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Backend REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |
| Nodemon | Development Server |

## Planned Frontend

- React Native
- Expo
- Axios

## Planned Admin Panel

- React.js
- React Router
- Axios
- Dashboard UI

---

# 📁 Project Structure

Current backend structure:

```text
hms_backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   ├── studentController.js
│   ├── hostelController.js
│   ├── roomController.js
│   └── roomAllocationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Student.js
│   ├── Warden.js
│   ├── Hostel.js
│   ├── Room.js
│   └── RoomAllocation.js
│
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── studentRoutes.js
│   ├── hostelRoutes.js
│   ├── roomRoutes.js
│   └── roomAllocationRoutes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Go inside the project:

```bash
cd hms_backend
```

## 2. Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

Example `.env.example`:

```env
MONGO_URI=
PORT=5000
JWT_SECRET=
```

### ⚠️ Important

Never upload the real `.env` file to GitHub.

The `.env` file contains sensitive information such as:

- MongoDB connection string
- JWT secret
- API keys

---

# ▶️ Running the Server

## Development

```bash
npm run dev
```

## Normal

```bash
node server.js
```

Server runs on:

```text
http://localhost:5000
```

Test the server:

```http
GET /
```

Response:

```text
Hostel Management API is running
```

---

# 🔐 Authentication

The application uses **JWT Bearer Authentication**.

Authentication flow:

```text
Login
   ↓
Verify Email + Password
   ↓
Generate JWT
   ↓
Client receives Token
   ↓
Client sends Token with API requests
   ↓
authMiddleware
   ↓
JWT Verification
   ↓
req.user
```

Protected API requests require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 👥 User Roles

The system supports three roles:

```text
student
admin
warden
```

## Student

Students can:

```text
Register
Login
Create their profile
View hostels
View rooms
Mark attendance
Submit complaints
Apply for leave
View notices
```

## Admin

Admins can:

```text
Manage students
Create hostels
Create rooms
Allocate rooms
Manage attendance
Manage complaints
Manage leave
Create notices
```

## Warden

Wardens will have hostel-management permissions such as:

```text
View students
Manage attendance
Handle complaints
Manage leave
```

Exact warden permissions will be finalized as the project grows.

---

# 🛡️ Important Role Security

The current architecture does **not** expose public registration.

- The initial Admin is created using `createAdmin.js`.
- Admin creates Student accounts.
- Admin creates Warden accounts and assigns them to a Hostel.
- All users authenticate through `/api/auth/login`.
- Admin-only operations are protected by `authMiddleware` + `adminMiddleware`.

This prevents an unauthenticated user from creating an Admin account.

---

# 🔑 Authentication APIs

## Login User

### Endpoint

```http
POST /api/auth/login
```

### URL

```text
http://localhost:5000/api/auth/login
```

### Authentication

```text
Public
```

### Request Body

```json
{
    "email": "admin@hostel.com",
    "password": "YOUR_PASSWORD"
}
```

### Response

```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": "USER_ID",
        "name": "Hostel Admin",
        "email": "admin@hostel.com",
        "role": "admin"
    }
}
```

### Backend Flow

```text
Login Request
      ↓
Find User
      ↓
Compare Password
      ↓
bcrypt.compare()
      ↓
Generate JWT
      ↓
Return Token
```

---

# 3. Get Current User

### Endpoint

```http
GET /api/auth/me
```

### URL

```text
http://localhost:5000/api/auth/me
```

### Authentication

```text
Bearer JWT
```

### Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Response

```json
{
    "message": "Authenticated successfully",
    "user": {
        "userId": "USER_ID",
        "role": "student",
        "iat": 123456789,
        "exp": 123456789
    }
}
```

---

# 🎓 Student APIs

# Create Student Profile

### Endpoint

```http
POST /api/students/profile
```

### URL

```text
http://localhost:5000/api/students/profile
```

### Authentication

```text
Bearer JWT
```

### Permission

```text
Authenticated User
```

### Request Body

```json
{
    "studentId": "CU2025001",
    "phone": "9876543210",
    "course": "CSE",
    "semester": 4,
    "emergencyContact": {
        "name": "Parent",
        "phone": "9876500000"
    }
}
```

### Response

```json
{
    "message": "Student profile created successfully",
    "student": {
        "_id": "STUDENT_ID",
        "user": "USER_ID",
        "studentId": "CU2025001",
        "phone": "9876543210",
        "course": "CSE",
        "semester": 4
    }
}
```

### Important Security Design

The frontend does not send the User ID.

The backend gets the authenticated user from:

```js
req.user.userId
```

Therefore:

```text
JWT
 ↓
authMiddleware
 ↓
req.user.userId
 ↓
Student Profile
```

This prevents a student from creating a profile for another user's account.

---

# 🏢 Hostel APIs

Hostel creation is an **ADMIN ONLY** operation.

# 1. Create Hostel

### Endpoint

```http
POST /api/hostels
```

### URL

```text
http://localhost:5000/api/hostels
```

### Authentication

```text
Bearer JWT
```

### Permission

```text
ADMIN ONLY
```

### Request Body

```json
{
    "name": "Boys Hostel A",
    "location": "Chitkara University",
    "totalRooms": 50
}
```

### Response

```json
{
    "message": "Hostel created successfully",
    "hostel": {
        "_id": "HOSTEL_ID",
        "name": "Boys Hostel A",
        "location": "Chitkara University",
        "totalRooms": 50
    }
}
```

### Request Flow

```text
POST /api/hostels
       ↓
authMiddleware
       ↓
JWT Verification
       ↓
adminMiddleware
       ↓
Check role
       ↓
role === admin
       ↓
createHostel()
       ↓
Hostel Model
       ↓
MongoDB
```

---

# 2. Get All Hostels

### Endpoint

```http
GET /api/hostels
```

### URL

```text
http://localhost:5000/api/hostels
```

### Authentication

```text
Bearer JWT
```

### Permission

```text
Student ✅
Warden  ✅
Admin   ✅
```

### Response

```json
{
    "count": 1,
    "hostels": [
        {
            "_id": "HOSTEL_ID",
            "name": "Boys Hostel A",
            "location": "Chitkara University",
            "totalRooms": 50
        }
    ]
}
```

---

# 🚫 Student Cannot Create Hostel

If a student sends:

```http
POST /api/hostels
```

with a student JWT:

```text
JWT Valid
   ↓
role = student
   ↓
adminMiddleware
   ↓
❌ Access Denied
```

Response:

```http
403 Forbidden
```

```json
{
    "message": "Access denied. Admin only."
}
```

---

# 👨‍💼 Admin APIs

## Create Student

```http
POST /api/admin/students
```

Admin only.

```json
{
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "password": "Student@123"
}
```

## Create Warden

```http
POST /api/admin/wardens
```

Admin only.

```json
{
    "name": "Rahul Sharma",
    "email": "warden@example.com",
    "password": "Warden@123",
    "employeeId": "W001",
    "phone": "9876543210",
    "hostel": "HOSTEL_ID"
}
```

The `hostel` value must be a valid MongoDB Hostel ObjectId.

---

# 👨‍🏫 Warden Management

A Warden is linked to a `User` account and assigned to a specific Hostel.

Current Warden model fields:

```text
user
employeeId
phone
hostel
```

Warden login uses the same:

```http
POST /api/auth/login
```

Warden-specific APIs and assigned-hostel authorization are the next refinement.

---

# 🚪 Room Management

Room management is now implemented.

### Room fields

```text
hostel
roomNumber
floor
capacity
occupied
status
```

### Create Room

```http
POST /api/rooms
```

Admin only.

```json
{
    "hostel": "HOSTEL_ID",
    "roomNumber": "101",
    "floor": 1,
    "capacity": 4
}
```

### Get Rooms

```http
GET /api/rooms
```

Authenticated users.

### Get Room By ID

```http
GET /api/rooms/:id
```

Authenticated users.

Room status can be:

```text
available
full
maintenance
```

The backend validates the Hostel before creating a room and prevents duplicate room numbers within the same Hostel.

---

# 🛏️ Room Allocation

Room allocation is now implemented.

### Allocate Student To Room

```http
POST /api/room-allocations
```

Admin only.

```json
{
    "student": "STUDENT_PROFILE_ID",
    "room": "ROOM_ID"
}
```

The backend checks:

```text
Student exists
       +
Room exists
       +
Room is not under maintenance
       +
Room has available capacity
       +
Student has no active allocation
       +
Admin authorization
```

After successful allocation:

```text
Student
   ↓
Room Allocation
   ↓
Room occupied + 1
   ↓
If capacity reached → status = full
```

### Get Active Allocations

```http
GET /api/room-allocations
```

Admin only.

### Student Room Lookup

```http
GET /api/students/my-room
```

The backend finds the Student profile from the authenticated JWT and returns the student's active room allocation.

---

# 🧩 Middleware

The project currently uses two important middleware layers.

# 1. Authentication Middleware

File:

```text
middleware/authMiddleware.js
```

Purpose:

```text
Verify the JWT
```

Flow:

```text
Request
   ↓
Authorization Header
   ↓
Extract JWT
   ↓
jwt.verify()
   ↓
Decode User
   ↓
req.user
```

Example:

```js
req.user = {
    userId: "USER_ID",
    role: "student"
};
```

If no token:

```text
401 Unauthorized
```

If token is invalid or expired:

```text
401 Unauthorized
```

---

# 2. Admin Middleware

File:

```text
middleware/adminMiddleware.js
```

Purpose:

```text
Allow only administrators
```

Logic:

```js
if (req.user.role !== "admin") {
    return res.status(403).json({
        message: "Access denied. Admin only."
    });
}
```

---

# 🔄 Authentication vs Authorization

## Authentication

Answers:

> Who are you?

Implemented using:

```text
JWT
```

## Authorization

Answers:

> Are you allowed to perform this operation?

Implemented using:

```text
Role-Based Access Control
```

Example:

```text
Student
   ↓
JWT Valid
   ↓
Authenticated ✅
   ↓
Try Create Hostel
   ↓
Admin Check
   ↓
Not Admin
   ↓
403 Forbidden
```

---

# 🗃️ Database Models

# User Model

File:

```text
models/User.js
```

Fields:

```text
name
email
password
role
```

Roles:

```text
student
admin
warden
```

---

# Student Model

File:

```text
models/Student.js
```

Fields:

```text
user
studentId
phone
course
semester
emergencyContact
```

Relationship:

```text
User
 │
 │ 1 : 1
 ▼
Student
```

The `user` field references the User collection:

```js
ref: "User"
```

---

# Hostel Model

File:

```text
models/Hostel.js
```

Fields:

```text
name
location
totalRooms
```

Example:

```json
{
    "name": "Boys Hostel A",
    "location": "Chitkara University",
    "totalRooms": 50
}
```

---

# 📡 API Architecture

Every API follows this structure:

```text
Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

Example:

```text
POST /api/hostels
        ↓
hostelRoutes.js
        ↓
authMiddleware.js
        ↓
adminMiddleware.js
        ↓
hostelController.js
        ↓
Hostel.js
        ↓
MongoDB
```

---

# 📊 Current API Reference

| Method | Endpoint | Authentication | Permission |
|--------|----------|----------------|------------|
| GET | `/` | No | Public |
| POST | `/api/auth/login` | No | Public |
| GET | `/api/auth/me` | Yes | Authenticated |
| POST | `/api/admin/students` | Yes | Admin |
| POST | `/api/admin/wardens` | Yes | Admin |
| POST | `/api/students/profile` | Yes | Authenticated |
| GET | `/api/students/my-room` | Yes | Authenticated |
| POST | `/api/hostels` | Yes | Admin |
| GET | `/api/hostels` | Yes | Authenticated |
| POST | `/api/rooms` | Yes | Admin |
| GET | `/api/rooms` | Yes | Authenticated |
| GET | `/api/rooms/:id` | Yes | Authenticated |
| POST | `/api/room-allocations` | Yes | Admin |
| GET | `/api/room-allocations` | Yes | Admin |

---

# 🧪 Postman Testing

Recommended testing order:

```text
1. Start server
2. Login as Admin
3. Copy JWT
4. Test /api/auth/me
5. Create Hostel
6. Get Hostel ID
7. Create Warden
8. Create Student
9. Create Room
10. Create Student Profile
11. Allocate Room
12. Get Student Room
13. Get Active Allocations
14. Test Admin Authorization
```

For protected requests use:

```text
Authorization → Bearer Token → YOUR_JWT_TOKEN
```

---

# 🔒 Security Design

The system follows these security rules:

### 1. Passwords are hashed

Passwords are never stored as plain text.

```text
Password
   ↓
bcrypt
   ↓
Hashed Password
   ↓
MongoDB
```

### 2. JWT authentication

Protected APIs require:

```text
Bearer JWT
```

### 3. Role-based authorization

Administrative operations require:

```text
role = admin
```

### 4. User identity comes from JWT

For protected student operations:

```js
req.user.userId
```

is used instead of trusting a User ID from the client.

### 5. Public registration cannot create admins

All public registrations receive:

```text
role = student
```

---

# 🏠 Room Management — Completed

Room management has been implemented with Hostel references, room capacity, occupied count and room status.

Implemented endpoints:

```text
POST /api/rooms
GET  /api/rooms
GET  /api/rooms/:id
```

Only Admin can create rooms. Authenticated users can view rooms.

---

# 🛏️ Room Allocation — Completed

Room allocation has been implemented through:

```http
POST /api/room-allocations
GET  /api/room-allocations
```

The allocation service validates student existence, room existence, room capacity, maintenance status and duplicate active allocations. It also updates the room occupancy and status.

---

# 📍 Planned GPS Attendance

GPS attendance will be implemented through the React Native mobile application.

Planned flow:

```text
Student
   ↓
Login
   ↓
JWT Token
   ↓
Open Attendance
   ↓
Mobile Gets GPS
   ↓
Latitude + Longitude
   ↓
Backend
   ↓
Verify JWT
   ↓
Identify Student
   ↓
Get Hostel Location
   ↓
Calculate Distance
   ↓
Check Geofence
   ↓
Check Time
   ↓
Check Duplicate
   ↓
Mark Attendance
```

---

# 🛡️ Planned Attendance Security

The attendance system will use multiple checks:

```text
JWT Authentication
        +
GPS Coordinates
        +
Geofence
        +
Timestamp
        +
Duplicate Prevention
        +
Device Validation
        +
Mock Location Detection
```

The backend will identify the student using:

```js
req.user.userId
```

rather than trusting a student ID sent by the mobile application.

This prevents a student from simply submitting another student's ID.

---

# 📱 Planned React Native App

The student mobile application will contain:

```text
Login
Dashboard
Profile
Hostel Information
Room Information
Attendance
GPS Attendance
Complaints
Leave
Notices
Logout
```

---

# 🖥️ Planned Admin Panel

The admin web application will contain:

```text
Admin Login
Dashboard
Students
Wardens
Hostels
Rooms
Room Allocation
Attendance
Complaints
Leave Requests
Notices
Reports
```

---

# 📋 Development Roadmap

## Phase 1 — Backend Foundation

- [x] Node.js
- [x] Express
- [x] MongoDB
- [x] Mongoose
- [x] dotenv
- [x] CORS
- [x] User Model
- [x] Admin Bootstrap
- [x] Login
- [x] bcrypt Password Hashing
- [x] JWT Authentication
- [x] Authentication Middleware
- [x] Admin Authorization

## Phase 2 — Student Management

- [x] Student Model
- [x] Student Profile API
- [ ] Student Profile Update
- [ ] Student Profile Fetch
- [ ] Student Management APIs

## Phase 3 — Hostel Management

- [x] Hostel Model
- [x] Create Hostel API
- [x] Get Hostels API
- [ ] Update Hostel
- [ ] Delete Hostel

## Phase 4 — Room Management

- [x] Room Model
- [x] Create Room
- [x] Get Rooms
- [x] Get Room By ID
- [x] Room Availability
- [x] Room Capacity
- [x] Room Status

## Phase 5 — Room Allocation

- [x] Allocate Student
- [x] Capacity Validation
- [x] Active Allocation Validation
- [x] Occupied Bed Tracking
- [x] Student Room Lookup
- [ ] Remove Student / Vacate Room
- [ ] Room Transfer
- [ ] Historical Allocation Support

## Phase 6 — Attendance

- [ ] Attendance Model
- [ ] Mark Attendance
- [ ] Attendance History
- [ ] Daily Attendance
- [ ] Attendance Reports

## Phase 7 — GPS Attendance

- [ ] GPS Location
- [ ] Geofencing
- [ ] Distance Calculation
- [ ] Attendance Time Window
- [ ] Duplicate Prevention
- [ ] Device Validation
- [ ] Mock Location Detection

## Phase 8 — Student Services

- [ ] Complaints
- [ ] Complaint Status
- [ ] Leave Application
- [ ] Leave Approval
- [ ] Notices

## Phase 9 — React Native

- [ ] Expo Setup
- [ ] Login
- [ ] Registration
- [ ] JWT Storage
- [ ] Axios
- [ ] Dashboard
- [ ] Profile
- [ ] Room
- [ ] Attendance
- [ ] GPS Attendance
- [ ] Complaints
- [ ] Leave
- [ ] Notices

## Phase 10 — Admin Panel

- [ ] React Setup
- [ ] Admin Login
- [ ] Dashboard
- [ ] Student Management
- [ ] Hostel Management
- [ ] Room Management
- [ ] Room Allocation
- [ ] Attendance Dashboard
- [ ] Complaint Management
- [ ] Leave Management
- [ ] Notice Management
- [ ] Reports

## Phase 11 — Deployment

- [ ] MongoDB Atlas
- [ ] Backend Deployment
- [ ] Admin Panel Deployment
- [ ] React Native Production Build
- [ ] Environment Configuration
- [ ] Production Security
- [ ] API Testing
- [ ] Performance Testing

---

# 📦 NPM Commands

Install dependencies:

```bash
npm install
```

Start normally:

```bash
node server.js
```

Start development server:

```bash
npm run dev
```

Check installed packages:

```bash
npm list
```

---

# 🔧 Git Commands

Initialize repository:

```bash
git init
```

Check status:

```bash
git status
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial hostel management backend"
```

Connect GitHub:

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
```

Push:

```bash
git branch -M main
git push -u origin main
```

---

# 🔐 GitHub Security

Use this `.gitignore`:

```gitignore
node_modules/
.env
.env.local
.env.development
.env.production

logs/
*.log

npm-debug.log*
yarn-debug.log*
yarn-error.log*

.DS_Store
Thumbs.db

.vscode/

coverage/
tmp/
temp/
```

Never push:

```text
.env
MongoDB credentials
JWT secrets
API keys
Private credentials
```

Push:

```text
.env.example
package.json
package-lock.json
README.md
source code
```

---

# 📊 Current Project Status

```text
Backend
│
├── Express                  ✅
├── MongoDB                  ✅
├── Mongoose                 ✅
├── User Model               ✅
├── Admin Bootstrap          ✅
├── Login                    ✅
├── bcrypt                   ✅
├── JWT                      ✅
├── Auth Middleware          ✅
├── Admin Middleware         ✅
├── Student Model            ✅
├── Student Profile API      ✅
├── Hostel Model             ✅
├── Hostel Create API        ✅
├── Hostel Get API           ✅
├── Warden Model             ✅
├── Warden Creation API      ✅
├── Hostel Assignment        ✅
├── Room Model               ✅
├── Room Create API          ✅
├── Room Get APIs            ✅
├── Room Capacity/Status     ✅
├── Room Allocation API      ✅
├── Active Allocation List   ✅
├── Student Room Lookup      ✅
│
├── Warden APIs              🔄 NEXT
├── Complaint Management     ⏳
├── Leave                    ⏳
├── Notices                  ⏳
├── Attendance               ⏳
├── GPS Attendance           ⏳
└── React / Expo Frontends   ⏳
```

---

# 🎯 Final Goal

The final application will provide a complete hostel management platform:

```text
                    HOSTEL MANAGEMENT SYSTEM
                              |
            +-----------------+-----------------+
            |                                   |
        STUDENT                              ADMIN
            |                                   |
      React Native                         React.js
            |                                   |
            +-----------------+-----------------+
                              |
                             API
                              |
                    Node.js + Express
                              |
                    Authentication
                         JWT/RBAC
                              |
                           MongoDB
```

### Student Features

```text
Registration
Login
Profile
Hostel
Room
Attendance
GPS Attendance
Complaints
Leave
Notices
```

### Admin Features

```text
Students
Wardens
Hostels
Rooms
Room Allocation
Attendance
Complaints
Leave
Notices
Reports
```

---

# 👨‍💻 Project Development

This project is being developed as a full-stack Hostel Management System with a focus on:

- REST API architecture
- Authentication
- Role-Based Access Control
- MongoDB database design
- Mobile application development
- Admin dashboard
- GPS-based attendance
- Geofencing
- Attendance security
- Scalable backend architecture

---

# 🚀 Current Next Step

The backend has progressed from:

```text
Authentication
      ↓
Student Management
      ↓
Hostel Management
      ↓
Warden Management
      ↓
Room Management
      ↓
Room Allocation
      ↓
➡️ Attendance Management
      ↓
GPS / Geofencing
```

The next implementation focus is **Attendance API**, followed by GPS/geofencing-based attendance through the React Native + Expo student application.

Planned attendance flow:

```text
Student Login
      ↓
JWT Verification
      ↓
Identify Student from req.user.userId
      ↓
Get Current GPS Location
      ↓
Send Latitude + Longitude
      ↓
Calculate Distance from Allowed Location
      ↓
Check Geofence
      ↓
Check Attendance Time Window
      ↓
Check Duplicate Attendance
      ↓
Mark Present
```
