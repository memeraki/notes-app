import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';

import NotesList from './Components/NotesList';
import NotePage from './Components/NotePage';
import { INote } from "./Interfaces";

function App() {

  const [notesList, setNotesList] = useState<INote[]>([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/notes-app" element={<NotesList notesList={notesList} setNotesList={setNotesList} />} />
          <Route path="/notes-app/notes/:id" element={<NotePage notesList={notesList} setNotesList={setNotesList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
