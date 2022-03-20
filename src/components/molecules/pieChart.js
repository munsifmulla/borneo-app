import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

const PieChart = _ => {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState({
    title: {
      text: "Spends  by category",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
  });
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://eikyz5cux7.execute-api.us-east-2.amazonaws.com/prod/expenses"
    )
      .then(res => res.json())
      .then(res => {
        const dataTransform = res.Items.map(item => {
          return Object.keys(item).reduce((acc, itemE) => {
            acc[itemE] = item[itemE].S || item[itemE].N;
            return acc;
          }, {});
        });
        // console.log();
        const pieData = dataTransform.map(item => ({
          value: item.expense,
          name: item.expenseType,
        }));

        option.series = {
          name: "Access From",
          type: "pie",
          radius: "80%",
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        };
        setOption({ ...option });
        setLoading(false);
      });
  }, []);

  if (loading) return <h5>Loading...</h5>;
  return (
    <ReactECharts
      option={option}
      lazyUpdate
      notMerge={true}
      echarts={echarts}
      style={{ height: "500px", width: "100%" }}
    />
  );
};

export default PieChart;
