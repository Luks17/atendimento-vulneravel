import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "./ui/dashboard/ThemeDropdown";

export default function Home() {
  return (
    <div className="form-control flex-1 h-full items-center justify-center p-2">
      <form className="bg-base-300 w-full max-w-md p-10 flex flex-col gap-y-2 rounded-box">
        <div className="w-full flex justify-between py-5">
          <div className="text-base-content w-full">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm opacity-70">Não tem uma conta? Registre-se</p>
          </div>
          <ThemeDropdown />
        </div>
        <label className="input input-bordered flex items-center gap-x-2">
          <EnvelopeIcon className="w-6 h-6 opacity-70" />
          <input
            className="bg-base-100 w-full"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-x-2">
          <KeyIcon className="w-6 h-6 opacity-70" />
          <input
            className="bg-base-100 w-full"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <button
          className="btn btn-primary w-fit self-center mt-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
