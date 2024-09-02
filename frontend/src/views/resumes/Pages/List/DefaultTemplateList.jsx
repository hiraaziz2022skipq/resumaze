import { Card, CardContent, CardHeader } from "@mui/material"
import DefaultResumeOption from "../../ui/DefaultResumeCard";



const DefaultTemplateList = ({currentResume}) => {
  return <>
     <CardHeader title="Default Resume"/>
        <CardContent>
            <DefaultResumeOption/>
        </CardContent>
  </>;
};
export default DefaultTemplateList;
