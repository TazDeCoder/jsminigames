import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { SxProps, Theme } from '@mui/material/styles';

interface ActionButton extends ButtonProps {
  text: string;
}

export interface DialogProps extends MuiDialogProps {
  title: string;
  message: string;
  buttons: ActionButton[];
}

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 480,
  height: 240,
  bgcolor: 'primary.main',
};

export const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  buttons,
  ...props
}) => (
  <MuiDialog
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
    {...props}
  >
    <Box sx={wrapperStyles}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent sx={{ m: 2 }}>
        <DialogContentText id="dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
        {buttons.map((button, idx) => (
          <Button key={idx} color="accent" onClick={button.onClick}>
            {button.text}
          </Button>
        ))}
      </DialogActions>
    </Box>
  </MuiDialog>
);
