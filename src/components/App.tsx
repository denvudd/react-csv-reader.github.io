import React from "react";
import CSVReader from "./CSVReader";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-semibold text-center mt-10">
        React CSV Reader
      </h1>
      <CSVReader />
    </div>
  );
};

export default App;
