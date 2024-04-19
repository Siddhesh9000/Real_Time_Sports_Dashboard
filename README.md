# RealTimeSportsDashboard

🚀 Features
Live Updates: Get real-time updates on sports events, including scores, schedules, and match details.
Last Home Matches: View the last home matches of a specific team.
Responsive Design: Access the dashboard seamlessly across different devices and screen sizes.
🛠️ Technologies Used
Frontend: HTML, CSS, JavaScript (Bootstrap, Font Awesome)
Backend: Go (Gorilla Mux)
Environment Management: Docker and Docker Compose for containerization
Live Reloading: Air for development live reloading
Data Source: TheSportsDB API

# Setup and Running
Prerequisites
Go (version 1.22.1)
Docker and Docker Compose
Node.js and npm (for BrowserSync)

🏃‍♂️ Getting Started
To get a local copy up and running, follow these steps:
1.Clone the repository:
git clone https://github.com/yourusername/real-time-sports-dashboard.git

2.Navigate to the project directory:
cd real-time-sports-dashboard

3.Start the server Using Docker Compose:
docker-compose up

4.Start the server manual mode you can use :
go run main.go

5.Access the dashboard in your web browser:
http://localhost:8080

📡 API Usage
Last Home Matches
Endpoint: /api/last-events/{teamId}

Method: GET

Parameters:

teamId: The ID of the team for which you want to retrieve last home matches.
Example:

sql
Copy code
GET /api/last-events/133602
🤝 Contributing
Contributions are welcome! Feel free to open a new issue or submit a pull request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements
Special thanks to TheSportsDB for providing the sports data API.
