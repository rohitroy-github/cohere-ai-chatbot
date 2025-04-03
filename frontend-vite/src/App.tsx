import React from "react";
import ChatBox from "./component/ChatBox";
import './index.css'
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen font-montserrat">
      <ChatBox />
    </div>
  );
};

export default App;
