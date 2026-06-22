"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../Config/firebase";
import "./dashboard.css";

function DashBoard() {
  const [messages, setMessages] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const settingRef = useRef(null);

  useEffect(() => {
    const savedChats = localStorage.getItem("recentChats");
    if (savedChats) setRecentChats(JSON.parse(savedChats));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  useEffect(() => {
    const close = (e) => {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setSettingOpen(false);
      }
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const signOut = async () => {
    await logout();
    router.push("/Login");
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const firstUserMessage = messages.find((msg) => msg.role === "user");

      const newChat = {
        id: Date.now(),
        title: firstUserMessage?.content?.slice(0, 32) || "New Chat",
        messages,
      };

      setRecentChats((prev) => [newChat, ...prev]);
    }

    setMessages([]);
    setSidebarOpen(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role === "ai" ? "assistant" : msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: error.message || "Failed to get AI response.",
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = (chat) => {
    setMessages(chat.messages);
    setSidebarOpen(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setRecentChats([]);
    localStorage.removeItem("recentChats");
    setSettingOpen(false);
  };

  return (
    <main className="chat-app">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-head">
          <h2>Samsara.Ai</h2>
          <button onClick={handleNewChat}>+ New Chat</button>
        </div>

        <div className="recent-box">
          <p>Recent Chats</p>

          <div className="recent-list">
            {recentChats.length === 0 ? (
              <span className="empty-text">No recent chats</span>
            ) : (
              recentChats.map((chat) => (
                <button key={chat.id} onClick={() => handleOpenChat(chat)}>
                  {chat.title}
                </button>
              ))
            )}
          </div>
        </div>

        <div ref={settingRef} className="settings-wrap">
          {settingOpen && (
            <div className="settings-menu">
              <button onClick={() => router.push("/maintenance")}>
                Profile
              </button>
              <button onClick={handleClearChat}>Clear Chats</button>
              <button onClick={() => router.push("/privacypage")}>
                Privacy Policy
              </button>
              <button onClick={signOut} className="danger">
                Logout
              </button>
            </div>
          )}

          <button
            className="settings-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSettingOpen((prev) => !prev);
            }}
          >
            Settings
          </button>
        </div>
      </aside>

      <section className="chat-main">
        <header className="chat-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>

          <div>
            <h1>Samsara.Ai</h1>
            <p>Your minimal AI assistant</p>
          </div>

          <button
            className="profile-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSettingOpen((prev) => !prev);
            }}
          >
            ●
          </button>
        </header>

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="hero">
              <div className="hero-icon">✦</div>
              <h2>How can I help today?</h2>
              <p>Ask anything. Keep it simple, clear, and fast.</p>
            </div>
          ) : (
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}

              {loading && <div className="message ai">Thinking...</div>}
            </div>
          )}
        </div>

        <div className="input-wrap">
          <div className="input-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask anything..."
            />

            <button onClick={handleSend} disabled={loading}>
              ↑
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashBoard;