# Playwright E2E Testing for Qubika Sports Club Management System

## Project Overview
This project demonstrates an end-to-end (E2E) test workflow for the Qubika Sports Club Management System using Playwright. The tests automate both the API and UI layers to ensure a comprehensive validation of the system's functionality. 

### Key Features
- Create a user via API and validate their functionality through the UI.
- Validate the login page.
- Test the creation and verification of categories and subcategories via the UI.

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or later)
- [Git](https://git-scm.com/)
- [Playwright](https://playwright.dev/)

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Tests

### Execute All Tests
Run the following command to execute the full test suite:
```bash
npx playwright test
```

### Open Playwright Test Report
After running the tests, generate and view the Playwright report:
```bash
npx playwright show-report
```

---

## Test Workflow

### 1. User Creation via API
- The test suite uses Playwright's APIRequestContext to create a user through the API.
- The user data (e.g., username, password) is dynamically generated and saved for subsequent UI tests.

### 2. Login Page Validation
- Verify that the login page loads successfully.
- Ensure critical elements like the username and password fields, login button, and error messages are present.

### 3. User Login
- Use the previously created user credentials to log in.
- Validate that the dashboard or homepage is displayed post-login.

### 4. Category and Subcategory Creation
- Navigate to the Categories page.
- Create a new category and validate its successful addition to the list.
- Add a subcategory and validate its successful addition to the list.

---
