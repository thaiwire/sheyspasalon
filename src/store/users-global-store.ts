
import { IUser } from '@/interfaces';
import {create} from 'zustand';

const usersGlobalStore = create((set) => ({
   user :null,
   setUser : (user) => set(() => ({user})),
}));

export default usersGlobalStore;

export interface IUserGlobalStore {
    user : IUser | null;
    setUser : (user: IUser) => void;

}