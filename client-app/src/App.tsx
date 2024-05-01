import {  useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/news").then((response) => {
      setNews(response.data);
    });
  }, []);
  return (
    <div>
      <Header as="h2" icon="news" content="News"/>
      <List>
        {news.map((n: any) => (
          <List.Item key={n.id}>{n.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
