import { useState, useEffect } from "react";
import "./feed.css";

export default function Feed() {
  const [text, setText] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setProfile(saved);
  }, []);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alex",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "Instagram clone completed 🔥",
      likes: 15,
      image: "https://picsum.photos/700/400?1",
    },
    {
      id: 2,
      user: "John",
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "React is powerful ⚡",
      likes: 23,
      image: "https://picsum.photos/700/400?2",
    },
  ]);

  const addPost = () => {
    if (!text.trim()) return;

    const newPost = {
      id: Date.now(),
      user: profile?.name || "You",
      avatar: profile?.img || "image2.jpg",
      text,
      likes: 0,
      image: `https://picsum.photos/700/400?${Date.now()}`,
    };

    setPosts([newPost, ...posts]);
    setText("");
  };

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  return (
    <div className="app">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">

        <div className="profileCard">
          <img
            src="image2.jpg"
            alt=""
            className="profilePic"
          />
          <h3>{profile?.name || "Supriya"}</h3>
          <p>Full Stack Developer</p>
        </div>

        <div className="menu">
          <div className="menuItem" onClick={() => setActivePage("home")}>
            🏠 Home
          </div>

          <div className="menuItem" onClick={() => setActivePage("explore")}>
            🔍 Explore
          </div>

          <div className="menuItem" onClick={() => setActivePage("notifications")}>
            🔔 Notifications
          </div>

          <div className="menuItem" onClick={() => setActivePage("profile")}>
            👤 Profile
          </div>

          <div className="menuItem" onClick={() => setActivePage("settings")}>
            ⚙️ Settings
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="navbar">
          <h2>SocialHub</h2>

          <input
            className="search"
            placeholder="Search..."
          />

          <div className="navIcons">

            <span
              className="icon"
              onClick={() => setActivePage("theme")}
            >
              🌙
            </span>

            <span
              className="icon"
              onClick={() => setActivePage("notifications")}
            >
              🔔
            </span>

            <span
              className="icon"
              onClick={() => setActivePage("messages")}
            >
              💬
            </span>

            <span
              className="icon"
              onClick={() => setActivePage("profile")}
            >
              👤
            </span>

          </div>
        </div>

        {activePage === "home" && (
          <>
            <div className="createPost">

              <img
                src="image2.jpg"
                alt=""
                className="avatar"
              />

              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
              />

              <button onClick={addPost}>
                Post
              </button>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="post">

                <div className="postTop">
                  <img
                    src={post.avatar}
                    alt=""
                    className="avatar"
                  />

                  <strong>{post.user}</strong>
                </div>

                <p>{post.text}</p>

                <img
                  src={post.image}
                  alt=""
                  className="postImage"
                />

                <button
                  className="likeBtn"
                  onClick={() => likePost(post.id)}
                >
                  ❤️ {post.likes}
                </button>

              </div>
            ))}
          </>
        )}

        {activePage === "explore" && (
          <div className="card">
            <h2>Explore</h2>
            <p>Discover trending posts and creators.</p>
          </div>
        )}

        {activePage === "notifications" && (
          <div className="card">
            <h2>Notifications</h2>
            <p>Alex liked your post.</p>
            <p>Emma followed you.</p>
            <p>John commented on your post.</p>
          </div>
        )}

        {activePage === "profile" && (
          <div className="card">
            <img
              src="image2.jpg"
              alt=""
              className="profilePic"
            />

            <h2>{profile?.name || "Supriya"}</h2>
            <p>Full Stack Developer</p>
            <p>Total Posts: {posts.length}</p>
          </div>
        )}

        {activePage === "settings" && (
          <div className="card">
            <h2>⚙️ Settings</h2>
            <p>🌙 Dark Mode</p>
            <p>🔔 Notification Settings</p>
            <p>🔒 Privacy Settings</p>
            <p>👤 Account Settings</p>
          </div>
        )}

        {activePage === "theme" && (
          <div className="card">
            <h2>🌙 Theme</h2>
            <p>Dark Mode Enabled</p>
          </div>
        )}

        {activePage === "messages" && (
          <div className="card">
            <h2>💬 Messages</h2>
            <p>Alex: Hi 👋</p>
            <p>John: How are you?</p>
            <p>Emma: Nice project 🔥</p>
          </div>
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="rightbar">

        <div className="card">
          <h3>Sponsored</h3>

          <img
            src="https://picsum.photos/250/150"
            alt=""
            className="sponsored"
          />

          <p>Travel and enjoy your dream vacation.</p>
        </div>

        <div className="card">
          <h3>Friend List</h3>

          <p>👤 Alex</p>
          <p>👤 Emma</p>
          <p>👤 John</p>
          <p>👤 Sophia</p>
        </div>

      </div>

    </div>
  );
}