import { useMediaQuery, Box, Drawer, Container } from '@mui/material';
import NavListing from './NavListing';
import { useSelector, useDispatch } from 'react-redux';

const Navigation = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state) => state.customizer);

  if (lgUp) {
    return (
      <Box py={2}>
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <NavListing />
        </Container>
      </Box>
    );
  }
};

export default Navigation;
