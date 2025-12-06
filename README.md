🎯 Job Application Tracker

A modern, responsive Front-End Web Application designed to help users track and manage their job applications with a clean, intuitive interface.
The project showcases front-end development, interactive UI components, dashboard analytics, and a polished SaaS-style design system.

🚀 Features
🖥️ Front-End Highlights

Fully responsive layout with modern UI and smooth user experience

Clean sidebar navigation (Dashboard · Applications · Profile)

Dynamic application table with:

Filtering

Grouping

Sorting

Status counters

Interactive dashboard with:

Applications over time chart

Status breakdown

Recent activity feed

Weekly goals widget

Upcoming reminders

Slide-in Job Detail Panel with stage progression (Applied → Interviewing → Negotiating → Accepted)

Profile page with editable user info

Clean and accessible form components (login, register, edit forms)

Custom reusable UI components (badges, cards, progress bars, buttons)

🛠 Under-the-hood

While the focus of this project is the front end, it includes a lightweight Flask backend for:

Authentication (Register / Login / Logout)

User session management

Basic CRUD operations for job data

🖼️ Demo Screenshots
🏠 Landing / Home Page
<img width="1910" height="907" alt="home_page" src="https://github.com/user-attachments/assets/f8418a4e-aa49-4f72-bfcd-ff53d7342a1a" />

🔐 Login Page
<img width="1914" height="912" alt="login" src="https://github.com/user-attachments/assets/a5423b73-829b-4e0a-97fa-2272ecb046d4" />

📝 Register Page
<img width="1909" height="905" alt="register" src="https://github.com/user-attachments/assets/c30264b4-4fe4-4a92-a05e-50b1c28341e8" />

📊 Dashboard Overview
<img width="1915" height="909" alt="dashboard" src="https://github.com/user-attachments/assets/f266dc68-e2f8-4156-bdba-d32748a703d5" />

📁 Applications List
<img width="1909" height="908" alt="applications" src="https://github.com/user-attachments/assets/ffa3fcaa-69d8-4f21-b563-972fcc2e3f2c" />

🔎 Job Detail Slide Panel
<img width="1904" height="904" alt="job_detail_panel" src="https://github.com/user-attachments/assets/7a144f93-19eb-4c07-8ac2-da854abfbfe5" />

👤 Profile Page
<img width="1916" height="908" alt="profile" src="https://github.com/user-attachments/assets/7a882032-a747-45e4-831f-2d1ccad9484c" />

🛠️ Tech Stack
Front-End (Primary Focus)

HTML5

CSS3

Bootstrap 5

JavaScript (ES6)

Custom responsive UI design

Backend (Supporting)

Flask (Python)

SQLite

SQLAlchemy

Werkzeug (for secure password hashing)

⚙️ How to Run Locally
1. Clone the repository
git clone https://github.com/HalidMY/JobHunt.git
cd JobHunt

2. Create virtual environment
python -m venv venv


Activate:

Windows

venv\Scripts\activate


Mac/Linux

source venv/bin/activate

3. Install dependencies
pip install flask flask_sqlalchemy werkzeug

4. Run the application
python app.py


Open in browser:

http://127.0.0.1:5000/

📂 Project Structure
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
├── app.py
└── README.md

🧭 App Workflow

User registers or logs in

Dashboard shows real-time analytics

Users add, edit, or manage job applications

Each job can move through stages visually

Detail panel shows interview notes & logs

Weekly goals help track progress

Profile page allows personal info updates

🔮 Planned Improvements

Light/Dark mode toggle

Search & advanced filtering

Resume/CV upload for each application

Notifications or reminder system

Company insights panel

REST API for mobile app integration

React or Vue front-end version

👨‍💻 Author

Halid Mahmutyazicioglu
GitHub: https://github.com/HalidMY

Project Repository:
👉 https://github.com/HalidMY/JobHunt
