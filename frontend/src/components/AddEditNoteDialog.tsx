import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  // ** React Hook Form
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  // ** SUBMIT form
  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      
      // !!
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
    }
  }

  const inputStyles = `px-4 py-2 w-full border-[1px] rounded-md outline-none`;

  return (
    <div className="absolute z-20 top-0 w-full h-full bg-slate-700/40 p-10">
      <div className=" bg-white rounded-md shadow-md w-[500px] mx-auto p-6">
        <div className="flex justify-between items-center mb-8 pb-2 border-b-[1px]">
          <h1 className="text-lg font-bold">
            {noteToEdit ? "Edit" : "Add"} Note
          </h1>

          <button type="button" onClick={onDismiss}>
            X
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          id="addEditNoteForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              className={`${inputStyles} ${
                errors.title?.message
                  ? "border-red-600 placeholder:text-red-600"
                  : "border-slate-500/20"
              }`}
              type="text"
              placeholder="Title"
              {...register("title", { required: "Required" })}
            />
            {errors && (
              <p className="text-sm text-red-600">{errors.title?.message}</p>
            )}
          </div>
          <div>
            <textarea
              className={inputStyles}
              rows={10}
              placeholder="Text"
              {...register("text")}
            />
            {errors && (
              <p className="text-sm text-red-600">{errors.text?.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div />
            <button
              form="addEditNoteForm"
              className="bg-amber-700 text-white px-6 py-2 rounded-md text-sm mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditNoteDialog;
