# MES-ERP-CRM Integration Project

## Overview
This project demonstrates the integration of three enterprise systems: 
- **MES (Manufacturing Execution System)**: Tracks production data.
- **ERP (Enterprise Resource Planning)**: Manages orders, inventory, and clients.
- **CRM (Customer Relationship Management)**: Handles customer data and order statuses.

The goal is to synchronize data between these systems, ensuring that order and inventory information is consistently updated across all platforms.

## Features
- **MES System**
  - Stores production data (items and available quantity).
  - Sends stock updates to ERP when an order is placed.
- **ERP System**
  - Manages orders and inventory.
  - Sends order information to CRM.
- **CRM System**
  - Stores client details and order statuses.
  - Fetches updated order information from ERP.
- **REST API Integration**
  - Express.js servers for each system.
  - PostgreSQL databases.
  - Data exchange via HTTP requests in JSON format.

## Technologies Used
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **API Communication:** Axios for HTTP requests

## Setup Instructions
### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Stellce/mes-erp-crm.git
   cd mes-erp-crm
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up PostgreSQL databases named MES, CRM, ERP and tables:
   ```bash
   psql -U postgres -f create_tables.sql
   ```
4. Start the systems:
   - MES System:
     ```bash
     node MES/app.js
     ```
   - ERP System:
     ```bash
     node ERP/app.js
     ```
   - CRM System:
     ```bash
     node CRM/app.js
     ```

## API Endpoints
- **MES**
  - `GET /items` → Retrieve available items.
  - `PUT /items` → Update item stock.
- **ERP**
  - `GET /orders` → Retrieve orders.
  - `POST /orders` → Create a new order.
- **CRM**
  - `GET /clients` → Retrieve clients.