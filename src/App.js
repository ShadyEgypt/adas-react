import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNav from "./navigation/AppNavigation";
import { AuthProvider } from "./context/auth-context";
import Landing from "./pages/landing/Landing";

function App() {
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (isFirstMount) {
      setTimeout(() => {
        setIsFirstMount(false);
      }, 3000);
    }
  }, [isFirstMount]);

  return (
    <AuthProvider>
      <div className="container-app">
        {isFirstMount ? (
          <>
            <Landing />
          </>
        ) : (
          <>
            <BrowserRouter>
              <AppNav />
            </BrowserRouter>
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
