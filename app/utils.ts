export const formatEventDate = (
  timestamp: number,
): { timeStr: string; dateStr: string } => {
  const date = new Date(timestamp);
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = date.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return { timeStr, dateStr };
};
