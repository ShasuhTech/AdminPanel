import React from 'react';
import { Button, Grid } from '@mui/material';

const CustomTabs = ({ tabs, selectedTab, onSelectTab,XS }) => {
  return (
    <Grid container spacing={2}>
      {tabs.map((tab) => (
        <Grid item xs={XS||6} key={tab.id}>
          <Button
            fullWidth
            onClick={() => onSelectTab(tab.id)}
            sx={{
              mt: 2,
              py:1.2,
              
              borderRadius:'10px',
              backgroundColor: selectedTab === tab.id ? '#1F3A8A' : '#000',
              color: 'white',
              '&:hover': {
                backgroundColor: selectedTab === tab.id ? '#1F3A8A' : '#33435c',
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
