import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle>{confirmDialog.title}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>No</Button>
        <Button onClick={confirmDialog.onConfirm}>YES</Button>
      </DialogActions>
    </Dialog>
  );
}
