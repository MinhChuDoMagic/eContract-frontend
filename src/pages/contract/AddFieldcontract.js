import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SendIcon from "@mui/icons-material/Send";
import WebViewer from "@pdftron/webviewer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetContract, selectContract } from "../../redux/cotractSlice";

export const AddFieldContract = () => {
  const dispatch =  useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [dropPoint, setDropPoint] = useState(null);

  const contract = useSelector(selectContract);
  const recipients = contract.recipients;
  const message = contract.message;

  // const signer = recipients.filter(obj => obj.role === 0);
  const signer = [
    { email: "email1@example.com", name: "Name 1", role: 0 },
    { email: "email3@example.com", name: "Name 3", role: 0 },
    { email: "email5@example.com", name: "Name 5", role: 0 },
    { email: "email7@example.com", name: "Name 7", role: 0 },
  ];
  const file = contract.file;

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    WebViewer(
      {
        path: "webviewer",
        disabledElements: [
          // "ribbons",
          // "toggleNotesButton",
          // "searchButton",
          // "menuButton",
        ],
      },
      viewer.current
    ).then((instance) => {
      const { iframeWindow } = instance;

      // select only the view group
      instance.UI.setToolbarGroup("toolbarGroup-View");

      setInstance(instance);

      const iframeDoc = iframeWindow.document.body;
      iframeDoc.addEventListener("dragover", dragOver);
      iframeDoc.addEventListener("drop", (e) => {
        drop(e, instance);
      });

      if (file) {
        instance.UI.loadDocument(file);
      }
    });
  }, []);

  const dragOver = (e) => {
    e.preventDefault();
    return false;
  };

  const drop = (e, instance) => {
    const { docViewer } = instance;
    const scrollElement = docViewer.getScrollViewElement();
    const scrollLeft = scrollElement.scrollLeft || 0;
    const scrollTop = scrollElement.scrollTop || 0;
    setDropPoint({ x: e.pageX + scrollLeft, y: e.pageY + scrollTop });
    e.preventDefault();
    return false;
  };

  const addField = (type, point = {}, name = "", value = "", flag = {}) => {
    const { documentViewer, Annotations } = instance.Core;
    const annotationManager = documentViewer.getAnnotationManager();
    const doc = documentViewer.getDocument();
    const displayMode = documentViewer.getDisplayModeManager().getDisplayMode();
    const page = displayMode.getSelectedPages(point, point);
    if (!!point.x && page.first == null) {
      return; //don't add field to an invalid page location
    }
    const page_idx =
      page.first !== null ? page.first : documentViewer.getCurrentPage();
    const page_info = doc.getPageInfo(page_idx);
    const page_point = displayMode.windowToPage(point, page_idx);
    const zoom = documentViewer.getZoom();

    var textAnnot = new Annotations.FreeTextAnnotation();
    textAnnot.PageNumber = page_idx;
    const rotation = documentViewer.getCompleteRotation(page_idx) * 90;
    textAnnot.Rotation = rotation;
    if (rotation === 270 || rotation === 90) {
      textAnnot.Width = 50.0 / zoom;
      textAnnot.Height = 250.0 / zoom;
    } else {
      textAnnot.Width = 250.0 / zoom;
      textAnnot.Height = 50.0 / zoom;
    }
    textAnnot.X = (page_point.x || page_info.width / 2) - textAnnot.Width / 2;
    textAnnot.Y = (page_point.y || page_info.height / 2) - textAnnot.Height / 2;

    textAnnot.setPadding(new Annotations.Rect(0, 0, 0, 0));
    textAnnot.custom = {
      type,
      value,
      flag,
      name: `${signer[user].name}_${type}_`,
    };

    // set the type of annot
    textAnnot.setContents(textAnnot.custom.name);
    textAnnot.FontSize = "" + 20.0 / zoom + "px";
    textAnnot.FillColor = new Annotations.Color(211, 211, 211, 0.5);
    textAnnot.TextColor = new Annotations.Color(0, 165, 228);
    textAnnot.StrokeThickness = 1;
    textAnnot.StrokeColor = new Annotations.Color(0, 165, 228);
    textAnnot.TextAlign = "center";

    textAnnot.Author = annotationManager.getCurrentUser();

    annotationManager.deselectAllAnnotations();
    annotationManager.addAnnotation(textAnnot, true);
    annotationManager.redrawAnnotation(textAnnot);
    annotationManager.selectAnnotation(textAnnot);
  };

  const applyFields = async () => {
    const { Annotations, documentViewer } = instance.Core;
    const annotationManager = documentViewer.getAnnotationManager();
    const fieldManager = annotationManager.getFieldManager();
    const annotationsList = annotationManager.getAnnotationsList();
    const annotsToDelete = [];
    const annotsToDraw = [];

    await Promise.all(
      annotationsList.map(async (annot, index) => {
        let inputAnnot;
        let field;

        if (typeof annot.custom !== 'undefined') {
          // create a form field based on the type of annotation
          if (annot.custom.type === 'TEXT') {
            field = new Annotations.Forms.Field(
              annot.getContents() + Date.now() + index,
              {
                type: 'Tx',
                value: annot.custom.value,
              },
            );
            inputAnnot = new Annotations.TextWidgetAnnotation(field);
          } else if (annot.custom.type === 'SIGNATURE') {
            field = new Annotations.Forms.Field(
              annot.getContents() + Date.now() + index,
              {
                type: 'Sig',
              },
            );
            inputAnnot = new Annotations.SignatureWidgetAnnotation(field, {
              appearance: '_DEFAULT',
              appearances: {
                _DEFAULT: {
                  Normal: {
                    data:
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
                    offset: {
                      x: 100,
                      y: 100,
                    },
                  },
                },
              },
            });
          } else if (annot.custom.type === 'DATE') {
            field = new Annotations.Forms.Field(
              annot.getContents() + Date.now() + index,
              {
                type: 'Tx',
                value: 'm-d-yyyy',
                // Actions need to be added for DatePickerWidgetAnnotation to recognize this field.
                actions: {
                  F: [
                    {
                      name: 'JavaScript',
                      // You can customize the date format here between the two double-quotation marks
                      // or leave this blank to use the default format
                      javascript: 'AFDate_FormatEx("mmm d, yyyy");',
                    },
                  ],
                  K: [
                    {
                      name: 'JavaScript',
                      // You can customize the date format here between the two double-quotation marks
                      // or leave this blank to use the default format
                      javascript: 'AFDate_FormatEx("mmm d, yyyy");',
                    },
                  ],
                },
              },
            );
  
            inputAnnot = new Annotations.DatePickerWidgetAnnotation(field);
          } else {
            // exit early for other annotations
            annotationManager.deleteAnnotation(annot, false, true); // prevent duplicates when importing xfdf
            return;
          }
        } else {
          // exit early for other annotations
          return;
        }

        // set position
        inputAnnot.PageNumber = annot.getPageNumber();
        inputAnnot.X = annot.getX();
        inputAnnot.Y = annot.getY();
        inputAnnot.rotation = annot.Rotation;
        if (annot.Rotation === 0 || annot.Rotation === 180) {
          inputAnnot.Width = annot.getWidth();
          inputAnnot.Height = annot.getHeight();
        } else {
          inputAnnot.Width = annot.getHeight();
          inputAnnot.Height = annot.getWidth();
        }

        // delete original annotation
        annotsToDelete.push(annot);

        // customize styles of the form field
        Annotations.WidgetAnnotation.getCustomStyles = function (widget) {
          if (widget instanceof Annotations.SignatureWidgetAnnotation) {
            return {
              border: '1px solid #a5c7ff',
            };
          }
        };
        Annotations.WidgetAnnotation.getCustomStyles(inputAnnot);

        // draw the annotation the viewer
        annotationManager.addAnnotation(inputAnnot);
        fieldManager.addField(field);
        annotsToDraw.push(inputAnnot);
      }),
    );

    // delete old annotations
    annotationManager.deleteAnnotations(annotsToDelete, null, true);

    // refresh viewer
    await annotationManager.drawAnnotationsFromList(annotsToDraw);
    await uploadForSigning();
  };

  const uploadForSigning = async () => {
    // upload the PDF with fields as AcroForm
    // const storageRef = storage.ref();
    // const referenceString = `docToSign/${uid}${Date.now()}.pdf`;
    // const docRef = storageRef.child(referenceString);
    const { docViewer, annotManager } = instance;
    const doc = docViewer.getDocument();
    const xfdfString = await annotManager.exportAnnotations({ widgets: true, fields: true });
    const data = await doc.getFileData({ xfdfString });
    const arr = new Uint8Array(data);
    const file = new File([arr], 'hello.pdf' , { type: 'application/pdf' });
    // docRef.put(blob).then(function (snapshot) {
    //   console.log('Uploaded the blob');
    // });

    // // create an entry in the database
    // const emails = assignees.map(assignee => {
    //   return assignee.email;
    // });
    // await addDocumentToSign(uid, email, referenceString, emails);
    dispatch(resetContract());
    navigate('/');
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
        <Box sx={{ paddingX: "10px", paddingTop: "10px" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Prepare Document
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Adding signature for
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Recipient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="Recipient"
              onChange={handleChange}
            >
              {signer.map((comp, index) => (
                <MenuItem key={index} value={index}>
                  {comp.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

         
            <Button
              variant="contained"
              endIcon={<DriveFileRenameOutlineIcon />}
              sx={{ marginTop: "10px" }}
              onClick={() => addField("SIGNATURE")}
            >
              Add signature
            </Button>
         
        </Box>

        <Button
          variant="outlined"
          sx={{ borderRadius: 0 }}
          fullWidth
          endIcon={<SendIcon />}
          onClick={applyFields}
        >
          Send
        </Button>
      </Box>

      <Box flex={1} ref={viewer}></Box>
    </Box>
  );
};
