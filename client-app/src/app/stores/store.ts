import { createContext, useContext } from "react";
import NewsStore from "./newsStore";
import CommonStore from "./commonStore";
import CategoryStore from "./categoryStore";

interface Store{
    newsStore: NewsStore;
    categoryStore: CategoryStore;
    commonStore: CommonStore;
}

export const store: Store = {
    newsStore: new NewsStore(),
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}