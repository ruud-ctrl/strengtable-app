export function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString('nl-NL', {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: 'Europe/Amsterdam',
      hour12: true,
    });
  } catch {
    return iso;
  }
}