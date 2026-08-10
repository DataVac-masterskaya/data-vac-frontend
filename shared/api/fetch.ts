export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  console.log(`[API →] ${url}`);
  const res = await fetch(url, options);

  let body: unknown;
  const text = await res.text();
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }

  if (!res.ok) {
    console.error(`[API ✗] ${res.status} ${url}`, body);
    throw new Error(`Не удалось получить данные (${res.status})`);
  }

  console.log(`[API ✓] ${res.status} ${url}`, JSON.stringify(body).slice(0, 300));
  return body as T;
}
