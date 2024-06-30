Angular and Spring Boot Application
===================================

This repository contains an Angular frontend and a Spring Boot backend application.

Prerequisites
-------------

Before running the applications, make sure you have the following installed:

-   Node.js and npm (Node Package Manager) - [Download Node.js](https://nodejs.org/)
-   Angular CLI - Install globally using npm:

    bash

    Copy code

    `npm install -g @angular/cli`

-   Java Development Kit (JDK) - [Download JDK](https://adoptopenjdk.net/)

Running the Angular Application
-------------------------------

### 1\. Clone the Repository

Clone this repository to your local machine:

bash

Copy code

`git clone <repository-url>
cd blautechtest`

### 2\. Navigate to the Angular App

bash

Copy code

`cd todo-app`

### 3\. Install Dependencies

Install dependencies using npm:

bash

Copy code

`npm install`

### 4\. Run the Angular Development Server

Run the Angular development server:

bash

Copy code

`ng serve`

Navigate to `http://localhost:4200/` in your browser to see the Angular application running.

Running the Spring Boot Application
-----------------------------------

### 1\. Navigate to the Spring Boot App

bash

Copy code

`cd ../todo_api`

### 2\. Setting Up MySQL Database Connection

To run the application locally, follow these steps to set up the MySQL database connection:

1.  **Install MySQL Server:**

    -   If MySQL Server is not already installed on your machine, download and install it from the [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/) page.
2.  **Create a Database:**

    -   Open MySQL Workbench or any MySQL client of your choice.
    -   Execute the script provided in the project's root directory (db_todo_script.sql) to create the database schema.

3.  **Configure Database Connection:**

    -   Navigate to your Spring Boot application properties file (`application.properties` or `application.yml` typically found in `src/main/resources`).
    -   Configure the database connection properties:
        -   **Using `application.properties`:**

            properties

            Copy code

            `spring.datasource.url=jdbc:mysql://localhost:3306/todo_app_db
            spring.datasource.username=your_username
            spring.datasource.password=your_password
            spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
            spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect`

        -   **Using `application.yml`:**

            yaml

            Copy code

            `spring:
              datasource:
                url: jdbc:mysql://localhost:3306/todo_app_db
                username: your_username
                password: your_password
                driver-class-name: com.mysql.cj.jdbc.Driver
              jpa:
                properties:
                  hibernate:
                    dialect: org.hibernate.dialect.MySQLDialect`

        -   Replace `your_username` and `your_password` with your MySQL username and password.


### 3\. Build and Run the Application

Build and run the Spring Boot application using Maven:

bash

Copy code

`./mvnw spring-boot:run`

Alternatively, you can build the JAR file and run it:

bash

Copy code

`./mvnw clean package
java -jar target/spring-boot-app.jar`

The Spring Boot application will start on `http://localhost:8080/`.

Accessing the Full Application
------------------------------

Once both applications are running:

-   Navigate to `http://localhost:4200/` to access the Angular frontend.
-   The Angular frontend communicates with the Spring Boot backend running on `http://localhost:8080/`.


Testing Endpoints
-----------------

### TaskController Endpoints

**1\. Get all tasks:**

-   **Endpoint:** GET `/api/tasks`
-   **Description:** Retrieves all tasks.
-   **How to Test:** Send a GET request to `http://localhost:8080/api/tasks`.
-   **Expected Response:** A JSON array containing tasks.

**Example Response:**

json

Copy code

`[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "state": "PENDING",
    "created_at": "2024-07-01T10:30:00",
    "user": { "id": 1, "username": "user1", "fullName": "User One" }
  }
]`

**2\. Get tasks by user ID:**

-   **Endpoint:** GET `/api/tasks/user/{userId}`
-   **Description:** Retrieves tasks by user ID.
-   **How to Test:** Replace `{userId}` with a valid user ID and send a GET request to `http://localhost:8080/api/tasks/user/{userId}`.
-   **Expected Response:** A JSON array containing tasks for the user.

**Example Response:**

json

Copy code

`[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "state": "PENDING",
    "created_at": "2024-07-01T10:30:00",
    "user": { "id": 1, "username": "user1", "fullName": "User One" }
  }
]`

**3\. Get task by ID:**

-   **Endpoint:** GET `/api/tasks/{id}`
-   **Description:** Retrieves a task by ID.
-   **How to Test:** Replace `{id}` with a valid task ID and send a GET request to `http://localhost:8080/api/tasks/{id}`.
-   **Expected Response:** JSON object representing the task if found, or 404 if not found.

**Example Response (Found):**

json

Copy code

`{
  "id": 1,
  "title": "Task 1",
  "description": "Description of Task 1",
  "state": "PENDING",
  "created_at": "2024-07-01T10:30:00",
  "user": { "id": 1, "username": "user1", "fullName": "User One" }
}`

**4\. Create a task:**

-   **Endpoint:** POST `/api/tasks`
-   **Description:** Creates a new task.
-   **How to Test:** Send a POST request to `http://localhost:8080/api/tasks` with a JSON body containing task details.
-   **Expected Response:** JSON object representing the created task with status 201 Created.

**Example Request Body:**

json

Copy code

`{
  "title": "New Task",
  "description": "Description of the new task",
  "state": "PENDING",
  "created_at": "2024-07-04T15:30:00",
  "user": { "id": 1, "username": "user1", "fullName": "User One" }
}`

**Example Response:**

json

Copy code

`{
  "id": 4,
  "title": "New Task",
  "description": "Description of the new task",
  "state": "PENDING",
  "created_at": "2024-07-04T15:30:00",
  "user": { "id": 1, "username": "user1", "fullName": "User One" }
}`

**5\. Update a task:**

-   **Endpoint:** PUT `/api/tasks/{id}`
-   **Description:** Updates an existing task.
-   **How to Test:** Replace `{id}` with the task ID and send a PUT request to `http://localhost:8080/api/tasks/{id}` with updated task details.
-   **Expected Response:** JSON object representing the updated task.

**Example Request Body:**

json

Copy code

`{
  "id": 4,
  "title": "Updated Task",
  "description": "Updated description of the task",
  "state": "IN_PROGRESS",
  "created_at": "2024-07-04T15:30:00",
  "user": { "id": 1, "username": "user1", "fullName": "User One" }
}`

**Example Response:**

json

Copy code

`{
  "id": 4,
  "title": "Updated Task",
  "description": "Updated description of the task",
  "state": "IN_PROGRESS",
  "created_at": "2024-07-04T15:30:00",
  "user": { "id": 1, "username": "user1", "fullName": "User One" }
}`

**6\. Delete a task:**

-   **Endpoint:** DELETE `/api/tasks/{id}`
-   **Description:** Deletes a task by ID.
-   **How to Test:** Replace `{id}` with the task ID and send a DELETE request to `http://localhost:8080/api/tasks/{id}`.
-   **Expected Response:** No content (204 No Content) if successful.

### UserController Endpoints

**1\. Get all users:**

-   **Endpoint:** GET `/api/users`
-   **Description:** Retrieves all users.
-   **How to Test:** Send a GET request to `http://localhost:8080/api/users`.
-   **Expected Response:** A JSON array containing all users.

**Example Response:**

json

Copy code

`[
  {
    "id": 1,
    "username": "user1",
    "fullName": "User One",
    "tasks": [
      { "id": 1, "title": "Task 1", "description": "Description of Task 1", "state": "PENDING", "created_at": "2024-07-01T10:30:00" },
      { "id": 2, "title": "Task 2", "description": "Description of Task 2", "state": "IN_PROGRESS", "created_at": "2024-07-02T14:00:00" }
    ]
  }
]`

**2\. Get user by ID:**

-   **Endpoint:** GET `/api/users/{id}`
-   **Description:** Retrieves a user by ID.
-   **How to Test:** Replace `{id}` with a valid user ID and send a GET request to `http://localhost:8080/api/users/{id}`.
-   **Expected Response:** JSON object representing the user if found, or 404 if not found.

**Example Response (Found):**

json

Copy code

`{
  "id": 1,
  "username": "user1",
  "fullName": "User One",
  "tasks": [
    { "id": 1, "title": "Task 1", "description": "Description of Task 1", "state": "PENDING", "created_at": "2024-07-01T10:30:00" },
    { "id": 2, "title": "Task 2", "description": "Description of Task 2", "state": "IN_PROGRESS", "created_at": "2024-07-02T14:00:00" }
  ]
}`

**Example Response (Not Found):**

json

Copy code

`{
  "timestamp": "2024-07-03T12:00:00",
  "status": 404,
  "error": "Not Found"
}`

**3\. Create a user:**

-   **Endpoint:** POST `/api/users`
-   **Description:** Creates a new user.
-   **How to Test:** Send a POST request to `http://localhost:8080/api/users` with a JSON body containing user details.
-   **Expected Response:** JSON object representing the created user with status 201 Created.

**Example Request Body:**

json

Copy code

`{
  "username": "new_user",
  "fullName": "New User",
  "tasks": []
}`

**4\. Update a user:**

-   **Endpoint:** PUT `/api/users/{id}`
-   **Description:** Updates an existing user.
-   **How to Test:** Replace `{id}` with the user ID and send a PUT request to `http://localhost:8080/api/users/{id}` with updated user details.
-   **Expected Response:** JSON object representing the updated user.

**Example Request Body:**

json

Copy code

`{
  "id": 5,
  "username": "updated_user",
  "fullName": "Updated User",
  "tasks": []
}`

**5\. Delete a user:**

-   **Endpoint:** DELETE `/api/users/{id}`
-   **Description:** Deletes a user by ID.
-   **How to Test:** Replace `{id}` with the user ID and send a DELETE request to `http://localhost:8080/api/users/{id}`.
-   **Expected Response:** No content (204 No Content) if successful.

This version provides a clear and concise overview of the endpoints with simplified JSON examples that demonstrate typical responses for each operation.

Additional Information
----------------------

-   Modify configurations and settings as necessary based on your environment and requirements.
-   Ensure that the necessary dependencies and tools are installed before running the applications.