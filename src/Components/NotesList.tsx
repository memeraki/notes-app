import { useState, useEffect, ChangeEvent } from "react";
import { INote } from "../Interfaces";

import Note from './Note';

interface Props {
  notesList: INote[];
  setNotesList(notes: INote[]): void;
}

const NotesList = ({ notesList, setNotesList }: Props) => {

  const [note, setNote] = useState<string>("");

  useEffect(() => {
    sortNotesList(notesList);
  }, [notesList]);

  const sortNotesList = (list: INote[]): void => {
    list.sort((a, b) => b.date.getTime() - a.date.getTime());
  } 

  const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(event.target.value);
  }
  
  const addNote = (): void => {
    if(note !== "") {
      setNotesList([...notesList, { content: note, date: new Date() }]);
      setNote("");
    }
  };

  const deleteNote = (noteToDelete: Date): void => {
    setNotesList(notesList.filter((note) => {
      return note.date !== noteToDelete;
    }))
  };

  return (
    <div className="content">
      <div className="add-form">
        <textarea
          value={note}
          onChange={handleTextInput}
        ></textarea>
        <button onClick={addNote}>Add note</button>
      </div>
      <div className="notes-list">
      {notesList.map((note: INote, key: number) => {
        return <Note 
        key={key} 
        note={note} 
        deleteNote={deleteNote} 
        /> 
        })}
      </div>
    </div>
  );
};

export default NotesList;
