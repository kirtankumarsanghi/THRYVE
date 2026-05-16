import AppRoutes from "./routes/AppRoutes";
import { GoalProvider } from "./context/GoalContext";
import { ManagerProvider } from "./context/ManagerContext";
import { AdminProvider } from "./context/AdminContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AdminProvider>
      <ManagerProvider>
        <GoalProvider>
          <AppRoutes />
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#1a1b26',
                color: '#fff',
                border: '1px solid #2e303e',
              },
            }} 
          />
        </GoalProvider>
      </ManagerProvider>
    </AdminProvider>
  );
}

export default App;