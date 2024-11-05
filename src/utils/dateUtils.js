import dayjs from "dayjs";

export function filterByView(entries, view, selectedDate) {
  return entries.filter(entry => {
    const entryDate = dayjs(entry.date);
    if (view === "daily" && selectedDate) {
      return entryDate.isSame(dayjs(selectedDate), "day");
    } else if (view === "weekly" && selectedDate) {
      return entryDate.isSame(dayjs(selectedDate), "week");
    } else if (view === "monthly" && selectedDate) {
      return entryDate.isSame(dayjs(selectedDate), "month");
    }
    return true;
  });
}

export function calculateHours(entries) {
  return entries.reduce((total, entry) => {
    const start = dayjs(`${entry.date} ${entry.startTime}`);
    const end = dayjs(`${entry.date} ${entry.endTime}`);
    return total + end.diff(start, "minute"); // percekben tér vissza
  }, 0);
}

export function summarizeTags(entries) {
  const tagSummary = {};

  entries.forEach(entry => {
    const start = dayjs(`${entry.date} ${entry.startTime}`);
    const end = dayjs(`${entry.date} ${entry.endTime}`);
    const duration = end.diff(start, "minute"); // időtartam percekben

    entry.tags.forEach(tag => {
      if (!tagSummary[tag]) {
        tagSummary[tag] = { count: 0, duration: 0 };
      }
      tagSummary[tag].count += 1;
      tagSummary[tag].duration += duration;
    });
  });

  // Perceket órává alakítunk (kerekítve két tizedesjegyre)
  for (const tag in tagSummary) {
    tagSummary[tag].duration = (tagSummary[tag].duration / 60).toFixed(2);
  }

  return tagSummary;
}
