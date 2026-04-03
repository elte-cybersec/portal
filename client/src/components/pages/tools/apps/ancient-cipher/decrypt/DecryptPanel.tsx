import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

interface DecryptPanelProps {
  decryptText: string;
  decryptKey: string;
  onTextChange: (value: string) => void;
  onKeyChange: (value: string) => void;
  onDecrypt: () => void;
}

export default function DecryptPanel({
  decryptText,
  decryptKey,
  onTextChange,
  onKeyChange,
  onDecrypt,
}: DecryptPanelProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography fontWeight={700}>Input</Typography>

          <TextField
            label="Ciphertext"
            multiline
            minRows={4}
            fullWidth
            value={decryptText}
            onChange={(event) => onTextChange(event.target.value)}
          />

          <TextField
            label="Key (optional)"
            fullWidth
            value={decryptKey}
            onChange={(event) => onKeyChange(event.target.value)}
            helperText="Leave empty to brute-force Caesar and guess Vigenère. Use a number for Caesar or a word for Vigenère."
          />

          <Box>
            <Button variant="contained" onClick={onDecrypt}>
              Try decrypt
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}