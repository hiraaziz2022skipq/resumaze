"use client";
import { useTheme } from '@mui/material/styles'
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import classNames from "classnames";
const ViewResumeCard = () => {

    const theme = useTheme()
  return (
    <>
      <Card>
        <CardContent className="relative">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col">
              <Typography variant="h5">
                Hello <span className="font-bold">Norris!</span> 🎉
              </Typography>
              <Typography variant="subtitle1">
                Best seller of the month
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="h4" color="primary">
                $42.8k
              </Typography>
              <Typography>78% of target 🚀</Typography>
            </div>
            <Button size="small" variant="contained">
              View Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};


export default ViewResumeCard