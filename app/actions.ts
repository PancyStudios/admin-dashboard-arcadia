'use server';

import { deleteUserById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';

export async function deleteUser(userId: number) {
  // Uncomment this to enable deletion
   await deleteUserById(userId);
   revalidatePath('/');
}

export async function deletePlayer(playerId: number) {
  const session = await auth()
  if(!session) return;
  const {user} = session!
  console.log(user?.email)
  // Uncomment this to enable deletion
  // await deleteUserById(userId);
  // revalidatePath('/');
}




export async function updateDatabase() {
  
}
