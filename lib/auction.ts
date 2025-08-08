export interface AuctionScheduleItem {
  monthIndex: number; // 1-based
  scheduledDate: string; // ISO date string (first day of month)
}

export function generateAuctionSchedule(startDate: string, months: number): AuctionScheduleItem[] {
  const schedule: AuctionScheduleItem[] = [];
  const start = new Date(startDate);
  for (let i = 0; i < months; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    d.setDate(1);
    schedule.push({ monthIndex: i + 1, scheduledDate: d.toISOString() });
  }
  return schedule;
}
