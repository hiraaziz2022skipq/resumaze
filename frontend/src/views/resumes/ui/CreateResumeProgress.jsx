import { options } from "@/utils/create-resume/profileCompletionPercentage";
import { Card, CardHeader } from "@mui/material";
import dynamic from "next/dynamic";

// Styled Component Imports
const AppReactApexCharts = dynamic(() =>
  import("@/libs/styles/AppReactApexCharts")
);

const CreateResumeProgress = ({ progress = 10 }) => {
  return (
    <Card className="flex flex-col justify-evenly bs-full">
        <CardHeader title='Percentage' />
      <AppReactApexCharts
        type="radialBar"
        height={200}
        width="100%"
        options={options}
        series={[progress]}
      />
    </Card>
  );
};

export default CreateResumeProgress;
