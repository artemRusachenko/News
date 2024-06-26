import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../rooter/Routes";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get isAdmin(){
    return this.user?.roles.includes("Admin") ?? false;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate('/')
    store.modalStore.closeModal();
  };

  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate('/')
    store.modalStore.closeModal();
  }; 

  logout = () =>{
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate('/')
  }

  getUser = async () =>{
    try{
      const user = await agent.Account.current();
      runInAction(() => this.user = user);
    }
    catch(error){
      console.log(error)
    }
  }
}