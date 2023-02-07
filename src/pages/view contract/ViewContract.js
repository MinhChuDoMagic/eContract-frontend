import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "gestalt";
import WebViewer from "@pdftron/webviewer";
import "gestalt/dist/gestalt.css";
import { Box, Typography } from "@mui/material";
import { selectUser } from "../../redux/userSlice";
import { selectRead } from "../../redux/readSlice";

export const ViewContract = () => {
  const [instance, setInstance] = useState(null);
  const viewer = useRef(null);
  const navigate = useNavigate();
  const mainUser = useSelector(selectUser);

  const docId = useSelector(selectRead);

  useEffect(() => {
    if (!instance) {
      WebViewer(
        {
          path: "webviewer",
          disabledElements: [
            "ribbons",
            "toggleNotesButton",
            "contextMenuPopup",
          ],
        },
        viewer.current
      ).then((instance) => {
        // select only the view group
        instance.UI.setToolbarGroup("toolbarGroup-View");
        console.log("hello");
        setInstance(instance);

        const { documentViewer, annotationManager, Annotations } =
          instance.Core;

        // load document
        fetch(`http://localhost:8080/api/contract/file?id=${docId}`, {
          method: "GET",
          headers: {
            //   Authorization: "Bearer " + mainUser.token,
          },
        })
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => {
            const blob = new Blob([arrayBuffer], { type: "application/pdf" });

            instance.UI.loadDocument(blob);
          });

        annotationManager.on(
          "annotationChanged",
          (annotations, action, { imported }) => {
            if (imported && action === "add") {
              annotations.forEach(function (annot) {
                if (annot instanceof Annotations.WidgetAnnotation) {
                  annot.Hidden = true;
                  annot.Listable = false;
                }
              });
            }
          }
        );
      });
    }
  }, []);

  const download = () => {
    instance.UI.downloadPdf(true);
  };

  const doneViewing = () => {
    navigate("/v1/inbox");
  };

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
            View Document
          </Typography>

          <Box style={{ paddingBottom: "10px" }}>
            <Button
              onClick={download}
              accessibilityLabel="download signed document"
              text="Download"
              iconEnd="download"
            />
          </Box>

          <Button
            onClick={doneViewing}
            accessibilityLabel="complete signing"
            text="Done viewing"
            iconEnd="check"
          />
        </Box>
      </Box>

      <Box flex={1} ref={viewer} />
    </Box>
  );
};
