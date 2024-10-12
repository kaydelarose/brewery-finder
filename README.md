
# getTapped - Brewery Finder

**getTapped** is your ultimate brewery finder. Whether you're a beer enthusiast or just starting your brewery journey, getTapped helps you discover the best breweries, craft beers, and experiences across the country.


## Features

- **User authentication**: Role-based access for customers, brewers, and admins 
- **Brewery Listing**: Browse and view detailed information for each brewery, including user reviews and ratings
- **Customer Profile**: View and edit profile information such as favorite breweries and track total reviews
- **Admin Dashboard**: Full control over managing breweries, brewers, and users


## Development Stack

#### **Frontend:**
- **React**: For building the user interface with components, hooks, and context API.
- **TypeScript**: Provides type safety and better development experience.
- **React Router**: For client-side routing and navigation between pages.
- **CSS**: Custom styling along with media queries for responsive design.
- **Bootstrap**: Predefined responsive UI elements for forms, buttons, and grids.

#### **Backend:**
- **Java (Spring Boot)**: The backend framework for REST API development.
  - **Spring Security**: Used for authentication and authorization mechanisms.
  - **Spring Data JPA**: For interacting with the database using the Data Access Object (DAO) pattern.

#### **Database:**
- **MySQL**: Relational database used for storing brewery, review, and user data.

#### **API & Data Handling:**
- **Axios**: For making HTTP requests from the React frontend to the Spring Boot backend.
- **REST API**: Follows REST principles for client-server communication, with endpoints for CRUD operations.

#### **Development Tools:**
- **Vite**: Build tool and development server for the React app.
## How to Use and Run Our Application

#### Prerequisites:

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (for the database setup)

### Step 1: Clone the Repository:

First, clone the project repository to your local machine using Git:

`git clone https://github.com/kaydelarose/brewery-finder.git `

### Step 2: Install Dependencies:

Navigate to the project directory and install all required dependencies using npm:

`cd your-repository`

`npm install`

### Step 3: Set Up Environment Variables:

Create a `.env` file in the root of the project and provide the necessary environment variables.

### Step 4: Set Up te database:

`CREATE DATABASE brewery_app;`

###\ Step 4: Run the Application:

Once the setup is complete, you can start the application using the following command:

`npm start`




## License

[MIT](https://choosealicense.com/licenses/mit/)

