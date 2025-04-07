export async function fetchCityFromCoordinates(
  lat: number,
  lon: number,
): Promise<string> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_MAPS_BASE_URL;
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data?.address?.municipality || 'Brasília';
  } catch {
    return 'Brasília';
  }
}
