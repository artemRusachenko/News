import { Grid } from "semantic-ui-react";
import NewsList from "./NewsList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function NewsDashboard() {
  const { newsStore } = useStore();
  const {loadNews, newsRegistry} = newsStore

  useEffect(() => {
    if(newsRegistry.size <=1) loadNews();
  }, [loadNews, newsRegistry.size]);
  
  if (newsStore.loadingInitial) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <NewsList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
