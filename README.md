# Travelers-Voice-Backend

Backend API for managing traffic reports, bus stations, and user roles (Admin, Traffic Officers).  
Built with **Node.js**, **Express**, **Prisma ORM**, **PostgreSQL**, and **PostGIS** for geospatial location data.

---

> Assigned to Chala Hiko

---

## Features

- JWT-based authentication & role-based access control.
- Traffic report management (with geospatial location support via PostGIS).
- Admin, Bus Station, and Traffic Officer user management.
- File uploads for report attachments.
- Secure database access with Prisma ORM.
- OWASP Top 10 backend security practices.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + PostGIS
- **ORM**: Prisma
- **Auth**: JSON Web Tokens (JWT)
- **Validation**: Joi / Zod
- **File Uploads**: Multer / Cloud Storage (configurable)
- **Security**: Helmet, CORS, bcrypt, rate-limiter-flexible

---

## Backend Tools checklist

| Category          | Tool / Library                 | Used |
| ----------------- | ------------------------------ | ---- |
| **Core Setup**    | Node.js                        | ✅   |
|                   | Express.js                     | ✅   |
|                   | PostgreSQL                     | ✅   |
|                   | pg                             | ✅   |
|                   | dotenv                         | ✅   |
| **Database ORM**  | Prisma                         | ✅   |
| **Security**      | bcrypt                         | ✅   |
|                   | jsonwebtoken (JWT)             | ✅   |
|                   | helmet                         | ✅   |
|                   | cors                           | ✅   |
| **File Uploads**  | multer                         |      |
| **Geolocation**   | postgis (PostgreSQL extension) |      |
| **Email/SMS**     | Nodemailer                     |      |
|                   | Twilio Free Tier               |      |
| **Development**   | morgan                         |      |
|                   | express-async-errors           |      |
| **Validation**    | zod                            |      |
| **Documentation** | swagger-ui-express             |      |
|                   | yamljs                         |      |
| **Testing**       | jest                           |      |
|                   | supertest                      |      |
| **Optimization**  | compression                    |      |
|                   | PM2                            |      |
|                   |                                |      |

## OWASP Top 10 Security Issues Checklist

- [ ] **A01:2021 – Broken Access Control**
- [ ] **A02:2021 – Cryptographic Failures**
- [ ] **A03:2021 – Injection**
- [ ] **A04:2021 – Insecure Design**
- [ ] **A05:2021 – Security Misconfiguration**
- [ ] **A06:2021 – Vulnerable and Outdated Components**
- [x] **A07:2021 – Identification and Authentication Failures**
- [ ] **A08:2021 – Software and Data Integrity Failures**
- [x] **A09:2021 – Security Logging and Monitoring Failures**
- [x] **A10:2021 – Server-Side Request Forgery (SSRF)**

## Roadmap and check lists

### **1️⃣ Project Setup**

- [x] Install Node.js and initialize project
- [x] Install Express.js
- [x] Install and set up PostgreSQL
- [x] Install pg for PostgreSQL connection
- [x] Install Prisma and initialize schema
- [x] Install dotenv for environment variables
- [x] Configure environment variables file
  - [x] Database URL
  - [x] JWT secret
  - [ ] Email & SMS API credentials

---

### **2️⃣ Database & Models**

- [x] Install and configure PostgreSQL
- [ ] Enable PostGIS extension
- [x] Create Reports table in Prisma schema
- [x] Create Admin table in Prisma schema
- [x] Create Bus Stations table in Prisma schema
- [x] Create Traffic Officers table in Prisma schema
- [x] Run initial database migration

---

### **3️⃣ Authentication & Security**

- [x] Install bcrypt for password hashing
- [x] Install jsonwebtoken for authentication
- [x] Implement user registration (Admin, Bus Station, Traffic Officer)
- [x] Implement login route with JWT token generation
- [x] Set up role-based access control
- [x] Add **helmet** for HTTP header security
- [x] Add **CORS** for cross-origin requests

---

### **4️⃣ API Endpoints**

- [x] Implement Reports CRUD endpoints
- [ ] Create admin management endpoints
- [ ] Create bus station endpoints
- [ ] Create traffic officer endpoints
- [ ] Implement report assignment functionality
- [x] Add status update endpoints

---

### **5️⃣ File Uploads**

- [ ] Install multer for file handling
- [ ] Configure file upload directory
- [ ] Implement file type validation
- [ ] Create attachment storage system (Store file paths in database)
- [ ] Add file size limits

---

### **6️⃣ Geolocation**

- [ ] Configure geolocation data storage
- [ ] Implement coordinate-based queries
- [ ] Add region-based filtering
- [ ] Create town/city name mapping

---

### **7️⃣ Notifications**

- [ ] Install email notification package (**Nodemailer** )
- [ ] Configure SMS alert system ( **Twilio** (Free Tier) )
- [ ] Set up report assignment notifications
- [ ] Implement status update alerts
- [ ] Create notification templates

---

### **8️⃣ Validation**

- [ ] Install input validation library (**zod** )
- [ ] Validate all incoming request data
  - [ ] Report submissions
  - [ ] Validate user registration data
- [ ] Implement endpoint parameter validation
- [ ] Add request body sanitization

---

### **9️⃣ Documentation**

- [ ] Install API documentation tools (**swagger-ui-express** & **yamljs**)
- [ ] Create Swagger API documentation
- [ ] Document all endpoints
- [ ] Create usage examples
- [ ] Add error code reference
- [ ] Generate interactive API docs

---

### **🔟 Testing**

- [ ] Install testing frameworks ( **jest** & **supertest**)
  - [ ] Write unit tests for critical functions
  - [ ] Write authentication tests
  - [ ] Create endpoint tests
  - [ ] Implement database tests
- [ ] Set up CI testing pipeline
- [ ] Install **compression** for smaller responses
- [ ] Configure **PM2** for production process management

### **🚀 Deployment**

- [ ] Prepare production environment
- [ ] Configure database for production
- [ ] Set up application server
- [ ] Implement HTTPS encryption
- [ ] Configure process management
