import React from 'react';
import {
    Box,
    Grid,
    Tab,
  } from '@mui/material';
import { useSelector } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Biodata from './skeleton/Biodata';
import Alamat from './skeleton/Alamat';
import Notifikasi from './skeleton/Notifikasi';

const tab = [
    { value: 'biodata', label: 'Biodata Diri', disabled: false },
    { value: 'alamat', label: 'Daftar Alamat', disabled: false },
    { value: 'notifikasi', label: 'Notifikasi', disabled: false }
  ];
  

  const ContainerProfile = () => {
    const data = useSelector((state) => state.user);
    const [value, setValue] = React.useState('biodata');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid item xs={12} sm={12} md={9} lg={9}>
            <Box item="true" borderRadius={2} boxShadow={1} bgcolor="#fff" border={"1px solid #f0f0f0"}>
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        {tab.map((item, i) => (
                            <Tab key={i} label={item.label} value={item.value} disabled={item.disabled} />
                        ))}
                    </TabList>
                    <TabPanel value="biodata">
                        <Biodata />
                    </TabPanel>
                    <TabPanel value="alamat">
                        <Alamat />
                    </TabPanel>
                    <TabPanel value="notifikasi">
                        <Notifikasi />
                    </TabPanel>
                </TabContext>
            </Box>
        </Grid>
    );
  };
  
  export default ContainerProfile;