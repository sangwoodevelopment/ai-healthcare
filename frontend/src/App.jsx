import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";

function App() {
  return (
      <>
        <AppRouter />
          <Toaster
              position="center"
              toastOptions={{
                  duration: 2500,
                  style: {
                      borderRadius: "12px",
                      background: "#1e293b",
                      color: "#fff",
                  },
                  success: {
                      icon: "✅",
                  },
                  error: {
                      icon: "❌",
                  },
              }}
          />
      </>
  );
}

export default App;