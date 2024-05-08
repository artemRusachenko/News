import { Button, Form, Segment } from "semantic-ui-react";
import { News } from "../../../app/models/news";
import { ChangeEvent, useState } from "react";

interface Props {
  news: News | undefined;
  closeForm: () => void;
  createOrEdit: (news: News) => void;
}
export default function NewsForm({ news: selectedActivity, closeForm, createOrEdit}: Props) {
  //   export default function NewsForm({
  //     news: selectednews,
  //     closeForm,
  //     createOrEdit
  //   }: Props) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    categoryName: "",
    description: "",
    content: "",
    date: "",
  };

  const [news, setNews] = useState(initialState);

  function handleSubmit() {
    createOrEdit(news);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  }
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
        <Form.Input
          placeholder="Date"
          value={news.date}
          name="date"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
