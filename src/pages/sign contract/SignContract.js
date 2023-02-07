import {
    Box,
    Typography,
  } from "@mui/material";
  import { useState, useRef, useEffect } from "react";
  import WebViewer from "@pdftron/webviewer";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { selectUser } from "../../redux/userSlice";
  import 'gestalt/dist/gestalt.css';
  import { Button } from 'gestalt';
import { selectSign } from "../../redux/signSlice";

  
  export const SignContract = () => {
  const [instance, setInstance] = useState(null)
  const navigate =  useNavigate()
  const [annotationManager, setAnnotationManager] = useState(null);
  const [annotPosition, setAnnotPosition] = useState(0);

  const user = useSelector(selectUser);
  const { email } = "user@gmail.com";

  const viewer = useRef(null);

  const docId = useSelector(selectSign)

  useEffect(() => {
    WebViewer(
      {
        path: 'webviewer',
        disabledElements: [
          'ribbons',
          'toggleNotesButton',
          'searchButton',
          'menuButton',
          'rubberStampToolGroupButton',
          'stampToolGroupButton',
          'fileAttachmentToolGroupButton',
          'calloutToolGroupButton',
          'undo',
          'redo',
          'eraserToolButton'
        ],
      },
      viewer.current,
    ).then(async instance => {
      setInstance(instance)
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      setAnnotationManager(annotationManager);

      // select only the insert group
      instance.UI.setToolbarGroup('toolbarGroup-Insert');

      // load document
      fetch(`http://localhost:8080/api/contract/file?id=${docId.id}`, {
            method: "GET",
            headers: {
            //   Authorization: "Bearer " + mainUser.token,
            },
          })
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => {
              const blob = new Blob([arrayBuffer], { type: "application/pdf" });

              instance.UI.loadDocument(blob)
            });

      const normalStyles = (widget) => {
        if (widget instanceof Annotations.TextWidgetAnnotation) {
          return {
            'background-color': '#a5c7ff',
            color: 'white',
          };
        } else if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            border: '1px solid #a5c7ff',
          };
        }
      };

      annotationManager.on('annotationChanged', (annotations, action, { imported }) => {
        if (imported && action === 'add') {
          annotations.forEach(function(annot) {
            if (annot instanceof Annotations.WidgetAnnotation) {
              Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
              if (!annot.fieldName.startsWith(docId.email.split('@')[0])) {
                annot.Hidden = true;
                annot.Listable = false;
              }
            }
          });
        }
      });
    });
  }, []);

  const nextField = () => {
    let annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition+1]) {
        setAnnotPosition(annotPosition+1);
      }
    }
  }

  const prevField = () => {
    let annots = annotationManager.getAnnotationsList();
    if (annots[annotPosition]) {
      annotationManager.jumpToAnnotation(annots[annotPosition]);
      if (annots[annotPosition-1]) {
        setAnnotPosition(annotPosition-1);
      }
    }
  }

  const completeSigning = async () => {
    const { Annotations, documentViewer } = instance.Core;
    const annotationManager = documentViewer.getAnnotationManager();
    const doc = documentViewer.getDocument();
    const xfdfString = await annotationManager.exportAnnotations({
      widgets: true,
      fields: true,
    });
    const data = await doc.getFileData({ xfdfString });
    const arr = new Uint8Array(data);
    const newFile = new File([arr], "hello.pdf", { type: "application/pdf" });

    const formData = new FormData();
    formData.append("Id", docId.id);
    formData.append("File", newFile);


    fetch("http://localhost:8080/api/contract/update", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token'),
      },
    });
    navigate('/v1/inbox');
  }
  
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "260px",
            bgcolor: "#fff",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ paddingX: "10px", paddingTop: "20px" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Sign Contract
            </Typography>
            <Box padding={2}>
                  <Button
                    onClick={nextField}
                    accessibilityLabel="next field"
                    text="Next field"
                    iconEnd="arrow-forward"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={prevField}
                    accessibilityLabel="Previous field"
                    text="Previous field"
                    iconEnd="arrow-back"
                  />
                </Box>
                <Box padding={2}>
                  <Button
                    onClick={completeSigning}
                    accessibilityLabel="complete signing"
                    text="Complete signing"
                    iconEnd="compose"
                  />
                </Box>
            
          </Box>
  
        </Box>
  
        <Box flex={1} ref={viewer}></Box>
      </Box>
    );
  };
  