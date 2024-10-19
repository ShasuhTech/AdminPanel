/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  },
  swcMinify: true,
  transpilePackages: ['@mui/x-charts','@mui/x-date-pickers','@mui/x-date-pickers/AdapterDayjs','@mui/icons-material','rc-util','rc-pagination','@ant-design','rc-picker'],
  // images: {
  //   domains: ['salon-documents.s3.ap-south-1.amazonaws.com','salon-documents-prod.s3.ap-south-1.amazonaws.com',
  // ],
  // }, 
}