const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })

/**
 * Formats a date string using the 'en-GB' locale and a 'long' date style,
 * adding an ordinal suffix to the day (e.g., '1st', '2nd', '3rd', '4th', etc.).
 *
 * @param {string} dateStr - The date string to be formatted. This should be a valid input for the JavaScript Date constructor.
 * @returns {string} - The formatted date string with the appropriate ordinal suffix added to the day.
 *
 * @example
 * formatDate('2021-08-12') // Returns '12th August 2021'
 */
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
