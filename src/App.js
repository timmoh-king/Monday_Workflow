import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const [settings, setSettings] = useState({});
  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    monday.execute("valueCreatedForUser");

    monday.listen("context", (res) => {
      setContext(res.data);
    });
  
    monday.listen("settings", (res) => {
      setSettings(res.data);
    });
  }, []);

  monday.api(`query ($boardIds: [Int]) {
        boards (ids:$boardIds) {
        name items(limit:1) {
        name column_values { title text } } } }`, 
      { variables: {boardIds: context.boardIds} }
    )
    .then(res => {
      setBoardData(res.data);
    });

  return (
    <div className="App" style={{ backgroundColor: settings.green }}>
      Hey welcome to monday apps!!
      {JSON.stringify(boardData, null, 2)} 
    </div>
  );
};

export default App;