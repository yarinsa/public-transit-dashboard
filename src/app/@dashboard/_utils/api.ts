export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(new URL(`/api/${endpoint}`, process.env.NEXT_PUBLIC_API_URL), {
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
} 