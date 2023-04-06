const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })

export function formatDate(dateStr: string): string {
  const formattedDate = dateFormatter.format(new Date(dateStr))
  const [day, ...rest] = formattedDate.split(' ')
  const lastNum = day[day.length - 1]
  const suffix =
    lastNum === '1'
      ? 'st'
      : lastNum === '2'
      ? 'nd'
      : lastNum === '3'
      ? 'rd'
      : 'th'
  return [`${day}${suffix}`, ...rest].join(' ')
}
