import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike, SelectedFieldsOrdered } from 'drizzle-orm';

export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);



const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  username: varchar('username', { length: 50 }),
  email: varchar('email', { length: 50 })
});

const players = pgTable('players', {
  id: serial("id").primaryKey(),
  gamertag: varchar('gamertag', {length: 75 })
})

export type SelectUser = typeof users.$inferSelect;
export type SelectPlayer = typeof players.$inferSelect

export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: SelectUser[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      users: await db
        .select()
        .from(users)
        .where(ilike(users.name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const moreUsers = await db.select().from(users).limit(20).offset(offset);
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { users: moreUsers, newOffset };
}
export async function getPlayers(
  search: string,
  offset: number
): Promise<{
  users: SelectPlayer[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      users: await db
        .select()
        .from(players)
        .where(ilike(users.name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null };
  }

  const morePlayers = await db.select().from(players).limit(20).offset(offset);
  const newOffset = morePlayers.length >= 20 ? offset + 20 : null;
  return { users: morePlayers, newOffset };
}

export async function deleteUserById(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
export async function deletePlayerById(id: number) {
  await db.delete(players).where(eq(users.id, id));
}
