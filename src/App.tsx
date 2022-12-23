import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

// https://github.com/dom-the-dev/spotify-with-react/blob/main/src/App.js
// https://github.com/thelinmichael/spotify-web-api-node
// https://javascript.plainenglish.io/how-to-include-spotify-authorization-in-your-react-app-577b63138fd7

function App() {
  const [token, setToken] = useState<string>();
  // Getting login status from the url
  useEffect(() => {
    const hash = location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find((elem) =>
        elem.startsWith("access_token")
      )!.split("=")[1];
      location.hash = "";
      localStorage.setItem("token", token);
    }
    setToken(token!);
  }, []);

  function login() {
    location.href = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=token&scope=user-top-read`;
  }

  function logout() {
    setToken("");
    localStorage.clear();
  }

  return (
    <div>
      {token ? <Home token={token} logoutHandler={logout} /> : <Login loginHandler={login} />}
    </div>
  );
}

export default App;
