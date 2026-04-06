const DEFAULT_BACKEND_URL = "http://localhost:4001";

export function getBackendBaseUrl() {
  return (process.env.BACKEND_INTERNAL_URL ?? DEFAULT_BACKEND_URL).replace(/\/$/, "");
}

export async function backendFetch(path: string, init?: RequestInit) {
  return fetch(`${getBackendBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export async function backendJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await backendFetch(path, init);

  if (!response.ok) {
    let message = `Backend request failed (${response.status})`;

    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) {
        message = data.error;
      }
    } catch {
      const text = await response.text();
      if (text.trim()) {
        message = text;
      }
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}
