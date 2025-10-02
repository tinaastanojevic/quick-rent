# Quick-Rent Web Application
This is a full-stack, role-based equipment rental application that allows users to browse available items, select rental start and end dates, and submit rental requests. Owners can review, approve, or reject requests, and users receive real-time notifications when the status of their requests changes.
## Technologies Used

**Frontend**  
- React v19.0.0
- Tailwind CSS v4.1.4
- React Hook Form 7.56.1 (Form handling)  
- @tanstack/react-query 5.85.5 (Data fetching & caching) 

**Backend**  
- ASP.NET Core 8.0  
- Entity Framework Core v9.0.4 (ORM)  
- PostgreSQL (Database)  
- SignalR v1.2.0 (real-time notifications)  
- jsonwebtoken v8.9.0 (JWT Authentication) 
- BCrypt v4.0.3 (password hashing)

## Getting Started

### Prerequisites
- Node.js v18.x.x or later
- .NET 8.0 SDK
- PostgreSQL v16.x.x

1. Install Dependencies

```
# Frontend
cd quick-rent
npm install

# Backend
cd Backend
dotnet restore
```
2. Start PostgreSQL server

   Note for **Windows** users:
    If you're using pgAdmin, the PostgreSQL server usually starts automatically when you launch pgAdmin.
   
   Note for **Linux** users:
   To start the PostgreSQL server manually, use the following command in your terminal:
   ```
   sudo service postgresql start
   ```

3. Run the application
   
   To start the application, make sure to run both the backend and frontend using the following commands:
   ```
   # Run the backend
   cd Backend
   dotnet run
   ```

   ```
   # Run the frontend
   cd quick-rent
   npm run dev
   ```
