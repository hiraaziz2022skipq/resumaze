import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import ExtraInfoAdd from "@/components/dialogs/resume-create/extra-info";
import CircularSpinner from "@/components/spinner/Circular";
import {
  addExtraInfoService,
  deleteExtraInfoService,
  getExtraInfoService,
  updateExtraInfoService,
} from "@/redux/create-resume/service";
import { Button, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";


const ExtraInfo = ({ resumeId }) => {
  const buttonProps = {
    variant: "outlined",
    children: "Add Extra Info",
    size: "small",
  };

  const [extraInfo, setExtraInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onDelete = (exId) => {
    deleteExtraInfoService(resumeId, exId)
      .then((res) => {
        if (res.status === 200) {
          setExtraInfo((prevRefs) => prevRefs.filter((ref) => ref.id !== exId));
          toast.success("Extra-Info Deleted Successfully!");
        } else {
          toast.error("Failed to Delete Extra-Info.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting Extra-Info.");
      });
  };

  const onAdd = (newRef) => {
    const { key, value } = newRef;

    const formattedRef = { [key]: value };
    addExtraInfoService(resumeId, formattedRef)
      .then((res) => {
        if (res.status === 200) {
          const newData = res.data;
          setExtraInfo([...extraInfo, newData]);    
          toast.success("Extra-Info Added Successfully!");
        } else {
          toast.error("Failed to Add Extra-Info.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Adding Extra-Info.");
      });
  };

  const onEdit = (exId, data) => {
    // Extract key and value from data
    const { key, value } = data;

    // Construct the object with key as the dynamic property
    const formattedData = { [key]: value };

    // Update extra info service call with the formatted object
    updateExtraInfoService(resumeId, exId, formattedData)
      .then((res) => {
        if (res.status === 200) {
          const updatedExtraInfo = res.data;
          setExtraInfo((prevEInfo) =>
            prevEInfo.map((ExInfo) =>
              ExInfo.id === exId ? updatedExtraInfo : ExInfo
            )
          );
          toast.success("Extra-Info Updated Successfully!");
        } else {
          toast.error("Failed to Update Extra-Info.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Updating Extra-Info.");
      });
  };

  useEffect(() => {
    getExtraInfoService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data?.length > 0) {
          const newData = resp.data;
          setExtraInfo([...newData]);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [resumeId]);

  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <CardHeader
        title="Extra Info"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={ExtraInfoAdd}
            dialogProps={{ isEdit: false, onFinish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        <Grid container spacing={5}>
          {extraInfo.map((item, index) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  {Object.keys(item).map(
                    (key) =>
                      key !== "id" && (
                        <div key={key}>
                          <Typography variant="body2" className="font-medium">
                            {key}: {item[key]}
                          </Typography>
                        </div>
                      )
                  )}
                </div>
                <div>
                  <IconButton
                    onClick={() => onDelete(item.id)}
                    className="ml-4"
                  >
                    <i className="ri-delete-bin-7-line text-textSecondary" />
                  </IconButton>
                  <OpenDialogOnElementClick
                    element={IconButton}
                    elementProps={{
                      children: (
                        <i className="ri-edit-line text-textSecondary" />
                      ),
                    }}
                    dialog={ExtraInfoAdd}
                    dialogProps={{
                      data: item,
                      isEdit: true,
                      id: item.id,
                      onFinish: onEdit,
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

export default ExtraInfo;
