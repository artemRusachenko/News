import NewsList from "./NewsList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function NewsDashboard() {
  const { newsStore } = useStore();
  const { loadNews, newsRegistry } = newsStore;

  useEffect(() => {
    if (newsRegistry.size <= 1) loadNews();
  }, [loadNews, newsRegistry.size]);

  if (newsStore.loadingInitial) return <LoadingComponent />;

  return <NewsList />;
});
