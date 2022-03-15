import { INote } from "../Interfaces";
import MarkdownIt from 'markdown-it';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface Props {
  note: INote;
  deleteNote(note: Date): void;
}

const Note = ({ note, deleteNote }: Props) => {

  const [renderedNote, setRenderedNote] = useState<string>("");

  useEffect(() => {
    let md = new MarkdownIt();
    setRenderedNote(md.render(note.content));
  }, [note.content]);

  return (
    <div className="note">
      <button
        onClick={() => {
          deleteNote(note.date);
        }}
      >
        X
      </button>
      <div className="note">
        <div
          dangerouslySetInnerHTML={{ __html: renderedNote }}
          className="rendered-note"
        ></div>
        
        <Link to={`/notes/${note.date.getTime()}`}>{note.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</Link>

      </div>
    </div>
  );
};

export default Note;
