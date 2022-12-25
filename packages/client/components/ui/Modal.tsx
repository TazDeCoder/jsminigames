import MuiModal from '@mui/material/Modal';
import type { ModalProps as MuiModalProps } from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import type { SxProps, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends MuiModalProps {
  onClose: () => void;
}

const modalStyles: SxProps<Theme> = {
  position: 'relative',
  top: '50%',
  left: '50%',
  width: '90%',
  maxWidth: 720,
  p: 4,
  mb: 1,
  bgcolor: 'white',
  border: '1px solid #000',
  borderRadius: 4,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  transform: 'translate(-50%, -50%)',
};

const closeBtnStyles: SxProps<Theme> = {
  position: 'absolute',
  top: '8px',
  right: '16px',
};

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  title,
  sx,
  onClose,
  ...props
}) => (
  <MuiModal aria-labelledby="modal-title" open={open} {...props}>
    <Fade in={open}>
      <Box sx={{ ...modalStyles, ...sx }}>
        <IconButton sx={closeBtnStyles} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
        <Typography id="modal-title" component="h2" variant="h4" align="center">
          {title}
        </Typography>
        {children}
      </Box>
    </Fade>
  </MuiModal>
);
