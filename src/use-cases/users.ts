import { createUser, getUser } from "@/data-access/users";

export async function getUserUseCase({ email }: { email: string }) {
  const user = await getUser(email);

  return user[0];
}

export async function createUserUseCase({
  id,
  email,
  username,
  password_hash,
}: {
  id: string;
  email: string;
  username: string;
  password_hash: string;
}) {
  await createUser({
    id,
    email,
    username,
    password_hash,
  });
}
