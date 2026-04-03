import { Box, Typography } from "@mui/material";

export default function AncientCiphersHeader() {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: 26, md: 30 },
          fontWeight: 700,
          lineHeight: 1.15,
          color: "primary.main",
          mb: 0.5,
        }}
      >
        Ancient Ciphers
      </Typography>

      <Typography sx={{ color: "text.secondary", fontSize: 13.5 }}>
        Encrypt with Caesar or Vigenère. Decrypt with a provided key, or brute-force
        Caesar automatically.
      </Typography>
    </Box>
  );
}