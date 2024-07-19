'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectPlayer } from '@/lib/db';
import { deletePlayer } from './actions';
import { useRouter } from 'next/navigation';

export function UsersTable({
  users,
  offset
}: {
  users: SelectPlayer[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Gamertag</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function UserRow({ user }: { user: SelectPlayer }) {
  const userId = user.id;
  const deletePlayerWithId = deletePlayer.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{user.gamertag}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="destructive"
          formAction={deletePlayerWithId}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
