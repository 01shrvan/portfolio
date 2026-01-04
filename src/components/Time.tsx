import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return <span className="font-mono text-sm text-muted-foreground tabular-nums">00:00:00</span>;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <span className="font-mono text-sm text-muted-foreground tabular-nums">
      {hours}:{minutes}:{seconds}
    </span>
  );
}
