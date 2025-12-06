# 📋 Job Application Tracker

A modern and responsive **Job Application Tracking Web Application** that helps users organise, track, and manage their job search efficiently with a clean, dashboard-style interface and intuitive workflows.

------------------------------------------------------------------------

## 🚀 Features

- User authentication (Register / Login / Logout)  
- Add, edit, update and manage job applications  
- Track application stages (Applied → Interviewing → Negotiating → Accepted)  
- Interactive dashboard with charts, status breakdown, and activity timeline  
- Filter, group, and sort applications easily  
- Slide-in **Job Detail Panel** with notes  
- Weekly goals and upcoming tasks widget  
- Responsive and modern UI design  
- Custom reusable UI components  
- Secure password hashing  

------------------------------------------------------------------------

## 🖥️ Demo Screenshots

### 🔐 Login Page  
<img width="1914" height="912" alt="login" src="https://github.com/user-attachments/assets/96d88917-7bdd-4680-b050-01ee49588ae6" />

### 📝 Register Page  
<img width="1909" height="905" alt="register" src="https://github.com/user-attachments/assets/bbc11431-0b6c-44a2-9bf9-b649464d43cd" />

### 🏠 Home / Landing Page  
<img width="1910" height="907" alt="home_page" src="https://github.com/user-attachments/assets/650b38da-b7f5-4db4-afa1-92f87c98666b" />

### 📊 Dashboard Overview  
<img width="1915" height="909" alt="dashboard" src="https://github.com/user-attachments/assets/9b65af41-984d-4814-aaa2-593d931f3be7" />

### 📁 Applications List  
<img width="1909" height="908" alt="applications" src="https://github.com/user-attachments/assets/3e1fc7f4-ab5a-479d-a3f6-19f50d8d7e40" />

### 🔎 Job Detail Panel  
<img width="1904" height="904" alt="job_detail_panel" src="https://github.com/user-attachments/assets/82ff7f83-7826-4855-ad64-a7ff59e55edf" />

### 👤 Profile Page  
<img width="1916" height="908" alt="profile" src="https://github.com/user-attachments/assets/26497f4f-f952-4e12-bf36-2b73ec11d1bc" />

------------------------------------------------------------------------

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | HTML, CSS, Bootstrap, JavaScript |
| Backend     | Flask (Python) |
| Database    | SQLite |
| ORM         | SQLAlchemy |
| UI Design   | Custom Modern Responsive Theme |

------------------------------------------------------------------------

## ⚙️ How To Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/HalidMY/JobHunt.git
cd JobHunt
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate it:

**Windows**

```bash
venv\Scripts\activate
```

**Mac / Linux**

```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install flask flask_sqlalchemy werkzeug
```

### 4. Run the application

```bash
python app.py
```

Open your browser:

http://127.0.0.1:5000/

------------------------------------------------------------------------

## 📂 Project Structure

```
JOBHUNT/
│
├── instance/
│   └── jobs.db
│
├── screenshots/
│   ├── home_page.png
│   ├── dashboard.png
│   ├── applications.png
│   ├── job_detail_panel.png
│   ├── login.png
│   ├── profile.png
│   └── register.png
│
├── static/
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── dashboard.js
│       ├── applications.js
│       └── main.js
│
├── templates/
│   ├── layout.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── applications.html
│   ├── job_detail_panel.html
│   └── profile.html
│
├── utils/
│   └── helpers.py
│
├── .gitignore
├── app.py
└── README.md
```

------------------------------------------------------------------------

## 🧭 Usage Flow

1. Register or Login  
2. Add job applications with company, role, status & notes  
3. Track application progress through the pipeline  
4. View analytics from the Dashboard  
5. Open the slide panel to see job details and notes  
6. Manage profile settings anytime  

------------------------------------------------------------------------

## 🔮 Planned Improvements

- Dark / Light mode toggle  
- Advanced filtering & search  
- Resume/CV attachments  
- Notifications & reminders  
- Company insights & job metadata  
- REST API for mobile integration  
- React or Vue front-end version  

------------------------------------------------------------------------

## 👨‍💻 Author

**Halid Mahmutyazicioglu**  
GitHub: https://github.com/HalidMY

Project Repository:  
👉 https://github.com/HalidMY/JobHunt

------------------------------------------------------------------------

⭐ If you found this project helpful, please consider starring the repository!
