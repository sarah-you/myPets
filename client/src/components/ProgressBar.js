import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { useEffect } from 'react';

export default function ProgressBar({
  img,
  count,
  onClick,
  current,
  interval,
}) {
  const circles = [];

  useEffect(() => {
    const carousel = setInterval(interval, 3500);
    return () => clearInterval(carousel);
  });

  for (let i = 0; i < count; i++) {
    if (i === current) {
      circles.push(<FaCircle key={i} onClick={() => onClick(i)} />);
    } else {
      circles.push(<FaRegCircle key={i} onClick={() => onClick(i)} />);
    }
  }
  return <div>{circles}</div>;
}
