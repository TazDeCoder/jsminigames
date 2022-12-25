import type { HTMLAttributes, CSSProperties } from 'react';
import { useTheme } from '@mui/material';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  perc: number;
}

const baseStyles: CSSProperties = {
  height: 'inherit',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
  boxShadow:
    'inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4)',
  overflow: 'hidden',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ perc }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        ...baseStyles,
        width: `${perc}%`,
        backgroundColor: `${theme.palette.secondary.light}`,
      }}
    />
  );
};
