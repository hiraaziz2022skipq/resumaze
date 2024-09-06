import { Card, CardContent, CardHeader, Drawer } from "@mui/material"
import DefaultResumeOption from "../../ui/DefaultResumeCard";
import { useRouter } from "next/navigation";
import ViewResume from "../../ui/ViewResume";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumeById } from "@/redux/resumes/action";


const DefaultTemplateList = ({currentResume}) => {
  const [isViewResume, setIsViewResume] = useState(false);
  const { currentResumeData } = useSelector((state) => state.resumesSlice);

  const dispatch = useDispatch();
  const router = useRouter();
  const onViewResume = () =>{
    dispatch(getResumeById(currentResume.id)).then(({payload}) => {
        if(payload.status === 200){
          setIsViewResume(true)

        }
    })
  }

  const onEditResume = () =>{
    router.push(`/edit-resume/${currentResume.id}`);
  }
  return <>
     <CardHeader title="Default Resume"/>
        <CardContent>
            <DefaultResumeOption
              resumeData={currentResume}
              onViewResume={onViewResume}
              onEditResume={onEditResume}
            />
        </CardContent>
        <Drawer
        open={isViewResume}
        anchor="right"
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: { xs: 600, sm: 700 } } }}
        onClose={() => {
          setIsViewResume(false);
        }}
      >
          <ViewResume resumeData={currentResumeData} />
      </Drawer>
  </>;
};
export default DefaultTemplateList;
