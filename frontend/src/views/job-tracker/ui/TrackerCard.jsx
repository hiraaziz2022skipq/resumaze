import {
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Chip,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

// Third-Party Imports
import classnames from "classnames";

// Styles Imports
import styles from "../styles.module.css";
import CustomAvatar from "@/@core/components/mui/Avatar";
import { useState } from "react";
import { getCurrentTask } from "@/redux/slices/kanban";

export const chipColor = {
  UX: { color: "success" },
  "Code Review": { color: "error" },
  "Full Stack Developer": { color: "error" },
  Dashboard: { color: "info" },
  Images: { color: "warning" },
  App: { color: "secondary" },
  "Charts & Map": { color: "primary" },
};

const TrackerCard = ({
  task,
  dispatch,
  column,
  setColumns,
  columns,
  setDrawerOpen,
  tasksList,
  setTasksList,
  handleJobClick,
}) => {
  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle menu click
  const handleClick = (e) => {
    setMenuOpen(true);
    setAnchorEl(e.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  // Handle Task Click
  const handleTaskClick = () => {
    setDrawerOpen(true);
    dispatch(getCurrentTask(task.id));
  };
  // Delete Task
  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
    setTasksList(tasksList.filter((taskItem) => taskItem?.id !== task.id));
    const newTaskIds = column.taskIds.filter((taskId) => taskId !== task.id);
    const newColumn = { ...column, taskIds: newTaskIds };
    const newColumns = columns.map((col) =>
      col.id === column.id ? newColumn : col
    );

    setColumns(newColumns);
  };

  // Handle Delete
  const handleDelete = () => {
    handleClose();
    handleDeleteTask();
  };

  return (
    <Card
      className={classnames(
        "item-draggable is-[16.5rem] cursor-grab active:cursor-grabbing overflow-visible mbe-4",
        styles.card
      )}
      onClick={() => handleTaskClick()}
    >
      <CardContent className="flex flex-col gap-y-2 items-start relative overflow-hidden">
        {/* {['Full Stack Developer'] && ['UX'].length > 0 && ( */}
        <div className="flex flex-wrap items-center justify-start gap-2 is-full max-is-[85%]">
          {["Full Stack Developer"].map(
            (badge, index) =>
              chipColor[badge]?.color && (
                <Chip
                  variant="tonal"
                  key={index}
                  label={badge}
                  size="small"
                  color={chipColor[badge].color}
                  style={{ marginRight: 8 }} // Add margin to separate from the icon
                />
              )
          )}
        </div>
        {/* )} */}
        <div
          className="absolute block-start-4 inline-end-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="Generate Resume" arrow>
            <Button
              onClick={() => {
                handleJobClick(task.id);
              }}
              style={{ minWidth: "auto" }} // Optional: Adjust button styling if needed
            >
              <AutoFixHighIcon style={{ fontSize: 18 }} />
            </Button>
          </Tooltip>
          {/* <IconButton
            aria-label="more"
            size="small"
            className={classnames(styles.menu, {
              [styles.menuOpen]: menuOpen,
            })}
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <i className="ri-more-2-line text-xl" />
          </IconButton>
          <Menu
            id="long-menu"
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Duplicate Task</MenuItem>
            <MenuItem onClick={handleClose}>Copy Task Link</MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </MenuItem>
          </Menu> */}
        </div>

        {task.image && (
          <img src={task.image} alt="task Image" className="is-full rounded" />
        )}
        <Typography color="text.primary" className="max-is-[85%] break-words">
          {task.job_description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default TrackerCard;
