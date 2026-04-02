export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with ${response.status}: ${raw.slice(0, 180)}`);
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Request to ${url} returned non-JSON content.`);
  }
}
