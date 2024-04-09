export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <form className="bg-base-200 p-5 flex flex-col gap-y-2 rounded-box">
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
