import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <div className="flex flex-col justify-between w-[300px] h-[250px] rounded-md hover:shadow-lg pt-6 pb-3 bg-amber-200/75 hover:bg-amber-200 cursor-pointer bg-gradient-to-b">
      <div>
        <h2 className="text-xl mb-3 font-bold px-6">{title}</h2>

        <p className="text-base font-normal whitespace-pre-line px-6">
          {text?.substring(0, 150)}...
        </p>
      </div>

      <p className="text-sm font-light border-t-[1px] border-t-black/40 pt-2 mt-4 px-6">
        {createdUpdatedText}
      </p>
    </div>
  );
};

export default Note;
