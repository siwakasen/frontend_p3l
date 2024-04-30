'use client';
import {Box, Typography} from '@mui/material';
import Image from "next/image";
import LogoImage from '@/../public/images/landingpage/favicon.png';


const AdminLayout = ({ children }) => {

    return (
        <Box>
            <Box
            top={0}
            position={'absolute'}
            rounded={0}
             sx={    
                {
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'row',
                    padding: '10px',
                    width: '100%',
                    boxShadow: '0px 0px 5px 0px #a8a8a8',
                    borderRadius: '0px',
                }
    
            } >
                <Image src={LogoImage} alt='logo' />
                <Typography
                  color="black"
                  variant="h4"
                  fontWeight="bold"
                  ml={2}
                >
                  Atma Kitchen
                </Typography>
            </Box>
            {children}
        </Box>
    );
}

export default AdminLayout;
