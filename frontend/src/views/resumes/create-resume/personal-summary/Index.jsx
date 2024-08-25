"use client";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
// Third-party Imports
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";


import { useEffect, useState } from "react";
import {
  getProfessionalInfoService,
  postProfessionalInfoService,
  updateProfessionalInfoService,
} from "@/redux/create-resume/service";
import CircularSpinner from "@/components/spinner/Circular";

import toast, { Toaster } from "react-hot-toast";
import TipTapEditor from "@/components/editor/TipTap/Editor";

const PersonalSummary = ({ resumeId }) => {
  const [professional_info, setProfessionalInfo] = useState({
    name: "",
    image: "/images/avatars/1.png",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    date_of_birth: "",
    job_title: "",
    professional_summary: "",
  });

  const [data, setData] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: `
         
        `,
  });
  const fetchSummaries = async () => {
    const response = await fetch("/api/generatesummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        experiences: [
          {
            job_title: "Full Stack Developer",
            job_description: "Reactjs,nodejs",
            end_date: "",
            is_current: true,
            company_name: "Amazon",
            start_date: "16/11/1888",
            location: "karachi",
          },
        ],
        skills: ["React.js", "NodeJs"],
        Projects: [],
        Certifications: [],
      }),
    });

    const data = await response.json();
    try {
      console.log("data : ", data);
      const parsedSummaries = JSON.parse(data.summaries);
      console.log("parse : ", parsedSummaries);
      setData(parsedSummaries[0] || "");
    } catch (error) {
      console.error("Failed to parse summaries:", error);
      setData([data.summaries]);
    }
  };

  const handleSave = () => {
    const profInfo = {
      ...professional_info,
      professional_summary: data,
    };
    if (isFirstTime) {
      updateProfessionalInfoService(resumeId, profInfo).then((res) => {
        if (res.status === 200) {
          toast.success("Updated Successfully!");
        }
      });
    } else {
      postProfessionalInfoService(resumeId, profInfo).then((res) => {
        if (res.status === 200) {
          toast.success("Created Successfully!");
          setIsFirstTime(true);
        }
      });
    }
  };

  useEffect(() => {
    getProfessionalInfoService(resumeId).then((resp) => {
      if (resp.status === 200) {
        if (resp.data?.professional_info) {
          setData(resp.data?.professional_info?.professional_summary || "");
          setProfessionalInfo({
            ...resp.data.professional_info,
          });
          setIsFirstTime(true);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [resumeId]);

  useEffect(() => {
    if (editor) {
      const typingEffect = async (content) => {
        let index = 0;
        while (index <= content.length) {
          editor.commands.setContent(content.slice(0, index));
          index++;
          await new Promise((resolve) => setTimeout(resolve, 30)); // Adjust typing speed
        }
      };

      typingEffect(data);
    }
  }, [editor, data]);

  if (isLoading) return <CircularSpinner />;

  return (
    <>
        <CardHeader
          title="Summary"
          action={
            <>
              <Button
                variant="contained"
                aria-haspopup="true"
                onClick={() => {
                  fetchSummaries();
                }}
              >
                Generate New Summary
              </Button>
            </>
          }
        />
        <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card className="p-0 border shadow-none">
              <CardContent className="p-0">
                <TipTapEditor editor={editor} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Grid>
          </Grid>
        </CardContent>
      <Toaster />
    </>
  );
};

export default PersonalSummary;
