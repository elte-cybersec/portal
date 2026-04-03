import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { EncryptResult } from "../utills/ancientCipher";

interface EncryptResultPanelProps {
  result: EncryptResult | null;
}

export default function EncryptResultPanel({ result }: EncryptResultPanelProps) {
  return (
    <Card sx={{ minHeight: "100%" }}>
      <CardContent>
        <Stack spacing={1.25}>
          <Typography fontWeight={700}>Result</Typography>

          {result ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Method:{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {result.type === "caesar" ? "Caesar" : "Vigenère"}
                </Box>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Key:{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {result.key}
                </Box>
              </Typography>

              <TextField
                label="Encrypted text"
                multiline
                minRows={3}
                fullWidth
                value={result.output}
                InputProps={{ readOnly: true }}
              />
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Enter text and choose a cipher to generate an encrypted result.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}