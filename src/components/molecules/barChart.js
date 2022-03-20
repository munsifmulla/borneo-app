import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

const BarChart = _ => {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState({
    title: {
      text: "Spends by Date",
      left: "center",
    },
    xAxis: {},
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      // {
      //   data: [120, 200, 150, 80, 70, 110, 130],
      //   type: "bar",
      //   showBackground: true,
      //   backgroundStyle: {
      //     color: "rgba(180, 180, 180, 0.2)",
      //   },
      // },
      // {
      //   data: [120, 200, 150, 80, 70, 110, 130],
      //   type: "bar",
      //   showBackground: true,
      //   backgroundStyle: {
      //     color: "rgba(180, 180, 180, 0.2)",
      //   },
      // },
      // {
      //   data: [120, 200, 150, 80, 70, 110, 130],
      //   type: "bar",
      //   showBackground: true,
      //   backgroundStyle: {
      //     color: "rgba(180, 180, 180, 0.2)",
      //   },
      // },
    ],
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
        const xAxisData = dataTransform.map(item => item.date);
        // console.log(xAxisData);

        option.xAxis = {
          type: "category",
          data: xAxisData,
        };
        option.legend = {
          data: dataTransform.map(item => item.expenseType),
        };

        option.series = [...new Set(xAxisData)].map(date => ({
          data: dataTransform
            .filter(item => item.date === date)
            .map(itemI => itemI.expense),
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        }));

        // console.log(option);
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

export default BarChart;
