// React Imports
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CertificationsAdd from "@/components/dialogs/resume-create/certification";
import OpenDialogOnElementClick from "@components/dialogs/OpenDialogOnElementClick";
import CircularSpinner from "@/components/spinner/Circular";
import {
  addCertificationsService,
  deleteCertificationsService,
  getCertificationsService,
  updateCertificationsService,
} from "@/redux/create-resume/service";

const Certificates = ({ resumeId }) => {
  const buttonProps = {
    variant: "outlined",
    children: "Add New Certificate",
    size: "small",
  };

  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onEdit = (certId, data) => {
    updateCertificationsService(resumeId, certId, data)
      .then((res) => {
        if (res.status === 200) {
          const updatedCertifications = res.data.certifications;
          setCertifications((prevCert) =>
            prevCert.map((cert) =>
              cert.id === certId ? updatedCertifications : cert
            )
          );
          toast.success("Certificate Updated Successfully!");
        } else {
          toast.error("Failed to Update Certificate.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Updating Certificate.");
      });
  };

  const onDelete = (certId) => {
    deleteCertificationsService(resumeId, certId)
      .then((res) => {
        if (res.status === 200) {
          setCertifications((prevCert) =>
            prevCert.filter((ct) => ct.id !== certId)
          );
          toast.success("Certificate Deleted Successfully!");
        } else {
          toast.error("Failed to Delete Certificate.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting Certificate.");
      });
  };

  const onAdd = (newCert) => {
    addCertificationsService(resumeId, newCert)
      .then((res) => {
        if (res.status === 200) {
          const newCertification = res.data.certifications;
          setCertifications([...certifications, newCertification]);
          toast.success("Certificate Added Successfully!");
        } else {
          toast.error("Failed to Add Certificate.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while Adding Certificate.");
      });
  };

  useEffect(() => {
    getCertificationsService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data.length > 0) {
          const allCert = resp.data;
          setEduction([...allCert]);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <CircularSpinner />;

  return (
    <>
      <CardHeader
        title="Certifications"
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={CertificationsAdd}
            dialogProps={{ isEdit: false, onFinsish: onAdd }}
          />
        }
        className="flex-wrap gap-4"
      />
      <CardContent>
        {certifications.map((cert, index) => (
          <div key={index}>
            <CertificationCards
              key={cert.id}
              cert={cert}
              index={index}
              is
              isDefaultCard={index === 0}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {index !== certifications.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default Certificates;
