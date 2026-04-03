import { Box, Typography } from "@mui/material";

export default function PublicationEmptyState() {
  return (
    <Box
      sx={{
        border: "0.5px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 600, color: "text.primary", mb: 0.5 }}>
        No records found
      </Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
        Try another filter or add more publications to the dataset.
      </Typography>
    </Box>
  );
}