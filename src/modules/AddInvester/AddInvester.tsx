import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useExtractFileText } from "../../services/Invester/useExtractFileText";
import { useSnackbar } from "../../components";
import { useAddInvester } from "../../services/Invester/useAddInvester";

export const AddInvester = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfContent, setPdfContent] = useState("");
  const [investerName, setInvesterName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setSnackbarConfig } = useSnackbar();

  // Handler for PDF file selection
  const handleFileChange = (e: any) => {
    setPdfFile(e.target.files[0]);
  };

  const { mutate: extractFileText } = useExtractFileText({
    onSuccess: (data) => {
      setPdfContent(data.data.data);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error fetching PDF content:", error);
      setSnackbarConfig({
        message: "Failed to retrieve PDF content.",
        open: true,
        severity: "error",
      });
      setLoading(false);
    },
  });

  const { mutate: addInvester } = useAddInvester({
    onSuccess: () => {
      setSnackbarConfig({
        message: "Invester Added.",
        open: true,
        severity: "success",
      });
      setLoading(false);
      setPdfContent("");
      setInvesterName("");
    },
    onError: (error) => {
      console.error("Error saving content:", error);
      setSnackbarConfig({
        message: "Failed to save content.",
        open: true,
        severity: "error",
      });

      setLoading(false);
    },
  });

  // Handler to fetch content from API
  const handleSubmit = async () => {
    if (!pdfFile) {
      setSnackbarConfig({
        message: "Please select a PDF file.",
        open: true,
        severity: "error",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", pdfFile);

    await extractFileText(formData);
  };

  // Handler to save content to the database
  const handleSave = async () => {
    if (!pdfContent || !investerName) {
      setSnackbarConfig({
        message: "Both fields are required",
        open: true,
        severity: "error",
      });
      return;
    }

    await addInvester({ content: pdfContent, name: investerName });
  };

  return (
    <Box style={{ width: "100%", height: "auto", padding: "20px" }}>
      <Box sx={{ width: "98%", mx: "auto" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ mb: 2 }}
        >
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            Add Invester
          </Typography>
        </Stack>

        <Box sx={{ maxWidth: 600, mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Upload and Display PDF Content
          </Typography>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ marginBottom: "16px" }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Submit"}
          </Button>

          <TextField
            label="Invester name"
            value={investerName}
            onChange={(e) => setInvesterName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            required
            label="PDF Content"
            multiline
            rows={10}
            value={pdfContent}
            onChange={(e) => setPdfContent(e.target.value)}
            fullWidth
            margin="normal"
          />

          {pdfContent && (
            <Button variant="contained" color="secondary" onClick={handleSave}>
              Add New Invester
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddInvester;
