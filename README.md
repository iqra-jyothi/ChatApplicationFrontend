# ChatApplicationFrontend
<h2>Frontend Overview</h2>

<p>
  The frontend of the <strong>Personal Chat Application</strong> is a <strong>responsive, real-time messaging platform</strong> built with <strong>React.js</strong> and <strong>Vite</strong>.
  It supports <strong>user registration</strong>, <strong>login</strong>, <strong>profile setup</strong>, <strong>public chatroom</strong>, 
  <strong>private one-to-one chats</strong>, and real-time updates using <strong>WebSocket (STOMP over SockJS)</strong>.
  The application securely communicates with the backend using <strong>JWT tokens</strong> and provides a smooth and interactive chat experience.
</p>

<h2>🛠️ Frontend Technologies Used</h2>

<ul>
  <li><strong>Framework:</strong> React.js (with functional components and hooks)</li>
  <li><strong>Build Tool:</strong> Vite</li>
  <li><strong>State Management:</strong> React Context API / useState / useReducer</li>
  <li><strong>Routing:</strong> React Router</li>
  <li><strong>Real-Time Communication:</strong> SockJS + STOMP.js (WebSocket Client)</li>
  <li><strong>HTTP Requests:</strong> Axios (for API calls)</li>
  <li><strong>Authentication:</strong> JWT Token Handling (localStorage/sessionStorage)</li>
  <li><strong>Form Handling:</strong>  basic React Forms</li>
  <li><strong>UI Design:</strong> Custom CSS</li>
</ul>
<h2>📁 Folder Structure</h2>

<pre>
/personal-chat-frontend
│
├── /public
│    └── index.html
│
├── /src
│    ├── /assets
│    │    └── (images, icons, stylesheets)
│    │
│    ├── /components
│    │    ├── ChatRoom.jsx
│    │    ├── PrivateChat.jsx
│    │    ├── Home.jsx
│    │    └── ProfileSetup.jsx
│    │    ├── Login.jsx
│    │    ├── Register.jsx
│    │    ├── ForgotPassword.jsx
│    │    ├── reset.jsx
│    │    └── verify.jsx
|    |    └── PCALogo.jsx
│    │
│    ├── /styles
│    │    └── (All custom CSS or Tailwind config)
│    │
│    ├── App.jsx
│    ├── main.jsx
│    └── router.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── tailwind.config.js
</pre>

<p><b>Summary:</b></p>

<table>
  <thead>
    <tr>
      <th>Folder</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/assets</td>
      <td>Images, logos, and static files</td>
    </tr>
    <tr>
      <td>/components</td>
      <td>Reusable UI components (Chat, Navbar, etc.)</td>
    </tr>
    <tr>
      <td>/styles</td>
      <td>Global Css</td>
    </tr>
  </tbody>
</table>
<h2>⚙️ Installation Instructions</h2>

<ol>
  <li>Clone the repository:</li>
  <pre><code>git clonehttps://github.com/iqra-jyothi/ChatApplicationFrontend.git</code></pre>

  <li>Navigate to the project directory:</li>
  <pre><code>cd chat-app</code></pre>

  <li>Install all dependencies:</li>
  <pre><code>npm install</code></pre>

  <li>Start the development server:</li>
  <pre><code>npm run dev</code></pre>
</ol>

<h3>📦 Major Packages Installed</h3>

<ul>
  <li><b>React Icons:</b> For using beautiful icons</li>
  <pre><code>npm install react-icons</code></pre>

  <li><b>jwt-decode:</b> For decoding JWT tokens on the client side</li>
  <pre><code>npm install jwt-decode</code></pre>

  <li><b>WebSocket Client Libraries:</b> STOMP.js and SockJS for real-time communication</li>
  <pre><code>npm install @stomp/stompjs sockjs-client</code></pre>

  <li><b>React Router:</b> For page routing/navigation</li>
  <pre><code>npm install react-router-dom</code></pre>

  <li><b>React Bootstrap:</b> For pre-built responsive UI components</li>
  <pre><code>npm install react-bootstrap bootstrap</code></pre>

  <li><b>Axios:</b> For making HTTP requests to the backend</li>
  <pre><code>npm install axios</code></pre>

  <li><b>Tailwind CSS (Optional if used):</b> For utility-first CSS styling</li>
  <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>

</ul>

<h3> Additional Requirements</h3>
<ul>
  <li>Node.js and npm installed (Recommended Node.js version: 18+)</li>
  <li>Backend Server running (Spring Boot Application) for API and WebSocket connections</li>
</ul>
<h2>🚀 Features</h2>

<ul>
  <li>📝 <b>User Registration and Login:</b> Secure authentication using JWT tokens</li>
  <li>🔐 <b>Two-Factor Authentication (2FA):</b> OTP verification via email during signup and password reset</li>
  <li>💬 <b>Public Chatroom:</b> Real-time group chat using WebSocket (STOMP over SockJS)</li>
  <li>📬 <b>Private Messaging:</b> One-to-one real-time messaging with other registered users</li>
  <li>📜 <b>Chat History:</b> Previous messages displayed for both public and private conversations</li>
  <li>👤 <b>User Profile Setup:</b> Setup or update profile with username and profile picture</li>
  <li>🚪 <b>Logout Functionality:</b> Clear session and securely log out</li>
  <li>🎨 <b>Responsive UI Design:</b> Fully responsive layout using custom CSS, Tailwind CSS, or React Bootstrap</li>
</ul>
<h2> WebSocket Events</h2>

<ul>
  <li><b>🔌 Connection Setup:</b> Establish WebSocket connection using SockJS and STOMP client.</li>

  <li><b>📥 Subscribe to Topics:</b>
    <ul>
      <li><code>/topic/public</code> — Subscribe for public group chat messages.</li>
      <li><code>/user/queue/private</code> — Subscribe for private one-to-one chat messages (specific to the logged-in user).</li>
    </ul>
  </li>

  <li><b>📤 Send Messages:</b>
    <ul>
      <li><code>/app/message</code> — Send a message to the public chatroom.</li>
      <li><code>/app/private/message</code> — Send a private message to a specific user by their email.</li>
    </ul>
  </li>

  <li><b>📡 Flow:</b> Client connects → subscribes to the appropriate channels → sends/receives messages in real-time via WebSocket.</li>
</ul>
<h2> Components Description</h2>

<ul>
  <li><b>ChatRoom.js:</b> Displays all public chat messages in a group chatroom interface.</li>

  <li><b>PrivateChat.js:</b> Manages private one-on-one chat functionality between two users.</li>

  <li><b>PCALogo:</b> Component to display the logo or branding of the Personal Chat Application.</li>

  <li><b>Home.js:</b> Main landing page after login, showing user lists, search functionality, and access to chats.</li>

  <li><b>Login.js and Signup.js:</b> Forms to handle user authentication (login and registration) with validation.</li>

  <li><b>ProfileSetup.js:</b> Allows users to set up their profile (name, avatar/photo) after signing in for the first time.</li>
</ul>
<h2>screenshot</h2>


