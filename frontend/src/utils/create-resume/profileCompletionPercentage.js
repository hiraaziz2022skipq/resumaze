
export  const options = {
    chart: {
      sparkline: { enabled: true },
    },
    stroke: { lineCap: "round" },
    colors: ["var(--mui-palette-primary-main)"],
    plotOptions: {
      radialBar: {
        hollow: { size: "55%" },
        track: {
          background: "var(--mui-palette-customColors-trackBg)",
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "var(--mui-palette-text-primary)",
          },
        },
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
  };