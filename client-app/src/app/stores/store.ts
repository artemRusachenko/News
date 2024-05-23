import { createContext, useContext } from "react";
import NewsStore from "./newsStore";
import CommonStore from "./commonStore";
import CategoryStore from "./categoryStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store{
    newsStore: NewsStore;
    categoryStore: CategoryStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    newsStore: new NewsStore(),
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}