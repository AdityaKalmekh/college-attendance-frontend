import { Close as CloseIcon } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';

const Modal = ({
  children,
  title,
  onOk,
  onCancel,
  fullScreen = '',
  okText = '',
  cancelText = 'Cancel',
  fullWidth = true,
  isSaveDisabled = false,
  footer = (
    <DialogActions>
      {okText === '' ? (
        <Button color="primary" disabled={isSaveDisabled} variant="contained" onClick={onOk}>
          save
        </Button>
      ) : (
        <Button color="primary" disabled={isSaveDisabled} variant="contained" onClick={onOk}>
          {okText}
        </Button>
      )}

      <Button variant="outlined" onClick={onCancel}>
        {cancelText}
      </Button>
    </DialogActions>
  ),
  sx,
}) => {
  return (
    <Dialog open onClose={onCancel} fullScreen={fullScreen} fullWidth={fullWidth}>
      {title && (
        <DialogTitle>
          {title}
          {onCancel ? (
            <IconButton
              aria-label="close"
              onClick={onCancel}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      )}
      <DialogContent sx={sx}>{children}</DialogContent>
      {okText === '' && footer}
    </Dialog>
  );
};

export default Modal;
