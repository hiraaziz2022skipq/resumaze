import OpenDialogOnElementClick from "@/components/dialogs/OpenDialogOnElementClick";
import ReferenceAdd from "@/components/dialogs/resume-create/reference";

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

const References = ({ references, setReferences }) => {
  const buttonProps = {
    variant: "outlined",
    children: "Add New Reference",
    size: "small",
  };

  const onDelete = (index) => {
    const updatedRef = references.filter((_, i) => i !== index);
    setReferences(updatedRef);
  };

  const onAdd = (newRef) => {
    const newCertArray = [...references, newRef];
    setReferences(newCertArray);
  };

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
            <Grid item xs={12} sm={3} key={index}>
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
                <IconButton
                  onClick={() => onDelete(index)}
                  className="ml-4" // Adds margin to the left of the icon
                >
                  <i className="ri-delete-bin-7-line text-textSecondary" />
                </IconButton>
              </div>
              <Divider orientation="horizontal" className="mt-2" />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </>
  );
};

export default References;
