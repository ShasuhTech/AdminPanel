const path = require('path');
const withTM = require('next-transpile-modules')([
  'antd',
  '@ant-design/icons',
  'rc-util',   // This is the library causing the error
  'rc-upload', // Include other rc-* packages as needed
]);

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Modify config if needed
    return config;
  },
  reactStrictMode: true,
  
  // Include the packages you need to transpile
  transpilePackages: ['@mui/x-charts', '@mui/x-date-pickers'],
  
  // Image domain configurations
  images: {
    domains: ['salon-documents.s3.ap-south-1.amazonaws.com'],
  },
});
