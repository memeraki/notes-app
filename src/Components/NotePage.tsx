import { INote } from "../Interfaces";
import MarkdownIt from 'markdown-it';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


interface Props {
  notesList: INote[];
  setNotesList(notes: INote[]): void;
}

const NotePage = ({ notesList, setNotesList }: Props) => {

  const [renderedNote, setRenderedNote] = useState<string>("");
  const [note, setNote] = useState<INote>({ content: '', date: new Date()});

  let { id } = useParams();
  
  useEffect(() => {
    let index = notesList.findIndex(e => e.date.getTime() === Number(id));
    setNote(notesList[index]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let md = new MarkdownIt();
    setRenderedNote(md.render(note.content));
  }, [note]);

  const deleteNote = (noteToDelete: Date): void => {
    setNotesList(notesList.filter((note) => {
      return note.date !== noteToDelete;
    }))
  };

  return (
    <div className="note-page">
      <Link to="/">back</Link>
      <Link to="/">
      <button onClick={() => { deleteNote(note.date); }}>delete</button>
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: renderedNote }}
        className="rendered-note"
      ></div>
      <div>{note.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</div>
    </div>
  );
};

export default NotePage;
