/**
 * Open-now badge + today highlight. Runs client-side in Europe/London time
 * so it is right whatever the visitor's own time zone. Without JS the
 * badge keeps its server-rendered summary and the table shows all days.
 */
import { hours, formatTime } from '../content/site';

const SHORTS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function londonNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return {
    jsDay: SHORTS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const byJsDay = (d: number) => hours.find((h) => h.jsDay === d)!;

export function openStatus(now = londonNow()) {
  const today = byJsDay(now.jsDay);
  if (today.hours) {
    const open = toMinutes(today.hours.open);
    const close = toMinutes(today.hours.close);
    if (now.minutes >= open && now.minutes < close) {
      return { open: true, text: `Open now · until ${formatTime(today.hours.close)}` };
    }
    if (now.minutes < open) {
      return { open: false, text: `Closed · opens today ${formatTime(today.hours.open)}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const day = byJsDay((now.jsDay + i) % 7);
    if (day.hours) {
      const when = i === 1 ? 'tomorrow' : day.short;
      return { open: false, text: `Closed · opens ${when} ${formatTime(day.hours.open)}` };
    }
  }
  return { open: false, text: 'Closed' };
}

export function initHours() {
  const now = londonNow();
  const status = openStatus(now);

  document.querySelectorAll<HTMLElement>('[data-open-now]').forEach((el) => {
    const text = el.querySelector('[data-open-text]');
    if (text) text.textContent = status.text;
    el.dataset.state = status.open ? 'open' : 'closed';
  });

  document.querySelectorAll<HTMLElement>('[data-hours-row]').forEach((row) => {
    if (Number(row.dataset.jsDay) === now.jsDay) {
      row.dataset.today = 'true';
      row.querySelector('[data-today-label]')?.removeAttribute('hidden');
    }
  });
}
