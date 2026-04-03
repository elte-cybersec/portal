import { Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from "@mui/material";
import type { AncientCipherType } from "../utills/ancientCipher";

interface EncryptPanelProps {
  encryptText: string;
  encryptType: AncientCipherType;
  onTextChange: (value: string) => void;
  onTypeChange: (value: AncientCipherType) => void;
  onEncrypt: () => void;
}

export default function EncryptPanel({
  encryptText,
  encryptType,
  onTextChange,
  onTypeChange,
  onEncrypt,
}: EncryptPanelProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography fontWeight={700}>Input</Typography>

          <TextField
            label="Plaintext"
            multiline
            minRows={4}
            fullWidth
            value={encryptText}
            onChange={(event) => onTextChange(event.target.value)}
          />

          <TextField
            select
            label="Cipher"
            value={encryptType}
            onChange={(event) => onTypeChange(event.target.value as AncientCipherType)}
            sx={{ maxWidth: 220 }}
          >
            <MenuItem value="caesar">Caesar</MenuItem>
            <MenuItem value="vigenere">Vigenère</MenuItem>
          </TextField>

          <Box>
            <Button variant="contained" onClick={onEncrypt}>
              Encrypt with random key
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}