# Stock Viewer

Stock Viewer is a full-stack web application that allows users to manage their stock portfolios and view real-time stock data.  
Users can add and remove stocks from their personal portfolio, view detailed stock information, and navigate easily between portfolio and individual stock pages.

## User Stories:

- Users can **add and remove stocks** in their portfolio
- Users can **navigate** between the portfolio page and stock details page
- On the stock details page, users can see the **latest stock quote** and the **percentage change** for today
---

## Tech Stack

### Frontend
- React
- Redux (state management)
- Ant Design (UI components)
- Axios

### Backend
- NestJS (Node.js framework)
- MongoDB (via Mongoose)
- REST API
- Financial Modeling Prep API

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vladimirrogalev/the5ers.git
cd the5ers
```

---

### 2. Setup the Backend

```bash
cd server
npm install
```

#### Start the NestJS server:

```bash
npm run start:dev
```

By default, the server will run at [http://localhost:3000](http://localhost:4000)

---

### 3. Setup the Frontend

```bash
cd client
npm install
```

#### Start the React app:

```bash
npm run dev
```

This will open [http://localhost:5173](http://localhost:3000) in your browser.

---


