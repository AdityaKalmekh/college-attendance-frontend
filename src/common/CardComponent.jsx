import Card from '@mui/material/Card';

const CardComponent = ({ children, sx }) => {
  return <Card sx={sx}>{children}</Card>;
};

export default CardComponent;
