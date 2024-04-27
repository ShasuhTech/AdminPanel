import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = ({onMenuClick}) => {
  return (
    <AppBar position="static" className='bg-green-900'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={onMenuClick}>
          My Next.js App
        </Typography>


        {/* <Link href="/" passHref>
          <Typography variant="h6" component="a" sx={{ cursor: 'pointer', mr: 2 }}>
            Home
          </Typography>
        </Link>
        <Link href="/about" passHref>
          <Typography variant="h6" component="a" sx={{ cursor: 'pointer' }}>
            About
          </Typography>
        </Link> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;