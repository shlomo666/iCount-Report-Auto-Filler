function startOfMonth() {
  const date = new Date();
  date.setDate(1);
  return date.toISOString().split('T')[0];
}
exports.startOfMonth = startOfMonth;
function atPrevMonth(day) {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(day);
  return date.toISOString().split('T')[0];
}
exports.atPrevMonth = atPrevMonth;
function getAllDays(startDayOfMonth) {
  const date = new Date();
  date.setDate(startDayOfMonth);
  date.setMonth(date.getMonth() - 1);
  const offDays = new Set([5, 6]);
  const days = [];
  do {
    if (!offDays.has(date.getDay())) {
      days.push(date.toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() + 1);
  } while (date.getDate() !== startDayOfMonth);
  return days;
}
exports.getAllDays = getAllDays;

function reverseDate(date) {
  return date.split('-').reverse().join('-');
}
exports.reverseDate = reverseDate;
