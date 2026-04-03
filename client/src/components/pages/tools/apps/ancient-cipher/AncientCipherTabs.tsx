import { Box, Tab, Tabs } from "@mui/material";

interface AncientCiphersTabsProps {
  value: number;
  onChange: (value: number) => void;
}

export default function AncientCiphersTabs({
  value,
  onChange,
}: AncientCiphersTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={(_, newValue: number) => onChange(newValue)} variant="fullWidth">
        <Tab label="Encrypt" />
        <Tab label="Decrypt" />
      </Tabs>
    </Box>
  );
}