import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { News } from "../../../app/models/news";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function NewsForm() {
  const { newsStore } = useStore();
  const {
    selectedNews,
    createNews,
    updateNews,
    loading,
    loadNewsItem,
    loadingInitial,
  } = newsStore;

  const navigate = useNavigate();

  const { id } = useParams();

  const [news, setNews] = useState<News>({
    id: "",
    title: "",
    categoryName: "",
    description: "",
    content: "",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (id) loadNewsItem(id).then((news) => setNews(news!));
  }, [id, loadNewsItem]);

  function handleSubmit() {
    if (!news.id) {
      news.id = uuid();
      createNews(news).then(() => navigate(`/news/${news.id}`))
    }else{
      updateNews(news).then(() => navigate(`/news/${news.id}`))
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={news.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={news.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={news.categoryName}
          name="categoryName"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Content"
          value={news.content}
          name="content"
          onChange={handleInputChange}
        />
        {/* <Form.Input
          type="date"
          placeholder="Date"
          value={news.date}
          name="date"
          onChange={handleInputChange}
        /> */}
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button as={Link} to={"/"} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
