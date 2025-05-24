// Helper function to format date string
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  } catch (e) {
    console.error('Failed to format date:', dateString, e);
    const parts = dateString.split('T')[0].split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  }
};
