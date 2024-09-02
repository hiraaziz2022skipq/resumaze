import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import ExtraInfoAdd from "@/components/dialogs/resume-create/extra-info";
import CircularSpinner from "@/components/spinner/Circular";
import {
  addExtraInfoService,
  deleteExtraInfoService,
  getExtraInfoService,
  updateExtraInfoService,
} from "@/redux/create-resume/service";
import { updateResume } from "@/redux/resumes/slice";
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

import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  calculatePercentageOfSteps,
  checkReqforATSScore,
} from "@/utils/create-resume/functions";
import {
  setEligibilityofATSScore,
  setProfilePercentage,
} from "@/redux/create-resume/slice";

const ExtraInfo = ({ resumeId }) => {
  const dispatch = useDispatch();
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
          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { extra: extraInfo.filter((ref) => ref.id !== exId) },
            })
          );

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
    addExtraInfoService(resumeId, { extra: [formattedRef] })
      .then((res) => {
        if (res.status === 200) {
          const newData = {
            id: res.data.extra_info.id,
            ...res.data.extra_info.extra[0], 
          };

          setExtraInfo([...extraInfo, newData]);

          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { extra: [...extraInfo, newData] },
            })
          );

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
    updateExtraInfoService(resumeId, exId, { extra:[formattedData]})
      .then((res) => {
        if (res.status === 200) {
          const updatedExtraInfo = res.data;
          setExtraInfo((prevEInfo) =>
            prevEInfo.map((ExInfo) =>
              ExInfo.id === exId ? updatedExtraInfo : ExInfo
            )
          );

          const percentage = calculatePercentageOfSteps(res.data.steps);
          dispatch(setProfilePercentage(percentage));

          const isElgForAts = checkReqforATSScore(res.data.steps);
          dispatch(setEligibilityofATSScore(isElgForAts));

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: {
                extra: extraInfo.map((ExInfo) =>
                  ExInfo.id === exId ? updatedExtraInfo : ExInfo
                ),
              },
            })
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
    getExtraInfoService(resumeId)
      .then((resp) => {
        console.log(resp, "==responseGetExtraInfo==");
        if (resp.status === 200) {
          const newData = resp.data.map((item) => ({
            id: item.id,
            ...item.extra[0], // Assuming extra is an array with a single object.
          }));

          setExtraInfo(newData);

          dispatch(
            updateResume({
              resumeId: resumeId,
              singleObj: { extra: newData },
            })
          );
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [resumeId]);

  if (isLoading) return <CircularSpinner />;

  console.log(extraInfo, "==extrainf==");
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
          {extraInfo.map((item) => (
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
                  {/* <OpenDialogOnElementClick
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
                  /> */}
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
