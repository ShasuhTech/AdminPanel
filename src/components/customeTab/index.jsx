import React from 'react';
import { Button, Grid } from '@mui/material';

const CustomTabs = ({ tabs, selectedTab, onSelectTab }) => {
  return (
    <Grid container spacing={2}>
      {tabs.map((tab) => (
        <Grid item xs={6} key={tab.id}>
          <Button
            fullWidth
            onClick={() => onSelectTab(tab.id)}
            sx={{
              mt: 2,
              backgroundColor: selectedTab === tab.id ? 'primary.main' : '#000',
              color: 'white',
              '&:hover': {
                backgroundColor: selectedTab === tab.id ? 'primary.dark' : '#000',
              },
            }}
          >
            <p className="font-bold text-[18px]">{tab.label}</p>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomTabs;