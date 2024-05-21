import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { News } from "../../../app/models/news";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";

export default observer(function NewsForm() {
  const { newsStore, categoryStore } = useStore();
  const { createNews, updateNews, loading, loadNewsItem, loadingInitial } =
    newsStore;
  const {
    loadCategories,
    categoriesRegistry,
    loadingInitial: loadCatInit,
    selectedCategory,
  } = categoryStore;

  const validationSchema = Yup.object({
    title: Yup.string().required("The news title is required"),
    description: Yup.string().required("The news description is required"),
    categoryName: Yup.string().required("The news category is required"),
    content: Yup.string().required("The news content is required"),
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const [news, setNews] = useState({
    id: "",
    title: "",
    categoryName: "",
    description: "",
    content: "",
    date: new Date(),
  });

  useEffect(() => {
    if (id) loadNewsItem(id).then((news) => setNews(news!));
  }, [id, loadNewsItem]);

  useEffect(() => {
    if (categoriesRegistry.size == 0) loadCategories();
  }, [loadCategories, categoriesRegistry.size]);

  function handleFormSubmit(news: News) {
    if (!news.id) {
      news.id = uuid();
      createNews(news, selectedCategory!.id).then(() => navigate(`/news/${news.id}`));
    } else {
      updateNews(news, selectedCategory!.id).then(() => navigate(`/news/${news.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent />;

  if (loadCatInit) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="News Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={news}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MySelectInput placeholder="Category" name="categoryName" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MyTextArea rows={6} placeholder="Content" name="content" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={"/"}
              floated="right"
              type="button"
              content="Cancel"
              onClick={() => console.log(isValid, isSubmitting, dirty)}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
