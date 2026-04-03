import { Alert, Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { DecryptCandidate } from "../utills/ancientCipher";

interface DecryptResultPanelProps {
  decryptText: string;
  results: DecryptCandidate[];
}

export default function DecryptResultPanel({
  decryptText,
  results,
}: DecryptResultPanelProps) {
  const bestResult = results.length > 0 ? results[0] : null;

  return (
    <Card sx={{ minHeight: "100%" }}>
      <CardContent>
        <Stack spacing={1.25}>
          <Typography fontWeight={700}>Result</Typography>

          {bestResult ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Decrypted with{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {bestResult.type === "caesar" ? "Caesar" : "Vigenère"}
                </Box>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Key used:{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {bestResult.key}
                </Box>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                English score:{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {bestResult.score.toFixed(1)}%
                </Box>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Matched:{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {bestResult.matchedCount}/{bestResult.totalWords}
                </Box>
              </Typography>

              <TextField
                label="Decrypted text"
                multiline
                minRows={3}
                fullWidth
                value={bestResult.output}
                InputProps={{ readOnly: true }}
              />

              <Typography variant="body2" color="text.secondary">
                Matched words:{" "}
                {bestResult.matchedWords.length > 0
                  ? bestResult.matchedWords.join(", ")
                  : "none"}
              </Typography>
            </>
          ) : decryptText.trim() ? (
            <Alert severity="warning">
              No candidate result was produced. Check the ciphertext or provide a valid key.
            </Alert>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Enter ciphertext and optionally a key to test decryption.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}