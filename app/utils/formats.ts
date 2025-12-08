/**
 * Convierte un string de tiempo en formato "HH:MM:SS.mmm" a formato de 12 horas con AM/PM
 * @param time - Tiempo en formato "08:00:00.000" o "17:00:00.000"
 * @returns Tiempo formateado como "08:00 AM" o "05:00 PM"
 * @example
 * formatTime("08:00:00.000") // "08:00 AM"
 * formatTime("17:00:00.000") // "05:00 PM"
 * formatTime("12:00:00.000") // "12:00 PM"
 * formatTime("00:00:00.000") // "12:00 AM"
 */
export function formatTime(time: string): string {
  // Extraer las horas y minutos del string
  const [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr;

  // Determinar AM o PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convertir a formato de 12 horas
  if (hours === 0) {
    hours = 12; // Medianoche se muestra como 12 AM
  } else if (hours > 12) {
    hours = hours - 12; // Convertir horas de la tarde
  }

  // Formatear con ceros a la izquierda si es necesario
  const formattedHours = hours.toString().padStart(2, '0');

  return `${formattedHours}:${minutes} ${period}`;
}

/**
 * Formatea un rango de tiempo
 * @param openTime - Hora de apertura en formato "HH:MM:SS.mmm"
 * @param closeTime - Hora de cierre en formato "HH:MM:SS.mmm"
 * @returns Rango formateado como "08:00 AM - 05:00 PM"
 * @example
 * formatTimeRange("08:00:00.000", "17:00:00.000") // "08:00 AM - 05:00 PM"
 */
export function formatTimeRange(openTime: string, closeTime: string): string {
  return `${formatTime(openTime)} - ${formatTime(closeTime)}`;
}

/**
 * Verifica si la hora actual está dentro del rango de horario de operación
 * @param openTime - Hora de apertura en formato "HH:MM:SS.mmm"
 * @param closeTime - Hora de cierre en formato "HH:MM:SS.mmm"
 * @returns true si la hora actual está dentro del rango, false si está cerrado
 * @example
 * isCurrentlyOpen("08:00:00.000", "17:00:00.000") // true si son las 10:00 AM
 * isCurrentlyOpen("08:00:00.000", "17:00:00.000") // false si son las 6:00 PM
 */
export function isCurrentlyOpen(openTime: string, closeTime: string): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Extraer horas y minutos de apertura
  const [openHours, openMinutes] = openTime.split(':').map(Number);
  const openTotalMinutes = openHours * 60 + openMinutes;

  // Extraer horas y minutos de cierre
  const [closeHours, closeMinutes] = closeTime.split(':').map(Number);
  const closeTotalMinutes = closeHours * 60 + closeMinutes;

  // Verificar si la hora actual está dentro del rango
  return currentMinutes >= openTotalMinutes && currentMinutes < closeTotalMinutes;
}
