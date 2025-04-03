

import React from "react";
import ChatBox from "./component/ChatBox";
import './index.css'

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ChatBox />
    </div>
  );
};

export default App;
