import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./pages/Login";
import Home from "./pages/Home";

// https://github.com/dom-the-dev/spotify-with-react/blob/main/src/App.js
// https://github.com/thelinmichael/spotify-web-api-node
// https://javascript.plainenglish.io/how-to-include-spotify-authorization-in-your-react-app-577b63138fd7

function App() {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find((elem) =>
        elem.startsWith("access_token")
      )!.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token!);
  }, []);
  function login() {
    window.location.href =
      `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&scope=user-top-read`;
  }

  function logout() {
    setToken("");
    window.localStorage.removeItem("token");
  }
  

  return (
    <div>
      {token
        ? <Home token={token} logoutHandler={logout} />
        : <Login loginHandler={login} />}
    </div>
  );
}

export default App;
