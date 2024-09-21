import React from 'react';
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';

const Barxchart = ({ salonRevenue }) => {
  // const currentYearData = salonRevenue.currentYear.map(entry => ({
  //   month: entry.monthname,
  //   currentYearValue: parseFloat(entry.sumamt)/100,
  // }));

  // const lastYearData = salonRevenue.lastYear.map(entry => ({
  //   month: entry.monthname,
  //   lastYearValue: parseFloat(entry.sumamt)/100,
  // }));

  // const dataset = currentYearData.map((currentMonth, index) => ({
  //   ...currentMonth,
  //   lastYearValue: lastYearData[index].lastYearValue,
  // }));
  const data = [
    {
      "name": "Jan",
      "uv": 4000,
      "pv": 2400,
      "cv":2543,
      'sv':353


    },
    {
      "name": "Feb",
      "uv": 3000,
      "pv": 1398,
      "cv":2333,
      'sv':453


    },
    {
      "name": "Mar",
      "uv": 2000,
      "pv": 9800,
      "cv":243,
      'sv':433


    },
    {
      "name": "Apr",
      "uv": 2780,
      "pv": 3908,
      "cv":243,
      'sv':435


    },
    {
      "name": "May",
      "uv": 1890,
      "pv": 4800,
      "cv":6343,
      'sv':4853


    },
    {
      "name": "Jun",
      "uv": 2390,
      "pv": 3800,
      "cv":233,
      'sv':4453


    },
    {
      "name": "July",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':4353
    },
    {
      "name": "Aug",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':4353
    },
    {
      "name": "Sep",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':3534
    },
    {
      "name": "Oct",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':3534
    },
    {
      "name": "Nov",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':3534
    },
    {
      "name": "Dec",
      "uv": 3490,
      "pv": 4300,
      "cv":2343,
      'sv':3534
    },
  ]
  

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" />
  <Bar dataKey="cv" fill="#ff0000" />
  <Bar dataKey="sv" fill="#ff600h" />
</BarChart>
      {/* <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="currentYearValue" name="Current Year" fill="#8884d8" />
        <Line type="monotone" dataKey="lastYearValue" name="Last Year" stroke="#82ca9d" />
      </ComposedChart> */}
    </ResponsiveContainer>
  );
};

export default Barxchart;