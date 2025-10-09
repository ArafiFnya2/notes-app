import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const baseUrl = "https://notes-app-api-ten-eta.vercel.app";


  const fetchNotes = async () => {
    try {
      const res = await fetch(`${baseUrl}/notes`);

      const result = await res.json();
      console.log(result)

      setNotes(result.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newTitle, newContent) => {
  try {
    const res = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });

    const result = await res.json();
    console.log(result.data);

    // Tambahkan ini 👇
    setNotes((prev) => [...prev, result.data]);
  } catch (error) {
    console.error(error);
  }
};


  const handleUpdateNote = async (id, updateTitle, updateContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateTitle, content: updateContent }),
      });

      const result = await res.json();

      setNotes((prevNotes) => {
        return prevNotes.map((note) => note.id === id ? result.data : note)
    })

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`,{
        method: "DELETE",
      });

      if(res.ok){
        setNotes((notes) => notes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error(error)
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col mt-24 items-center">
        <NoteForm onAddNote={addNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdateNote}
          onGetById={getNoteById}
        />
      </main>
    </>
  );
}

export default App;

// ================== Komponen ==================

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 flex justify-center bg-white shadow">
      <div className="flex justify-between px-5 py-5 container">
        <img src="/logo.svg" alt="Logo" />
      </div>
    </nav>
  );
};

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <section className="container max-w-xl px-5 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm shadow-lg p-6 rounded-2xl border border-gray-100">
        <input
          type="text"
          placeholder="Title"
          className="rounded-sm outline outline-gray-400 p-3"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="resize-y min-h-14 rounded-sm outline outline-gray-400 p-3"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold rounded-lg py-3"
        >
          Add note
        </button>
      </form>
    </section>
  );
};

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(note.title);
  const [contentEdit, setContentEdit] = useState(note.content);

  const handleCancel = () => {
    setTitleEdit(note.title);
    setContentEdit(note.content);
    setIsEditing(false);
  };

  return (
 <div
  className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-md w-[300px] p-5 
             transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl border border-gray-200"
>
  {isEditing ? (
    <>
      <input
        value={titleEdit}
        type="text"
        className="w-full rounded-lg border border-gray-300 p-2 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTitleEdit(e.target.value)}
      />

      <textarea
        value={contentEdit}
        className="w-full rounded-lg border border-gray-300 p-2 mt-3 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows="4"
        onChange={(e) => setContentEdit(e.target.value)}
      />

      <div className="mt-4 flex gap-2 justify-end">
        <button
          className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium 
                     hover:bg-gray-200 transition-all"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1.5 rounded-lg bg-green-500 text-white font-medium 
                     hover:bg-green-600 transition-all"
          onClick={() => {
            onUpdate(note.id, titleEdit, contentEdit);
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
        <p className="text-sm text-gray-400">~ {showFormattedDate(note.created_at)}</p>
      </div>

      <p className="mt-3 text-gray-700 leading-relaxed">{note.content}</p>

      <div className="mt-5 flex gap-2 justify-end">
        <button
          className="px-3 py-1 rounded-lg bg-yellow-400 text-white font-medium 
                     hover:bg-yellow-500 transition-all"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 rounded-lg bg-red-500 text-white font-medium 
                     hover:bg-red-600 transition-all"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </>
  )}
</div>
  );
};

const NoteList = ({ notes, onUpdate, onDelete }) => {
  return (
    <section className="container py-8">
      <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
        <img src="/note.svg" alt="note icon" className="w-8 h-8" />
        Notes
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete}/>
          ))
        ) : (
          <h1>Data Kosong</h1>
        )}
      </div>
    </section>
  );
};

// helper
const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
