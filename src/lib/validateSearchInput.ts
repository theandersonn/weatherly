export function validateSearchInput(
  search: string,
  showToast: () => void,
): string | null {
  if (!search.trim()) {
    showToast();
    return null;
  }
  return search.trim();
}
