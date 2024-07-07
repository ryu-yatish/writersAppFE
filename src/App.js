import React from "react";
import AppRouter from './components/RouterComponent/AppRouter';
import { DarkModeProvider } from "./components/DarkModeContext";
function App() {
  return (
    <div>
      <DarkModeProvider>
      <AppRouter />
      </DarkModeProvider>
    </div>
  );
}

export default App;
