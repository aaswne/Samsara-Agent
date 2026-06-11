# Samsara AI Chatbot

Samsara AI is a modern conversational AI chatbot built using **Next.js**, **Google Gemini AI**, and **Firebase**.  
It provides a smooth and responsive chat interface where users can interact with an AI assistant in real time.

The project demonstrates secure AI API integration using **Next.js backend routes** and modern frontend technologies.

---

# Author

**Aswin Krishna**

- BCA Graduate  
- AI & Software Development Enthusiast  


GitHub: https://github.com/aaswne/

---

# Features

- AI powered chatbot using **Google Gemini**
- Modern UI built with **Next.js**
- Secure server-side AI API integration
- Smooth chat interface
- Auto-scrolling chat messages
- Hidden scrollbar clean UI
- Environment variable security for API keys
- Ready for Firebase integration

---

# Tech Stack

Frontend
- Next.js 
- React 
- TypeScript
- CSS Modules / TailwindCSS

Backend
- fire base
- fire store

AI
- Google Gemini API
- @google/genai SDK


Development Tools
- Node.js
- npm
- Git & GitHub
- next js 

---

# Project Structure

## Project Structure

```
samsara-ai/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   │
│   ├── components/
│   │   ├── MainInput.jsx
│   │   ├── MainInput.css
│   │   ├── SideBar.jsx
│   │   ├── SideBar.css
│   │   ├── TopBar.jsx
│   │   ├── TopBar.css
│   │   ├── Spinner/
│   │   └── ThemeToggle/
│   │
│   ├── Config/
│   ├── Context/
│   │
│   ├── DashBoard/
│   ├── Forgot/
│   ├── GetStarted/
│   ├── Login/
│   │   ├── Login.jsx
│   │   └── Login.module.css
│   │
│   ├── Pages/
│   │   ├── DashBoard/
│   │   ├── Forgot/
│   │   └── GetStarted/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── Page.module.css
│   └── page.tsx
│
├── public/
│
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## How to Use

1. Open the application in your browser.

2. Create an account or sign in if authentication is enabled.

3. After logging in, you will reach the **Samsara AI chat interface**.

4. Type your message in the chat input field.

5. Press **Enter** or click the send button.

6. The message will be sent to the backend API.

7. The backend connects to **Google Gemini AI** and generates a response.

8. The AI response will appear in the chat conversation.

---

### Example

User Input:
Hello, how are you?

AI Response:
I'm doing well! How can I help you today?
