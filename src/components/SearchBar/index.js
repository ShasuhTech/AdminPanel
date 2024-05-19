/* eslint-disable no-unused-vars */
// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Magnify from 'mdi-material-ui/Magnify'
import { Tooltip } from '@mui/material'

const QuickSearchToolbar = (props) => {
  return (
    <Box
      sx={
        props.rootSx || {
          p: !props.isNotDataGrid ? 2 : 0,
          pb: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginLeft: props.isNotDataGrid ? 4 : 2
        }
      }
    >
      {/* {!props.isNotDataGrid && (
        <Box>
          <GridToolbarFilterButton />
        </Box>
      )} */}
      <Tooltip title={props?.isTeamMember ? props?.isTeamMember : 'Search by id, name'}>
        <TextField
          variant={props?.variant || 'standard'}
          value={props.value}
          onChange={props.onChange}
          fullWidth
          placeholder={props?.isTeamMember ? props?.isTeamMember : 'Search by id, name'}
          InputProps={{
           
          }}
         
        />
      </Tooltip>
    </Box>
  )
}

export default QuickSearchToolbar
