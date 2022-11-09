import img from "../assets/img.jpg";

export default function Login({ loginHandler }: { loginHandler: () => void }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center" style={{ backgroundImage: `url(${img})`, backgroundSize: "100% 100%" }}>
      <div className="h-min  bg-transparent  rounded-lg flex flex-col justify-center text-center" >
        <h1 className="text-8xl p-5 m-5 bg-green-500">TapiSpotify</h1>
        <button onClick={loginHandler} className="h-min m-auto text-3xl ">Login</button>
      </div>
    </div>
  );
}
