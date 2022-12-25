import { useState } from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { Markdown } from '../../../ui';

type Props = {
  text: string;
};

const wrapperStyles: SxProps<Theme> = {
  width: '50%',
  height: '150px',
  p: 1,
  my: 1,
  mx: 'auto',
  overflow: 'hidden',
  textAlign: 'center',
  bgcolor: 'primary.light',
  borderRadius: 1,
  cursor: 'pointer',
};

const HelperText: React.FC<Props> = ({ text }) => {
  const [showText, setShowText] = useState(false);

  return (
    <Box
      sx={wrapperStyles}
      onMouseEnter={() => {
        setShowText(true);
      }}
      onMouseLeave={() => {
        setShowText(false);
      }}
    >
      <Markdown
        text={showText ? text : 'Need Help?'}
        align={showText ? 'inherit' : 'center'}
      />
    </Box>
  );
};

export default HelperText;
