# PDF Upload API

A Node.js + Express REST API for authenticated PDF uploads with text extraction, user management, upload limits, and soft delete functionality.  
Uses MongoDB as the database.

---

## Features

- User registration and login with JWT authentication  
- Upload single or multiple multi-page PDFs  
- Extract text content from all pages using `pdf-parse`  
- Store file metadata and extracted text in MongoDB  
- Limit each user to upload a maximum of 5 PDF files  
- Soft delete API to mark files as deleted without removing from DB  
- Secure routes with JWT, except for login/signup  

---

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)  
- MongoDB (local or Atlas cloud instance)  

---

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/abdul826/PDF_Upload.git
   cd PDF_Upload

2. **Install dependencies**
   ```bash
   npm install

4. **.env file**
      ```bash
    .env file is already present just add the details

6. **Create uploads directory**
   ```bash
    mkdir uploads

8. **Add below lien in package.json inside scripts**
    ```bash
    "scripts": {
    "start": "nodemon server.js"
  }

10. **Run the server**
    ```bash
    npm start

12. **API Endpoints with Methods**
    ```bash
    Register(Post) -    http://localhost:8080/api/register
    Login(Post) -       http://localhost:8080/api/login
    Upload PDF(Post) -  http://localhost:8080/api/pdf/upload
    List PDF(Get) -     http://localhost:8080/api/pdf/show
    Soft Delete(Delete) - http://localhost:8080/api/pdf/delete/mention_ID 

    Note: Mention your localhost Port in my case it is 8080

14. **USES**
   ```bash
    Register
    {
        "username": "test",
        "email": "test@gmail.com",
        "password": "",
        "cPassword": ""
    }

    Login
    {
    "email":"test@gmail.com",
    "password": ""
    }

    Upload PDF
    a. Login First using login API
    b. Go to Headers
    c. Write Authorization in key
    d. Paste token value which is generated after login
    e. Go to Body and click on form-data
    f. Write pdf in key and select pdf file form your system
    g. Run the API

    List the PDF data
    a. Login First using login API
    b. Go to Headers
    c. Write Authorization in key
    d. Paste token value which is generated after login
    e. Run the API

    Soft Delete
    a. Login First using login API
    b. Go to Headers
    c. Write Authorization in key
    d. Paste token value which is generated after login
    e. Run the API
