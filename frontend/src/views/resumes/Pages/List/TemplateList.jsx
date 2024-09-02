import { CardContent, CardHeader, Grid } from "@mui/material";
import ResumeListCard from "../../ui/ResumeListCard";

const TemplatesList = () => {

  const TemplatesListData = [
    {
       
      id:1,
      imgWidth: 200,
      imgHeight: 270,
      category: "resumetemp1",
    },
   
  ];

  return (
    <>
      <CardHeader title="Resume Templates" />
      <CardContent>
        <Grid container spacing={3} sx={{ p: 2 }}>
          {TemplatesListData.map((item, index) => (
            <Grid item key={index}>
              <ResumeListCard data={item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </>
  );
};

export default TemplatesList;
