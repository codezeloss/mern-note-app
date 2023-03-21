export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    minute: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
