"use client";

import { useMemo } from "react";
import { formatTimeRange, isCurrentlyOpen } from "../utils/formats";

type ScheduleItem = {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
};

type ScheduleException = {
  id: string;
  date: string;
  state: string;
  reason: string;
  open: string;
  close: string;
};

interface ScheduleProps {
  schedule: ScheduleItem[];
  scheduleExceptions: ScheduleException[];
}

export default function Schedule({ schedule, scheduleExceptions }: ScheduleProps) {
  const scheduleInfo = useMemo(() => {
    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // 1. REVISAR EXCEPCIONES PRIMERO
    const exception = scheduleExceptions.find(
      (exc) => exc.date === todayString
    );
    
    if (exception) {
      // Si hay una excepción para hoy, verificar si está abierto Y si está dentro del horario
      const isOpen = exception.state.toLowerCase() === 'abierto';
      const isWithinHours = isOpen && exception.open && exception.close 
        ? isCurrentlyOpen(exception.open, exception.close)
        : false;
      
      return {
        type: 'exception' as const,
        state: exception.state,
        reason: exception.reason,
        open: exception.open,
        close: exception.close,
        isOpen: isOpen,
        isWithinHours: isWithinHours,
      };
    }
    
    // 2. SI NO HAY EXCEPCIÓN, USAR HORARIO REGULAR
    // Obtener el día de la semana (0 = Domingo, 1 = Lunes, etc.)
    const dayOfWeek = today.getDay();
    const dayNames = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const todayDayName = dayNames[dayOfWeek];
    
    // Buscar el horario regular para hoy
    const regularSchedule = schedule.find(
      (s) => s.day.toLowerCase() === todayDayName.toLowerCase()
    );
    
    if (regularSchedule) {
      // Verificar si está abierto Y si está dentro del horario
      const isWithinHours = regularSchedule.isOpen && regularSchedule.open && regularSchedule.close
        ? isCurrentlyOpen(regularSchedule.open, regularSchedule.close)
        : false;
      
      return {
        type: 'regular' as const,
        day: regularSchedule.day,
        open: regularSchedule.open,
        close: regularSchedule.close,
        isOpen: regularSchedule.isOpen,
        isWithinHours: isWithinHours,
      };
    }
    
    // Fallback si no se encuentra nada
    return {
      type: 'unknown' as const,
      isOpen: false,
      isWithinHours: false,
    };
  }, [schedule, scheduleExceptions]);

  // Determinar el color de fondo basado en si está abierto o cerrado
  const bgColor = (scheduleInfo.type === 'exception' || scheduleInfo.type === 'regular') 
    && scheduleInfo.isOpen 
    && scheduleInfo.isWithinHours
    ? 'bg-green-100' // Verde pastel si está abierto
    : 'bg-red-300';   // Rojo pastel si está cerrado

  return (
    <div className={`text-xs text-primary/70 ${bgColor} px-3 py-1 rounded-full font-bold`}>
      {scheduleInfo.type === 'exception' ? (
        // Mostrar excepción
        scheduleInfo.isOpen && scheduleInfo.isWithinHours ? (
          <span>
            {scheduleInfo.reason}: {formatTimeRange(scheduleInfo.open, scheduleInfo.close)}
          </span>
        ) : (
          <span>{scheduleInfo.isOpen ? 'Cerrado' : scheduleInfo.reason}</span>
        )
      ) : scheduleInfo.type === 'regular' ? (
        // Mostrar horario regular
        scheduleInfo.isOpen && scheduleInfo.isWithinHours ? (
          <span>
            Abiertos de: {formatTimeRange(scheduleInfo.open, scheduleInfo.close)}
          </span>
        ) : (
          <span>Actualmente Cerrado</span>
        )
      ) : (
        // Fallback
        <span>Horario no disponible</span>
      )}
    </div>
  );
}
