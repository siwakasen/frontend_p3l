import * as React from 'react';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from './AccountTab';
import { IconUserCircle } from '@tabler/icons-react';
import BlankCard from '../../shared/BlankCard';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountSetting = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BlankCard>
          <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
            <Tabs
              value={value}
              onChange={handleChange}
              scrollButtons="auto"
              aria-label="basic tabs example" variant="scrollable"
            >
              <Tab
                iconPosition="start"
                icon={<IconUserCircle size="22" />}
                label="Akun Saya"
                {...a11yProps(0)}
              />
            </Tabs>
          </Box>
          <Divider />
          <CardContent>
            <TabPanel value={value} index={0}>
              <AccountTab />
            </TabPanel>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default AccountSetting;
