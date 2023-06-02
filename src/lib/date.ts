export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
  