import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // nên dùng react-router-dom
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./hooks/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
