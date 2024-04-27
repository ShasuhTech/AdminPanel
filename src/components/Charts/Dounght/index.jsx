import React, { useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

function PieAnimation({ doughnutData }) {
  const [radius, setRadius] = useState(60);
  const [itemNb, setItemNb] = useState(5);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };

  const handleRadius = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setRadius(newValue);
  };

  if (!doughnutData) {
    return null;
  }

  const slicedData = doughnutData.slice(1);
  const value = slicedData.map(item => item.value / 100)

  
  console.log('piechart', slicedData)
  console.log('pie value', value)

  const totalValue = slicedData.reduce((acc, { value }) => acc + value, 0);

  return (
    <div style={{ position: "relative" }}>
      <PieChart
        height={200}
        series={[
          {
            data: slicedData.map(({ value}) => ({
              value:value/100
            })),
            innerRadius: radius,
            paddingAngle: 2,
          },
        ]}
        colors={slicedData.map(({ color }) => color)}
        className="border"
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 12,
            fontWeight: "bold",
            backgroundColor: "red",
          },
        }}
        margin={{ right: 5 }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div>Total Value:</div>
        <div>
          <strong>₹{(totalValue.toFixed(1))/100}</strong>
        </div>
      </div>
    </div>
  );
}

export default PieAnimation;
