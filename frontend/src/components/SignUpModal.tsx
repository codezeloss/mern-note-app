import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInput from "./form/TextInput";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  // ** react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  // ** SUBMIT form
  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute z-20 top-0 w-full h-full bg-slate-700/40 p-10">
      <div className=" bg-white rounded-md shadow-md w-[500px] mx-auto p-6">
        <div className="flex justify-between items-center mb-8 pb-2 border-b-[1px]">
          <h1 className="text-lg font-bold">Sign Up</h1>

          <button type="button" onClick={onDismiss}>
            X
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="username"
            label="Username"
            type="text"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInput
            name="email"
            label="Email"
            type="email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />

          <TextInput
            name="password"
            label="Password"
            type="password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <button
            className="bg-sky-600 text-white px-6 py-2 rounded-md text-sm mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
