import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onUpdateNoteClicked: (note: NoteModel) => void;
}

const Note = ({
  note,
  onDeleteNoteClicked,
  onUpdateNoteClicked,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  // Format CREATED & UPDATED showed status
  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <div
      className="flex flex-col justify-between w-[300px] h-[280px] rounded-md hover:shadow-lg pt-6 bg-amber-200/75 hover:bg-amber-200 cursor-pointer bg-gradient-to-b"
      onClick={() => onUpdateNoteClicked(note)}
    >
      <div>
        <h2 className="text-xl mb-3 font-bold px-6">{title}</h2>

        <p className="text-base font-normal whitespace-pre-line px-6">
          {text?.substring(0, 100)}...
        </p>
      </div>

      <div>
        <div className="my-4 px-6 flex items-center gap-4 text-xs">
          <button
            className="px-3 py-1 bg-red-600 rounded-md text-white hover:bg-red-600/70"
            type="button"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          >
            Delete
          </button>
        </div>

        <p className="text-sm text-slate-500 font-light border-t-[1px] border-t-slate-500/20 py-2 mt-4 px-6 bg-slate-400/10">
          {createdUpdatedText}
        </p>
      </div>
    </div>
  );
};

export default Note;
