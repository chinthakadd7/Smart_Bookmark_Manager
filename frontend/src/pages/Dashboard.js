import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  if (!user) {
    return <h2>Access denied. Please login.</h2>;
  }

  // Add new bookmark
  const handleAddBookmark = (e) => {
    e.preventDefault();
    const newBookmark = {
      id: Date.now(), // unique id
      title,
      url,
      notes,
    };
    setBookmarks([...bookmarks, newBookmark]);
    setTitle("");
    setUrl("");
    setNotes("");
  };

  // Delete a bookmark
  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter((bm) => bm.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard">
      <h2>Welcome to your Dashboard!</h2>

    </div>
   

      <form onSubmit={handleAddBookmark}>
        <h3>Add a New Bookmark</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Add Bookmark</button>
      </form>

      <h3>Your Bookmarks</h3>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="bookmark-list">
          {bookmarks.map((bm) => (
            <div key={bm.id} className="bookmark-card">
              <h4>{bm.title}</h4>
              <a href={bm.url} target="_blank" rel="noreferrer">
                {bm.url}
              </a>
              {bm.notes && <p>{bm.notes}</p>}
              <button className="delete-btn" onClick={() => handleDelete(bm.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
