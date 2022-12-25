import { useTheme, Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { Markdown, ProgressCircle } from '../../../ui';

type Props = {
  prompt: string;
  timer: number;
  duration: number;
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  alignItems: 'center',
  width: '100%',
  mt: 2,
  mb: 5,
};

const Prompt: React.FC<Props> = ({ prompt, timer, duration }) => {
  const theme = useTheme();

  return (
    <Box sx={wrapperStyles}>
      <Markdown sx={{ mb: 5 }} variant="h6" text={prompt} />
      <ProgressCircle
        timer={timer}
        duration={duration}
        strokeColor={theme.palette.accent.main}
      />
    </Box>
  );
};

export default Prompt;
