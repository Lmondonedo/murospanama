function getRandomSample<T>(array: T[], size: number): T[] {
  // Implementación del algoritmo Fisher-Yates para mezclar y obtener una muestra
  const shuffled = [...array];
  // ... [código de mezcla] ...
  return shuffled.slice(0, size);
}
