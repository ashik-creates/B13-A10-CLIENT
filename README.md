# Name: TicketBari

## Description:

TicketBari is a modern online ticket booking platform built with Next.js where users can search, browse, and book transportation tickets for buses, trains, planes, and ships. Vendors can add and manage transportation tickets, while administrators oversee the entire platform by managing users, tickets, and promotional advertisements. The application provides a seamless and responsive experience with advanced filtering, secure authentication, and role-based dashboards.

## Purpose:

TicketBari is a full-stack transportation ticket management and booking application created to demonstrate how a real-world online ticketing platform operates using modern web technologies. The project utilizes Next.js App Router, secure authentication, MongoDB integration, dynamic search and filtering, role-based authorization, and a responsive user interface. The goal is to provide travelers with a convenient and user-friendly platform to discover and reserve transportation tickets efficiently.

## Key Features:

### Authentication System:

Email and password authentication is implemented using Better Auth. Users can securely register, login, maintain sessions using cookies, and logout with toast notifications. Protected routes and role-based access control ensure that users, vendors, and administrators can only access authorized resources.

### Multi-Role Dashboard:

The platform supports three different roles:

* **User:** Can browse tickets, book tickets, view booking history, and access transaction records.
* **Vendor:** Can add transportation tickets, manage their created tickets, review booking requests, and monitor revenue statistics.
* **Admin:** Can manage users, approve or reject tickets, and advertise featured tickets.

### Transportation Ticket Management:

Vendors can create transportation listings by providing ticket details such as title, route, transportation type, departure time, seat quantity, price, images, and additional perks. Vendors can also manage and update their own tickets from the dashboard.

### Ticket Booking System:

Authenticated users can reserve available transportation tickets. The system automatically updates seat availability and prevents overbooking through backend validation.

### Dynamic Search and Filtering:

Users can quickly discover tickets using powerful filtering options including:

* Search by departure location.
* Search by destination.
* Filter by transportation type.
* Sort tickets by price (ascending or descending).

Search results update dynamically, providing a smooth browsing experience.

### Ticket Approval Workflow:

Newly added tickets remain in a pending state until reviewed by administrators. Admins can approve or reject submitted tickets directly from the management dashboard.

### Revenue and Booking Management:

Vendors can monitor their booking requests and track revenue generated from ticket sales through dedicated dashboard sections.

### Responsive Modern UI:

The application is fully responsive across mobile, tablet, and desktop devices. Custom mobile navigation, responsive layouts, modern cards, tables, and optimized components ensure an excellent user experience on all devices.

### Performance Optimization:

Next.js Server Components are utilized wherever possible to improve application performance and minimize unnecessary client-side rendering. Images are optimized using the Next.js Image component for better loading performance and layout stability.

### User Experience Enhancements:

Toast notifications provide instant feedback for actions such as authentication, booking confirmations, ticket approval, and ticket management operations. Clean navigation and intuitive interfaces enhance the overall user experience.

## Tech and NPM Packages Used:

### Next.js (App Router):

Used for routing, server-side rendering, dynamic routes, loading states, and modern React architecture with Server and Client Components.

### Tailwind CSS:

Provides utility-first responsive styling for building modern and highly customizable user interfaces.

### HeroUI:

Used for reusable and accessible UI components such as Buttons, Tables, Inputs, Selects, Cards, Pagination, Modals, Drawers, Forms, and Spinners.

### Better Auth:

Handles authentication, session management, secure login system, and cookie-based user sessions.

### MongoDB:

Stores application data including users, tickets, bookings, transactions, and advertisements.

### Express.js:

Serves as the backend API server for handling business logic, ticket management, authentication, bookings, and database operations.

### React Hot Toast:

Provides elegant toast notifications for authentication, booking actions, and dashboard operations.

### React Icons:

Used throughout the application to provide visually appealing and consistent icons.

## 🚀 Run the Project Locally

### 1. Clone the Repositories

```bash
# Client
git clone https://github.com/ashik-creates/ticketbari-client.git

# Server
git clone https://github.com/ashik-creates/ticketbari-server.git
```

### 2. Navigate to the Project Directories

```bash
cd ticketbari-client
```

Open another terminal:

```bash
cd ticketbari-server
```

### 3. Install Dependencies

Run the following command in both the client and server directories:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file inside the client project and a `.env` file inside the server project.

#### (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

> Replace the placeholder values with your own credentials.

### 5. Start the Development Servers

Start the backend:

```bash
npm run dev
```

Start the frontend:

```bash
npm run dev
```

### 6. Open the Application

Visit:

```
http://localhost:3000
```

The frontend will communicate with the backend running on:

```
http://localhost:5000
```

## Live URL:

https://b13-a10-client-dusky.vercel.app
