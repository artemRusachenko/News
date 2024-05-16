import { createContext, useContext } from "react";
import NewsStore from "./newsStore";
import CommonStore from "./commonStore";

interface Store{
    newsStore: NewsStore;
    commonStore: CommonStore;
}

export const store: Store = {
    newsStore: new NewsStore(),
    commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}