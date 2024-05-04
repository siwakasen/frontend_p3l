import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery, Button } from '@mui/material';
import { IconPower } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { checkToken } from '@/services/auth/auth';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state) => state.customizer);
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const [data, setData] = React.useState({});
  const token = Cookies.get("token");
  const router = useRouter();
  
  React.useEffect(() => {
    async function checkAuthorize() {
      if (!token) return;
      const response = await checkToken(token);
      setData(response.data);
    }
    checkAuthorize();
  }, [token]);
  
  function handleLogout() {
    Cookies.remove("token");
    router.push("/auth/login");
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
      borderRadius={`${customizer.borderRadius}px`}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} sx={{height: 40, width: 40}} />

          <Box>
            <Typography variant="h6">{data.nama_karyawan}</Typography>
            <Typography variant="caption">{data.role}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={() => handleLogout()}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Profile;