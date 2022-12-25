import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  HTMLMotionProps,
} from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface ProgressCircleProps extends HTMLMotionProps<'div'> {
  timer: number;
  duration: number;
  strokeColor: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  timer,
  duration,
  strokeColor,
  ...props
}) => {
  const time = useMotionValue(0);
  const timeRange = useTransform(time, [0, duration], [0, 1]);
  const pathLength = useSpring(timeRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    time.set(timer);
  }, [time, timer]);

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      <svg
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
        width="108"
        height="108"
        fill="#000000"
        viewBox="0 0 60 60"
      >
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={strokeColor}
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            scaleX: -1,
          }}
        />
      </svg>
      <Box mb={2} mr={2}>
        <Typography>{duration - timer}</Typography>
      </Box>
    </motion.div>
  );
};
