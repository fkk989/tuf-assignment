import { useState, useEffect } from "react";

const Countdown = ({ timeStampe }: { timeStampe: string }) => {
  //
  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }
  //
  const targetDate = new Date(timeStampe).getTime();
  //
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  //
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, []);
  //
  return (
    <div className="flex items-center gap-[20px] text-white text-[20px] font-bold">
      <h1 className="">Hurry Up!</h1>
      <div className=" ">
        {timeLeft.days !== undefined ? (
          <div className="flex items-center gap-[5px]">
            {timeLeft.days !== 0 && <span>{timeLeft.days}d </span>}
            {timeLeft.hours !== 0 && <span>{timeLeft.hours}h </span>}
            {timeLeft.minutes !== 0 && <span>{timeLeft.minutes}m </span>}
            {timeLeft.seconds !== 0 && <span>{timeLeft.seconds}s </span>}
            <span>Left</span>
          </div>
        ) : (
          <span>Time's up!</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
