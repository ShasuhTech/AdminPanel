const path = require('path')

module.exports = {
  webpack: (config, { isServer }) => {
    // Modify config if needed
    return config;
  },
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts','@mui/x-date-pickers'],
  
  images: {
    domains: ['salon-documents.s3.ap-south-1.amazonaws.com'],
  }, 
}
