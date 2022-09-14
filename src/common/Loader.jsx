/** @jsxImportSource @emotion/react */
import { CircularProgress, Stack } from '@mui/material';

const Loading = ({ circularSize = 50, circularColor = 'primary', title, top = '55%' }) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <CircularProgress size={circularSize} color={circularColor} sx={{ position: 'absolute', top: '45%' }} />
      <span css={{ position: 'absolute', top }}>{title}</span>
    </Stack>
  );
};

export default Loading;
