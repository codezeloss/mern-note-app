import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInput from "./form/TextInput";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>();

  // ** react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  // ** SUBMIT form
  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }

  return (
    <div className="absolute z-20 top-0 w-full h-full bg-slate-700/40 p-10">
      <div className=" bg-white rounded-md shadow-md w-[500px] mx-auto p-6">
        <div className="flex justify-between items-center mb-8 pb-2 border-b-[1px]">
          <h1 className="text-lg font-bold">Login</h1>

          <button type="button" onClick={onDismiss}>
            X
          </button>
        </div>

        {errorText && (
          <h1 className="text-lg text-red-600 bg-red-300 p-5">{errorText}</h1>
        )}
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
