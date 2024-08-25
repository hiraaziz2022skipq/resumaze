import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import ReferenceAdd from "@/components/dialogs/resume-create/reference";
import CircularSpinner from "@/components/spinner/Circular";
import { addReferencesService, deleteReferencesService, getReferencesService, updateReferencesService } from "@/redux/create-resume/service";

import CustomAvatarAvatar from "@core/components/mui/Avatar";
import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

const References = ({ resumeId}) => {

  
  const [references, setReferences] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);


  const buttonProps = {
    variant: "outlined",
    children: "Add New Reference",
    size: "small",
  };

  const onDelete = (refId) => {
    deleteReferencesService(resumeId, refId)
    .then((res) => {
      if (res.status === 200) {
        setReferences((prevRefs) =>
          prevRefs.filter((ref) => ref.id !== refId)
        );
        toast.success("Reference Deleted Successfully!");
      } else {
        toast.error("Failed to Delete Reference.");
      }
    })
    .catch((error) => {
      toast.error("An error occurred while deleting Reference.");
    });
  };

  const onAdd = (newRef) => {
    addReferencesService(resumeId, newRef)
    .then((res) => {
      if (res.status === 200) {
        const refs = res.data.references;
        setReferences([...references, refs]);
        toast.success("Reference Added Successfully!");
      } else {
        toast.error("Failed to Add Reference.");
      }
    })
    .catch((error) => {
      toast.error("An error occurred while Adding Reference.");
    });
    

  };

  const onEdit = (refId , data)=>{
    updateReferencesService(resumeId, refId, data)
    .then((res) => {
      if (res.status === 200) {
        const updatedRef = res.data.references;
        setReferences((prevRefs) =>
          prevRefs.map((ref) => (ref.id === refId ? updatedRef : ref))
        );
        toast.success("Reference Updated Successfully!");
      } else {
        toast.error("Failed to Update Reference.");
      }
    })
    .catch((error) => {
      toast.error("An error occurred while Updating Reference.");
    });
}

  const iconButtonProps = {
    children: <i className="ri-edit-box-line" />,
    className: "text-textSecondary",
  };


  useEffect(()=>{
    getReferencesService(resumeId).then(resp => {
      if (resp.status === 200) {
        if (resp.data?.length > 0) {
          const newRefs = resp.data
          setReferences([...newRefs])
          setIsFirstTime(true);
        }
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
    })
  },[resumeId])

  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <CardHeader
        title="References"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={ReferenceAdd}
            dialogProps={{ isEdit: false, onFinsish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        <Grid container spacing={5}>
          {references.map((ref, index) => (
            <Grid item xs={12} sm={3} key={ref.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CustomAvatarAvatar src="/images/avatars/2.png" size={32} />
                  <div className="flex flex-col flex-wrap">
                    <Typography variant="body2" className="font-medium">
                      {ref.name}
                    </Typography>
                    <Typography variant="body2">{ref.email}</Typography>
                  </div>
                </div>
                <div className="mis-10">
                  <IconButton
                    onClick={() => onDelete(ref.id)}
                    className="ml-4" // Adds margin to the left of the icon
                  >
                    <i className="ri-delete-bin-7-line text-textSecondary" />
                  </IconButton>
                  <OpenDialogOnElementClick
                    element={IconButton}
                    elementProps={iconButtonProps}
                    dialog={ReferenceAdd}
                    dialogProps={{
                      data: ref,
                      isEdit: true,
                      id: ref.id,
                      onFinsish: onEdit,
                    }}
                  />
                </div>
              </div>
              <Divider orientation="horizontal" className="mt-2" />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Toaster />
    </>
  );
};

export default References;
