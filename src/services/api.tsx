export default async function apiFetch(
  url: string,
  options?: RequestInit
) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
