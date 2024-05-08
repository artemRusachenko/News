import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { News } from "../models/news";
import NavBar from "./NavBar";
import NewsDashboard from "../../features/news/dashboard/NewsDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [news, setNews] = useState<News[]>([]);
  const [selectedNews, setSelectNews] = useState<News | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<News[]>("http://localhost:5000/api/news").then((response) => {
      setNews(response.data);
    });
  }, []);

  function hadleSelectNews(id: string) {
    setSelectNews(news.find((x) => x.id === id));
  }

  function handleCancelSelectedNews() {
    setSelectNews(undefined);
  }

  function handleFormOpen(id? : string){
    id ? hadleSelectNews(id) : handleCancelSelectedNews();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false)
  }

  function handlerCreateOrEditNews(newsItem: News){
    newsItem.id 
    ? setNews([...news.filter(x => x.id !== newsItem.id), newsItem])
    : setNews([...news, {...newsItem, id:uuid()}])
    setEditMode(false);
    setSelectNews(newsItem);
  }

  function handleDeleteNews(id:string){
    setNews([...news.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar  openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <NewsDashboard
          news={news}
          selectedNews={selectedNews}
          selectNews={hadleSelectNews}
          cancelSelectNews={handleCancelSelectedNews}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handlerCreateOrEditNews}
          deleteNews={handleDeleteNews}
        />
      </Container>
    </>
  );
}

export default App;
