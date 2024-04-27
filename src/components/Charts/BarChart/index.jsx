import React from 'react';
import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Barxchart = ({ salonRevenue }) => {
  const currentYearData = salonRevenue.currentYear.map(entry => ({
    month: entry.monthname,
    currentYearValue: parseFloat(entry.sumamt)/100,
  }));

  const lastYearData = salonRevenue.lastYear.map(entry => ({
    month: entry.monthname,
    lastYearValue: parseFloat(entry.sumamt)/100,
  }));

  const dataset = currentYearData.map((currentMonth, index) => ({
    ...currentMonth,
    lastYearValue: lastYearData[index].lastYearValue,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={dataset}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="currentYearValue" name="Current Year" fill="#8884d8" />
        <Line type="monotone" dataKey="lastYearValue" name="Last Year" stroke="#82ca9d" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Barxchart;