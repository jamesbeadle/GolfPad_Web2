import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';

export const currentUser = writable<User | null>(null);

auth.onAuthStateChanged((user) => {
  currentUser.set(user);
});
