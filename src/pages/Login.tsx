export default function Login({ loginHandler }: { loginHandler: () => void }) {
  return (
    <div className="fixed self-center">
      <button onClick={loginHandler}>login</button>
    </div>
  );
}
