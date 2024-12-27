import { User } from "./types";

export async function getUserList({
  pageParam = 1,
  queryKey,
}: {
  pageParam: number;
  queryKey: [string, { search: string }];
}) {
  try {
    const [, { search }] = queryKey;
    const res = await fetch(
      `https://reqres.in/api/users?page=${pageParam}&per_page=4`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Fail to Fetch User Data");
    }
    const result = await res.json();
    if (search) {
      result.data = result.data.filter((user: User) => {
        const filterLowerCase = search.toLowerCase();
        return (
          user.first_name.toLowerCase().includes(filterLowerCase) ||
          user.last_name.toLowerCase().includes(filterLowerCase) ||
          user.email.toLowerCase().includes(filterLowerCase)
        );
      });
    }
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export const updateUser = async (user: User) => {
  const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return await response.json();
};
