// components/FullSchedule.tsx (Server Component)

import { formatTimeRange } from "../utils/formats";

type ScheduleItem = {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
};

interface FullScheduleProps {
  schedule: ScheduleItem[];
}

export default function FullSchedule({ schedule }: FullScheduleProps) {
  // Agrupar días consecutivos con el mismo horario
  const groupedSchedule: { days: string[]; open: string; close: string; isOpen: boolean }[] = [];
  
  schedule.forEach((item) => {
    const lastGroup = groupedSchedule[groupedSchedule.length - 1];
    
    // Si el último grupo tiene el mismo horario y estado, agregar el día
    if (
      lastGroup &&
      lastGroup.open === item.open &&
      lastGroup.close === item.close &&
      lastGroup.isOpen === item.isOpen
    ) {
      lastGroup.days.push(item.day);
    } else {
      // Crear un nuevo grupo
      groupedSchedule.push({
        days: [item.day],
        open: item.open,
        close: item.close,
        isOpen: item.isOpen,
      });
    }
  });

  return (
    <div className="space-y-2">
      {groupedSchedule.map((group, index) => {
        // Formatear los días (ej: "Lunes a Viernes" o "Sábado")
        const daysText = group.days.length > 1
          ? `${group.days[0]} a ${group.days[group.days.length - 1]}`
          : group.days[0];

        return (
          <p key={index} className="text-base text-[#133f65]">
            <span className="font-semibold">{daysText}:</span>{" "}
            {group.isOpen ? formatTimeRange(group.open, group.close) : "Cerrado"}
          </p>
        );
      })}
    </div>
  );
}
