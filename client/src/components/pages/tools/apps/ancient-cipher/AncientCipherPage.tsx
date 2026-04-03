import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";

import {
  decryptAncient,
  encryptAncient,
  type AncientCipherType,
  type DecryptCandidate,
  type EncryptResult,
} from "./utills/ancientCipher";
import AncientCiphersHeader from "./AncientCipherHeader";
import AncientCiphersTabs from "./AncientCipherTabs";
import DecryptPanel from "./decrypt/DecryptPanel";
import DecryptResultPanel from "./decrypt/DecryptResultPanel";
import EncryptPanel from "./encrypt/EncryptPanel";
import EncryptResultPanel from "./encrypt/EncryptResultPanel";

export default function AncientCiphersPage() {
  const [tab, setTab] = useState(0);

  const [encryptText, setEncryptText] = useState("");
  const [encryptType, setEncryptType] = useState<AncientCipherType>("caesar");
  const [encryptResult, setEncryptResult] = useState<EncryptResult | null>(null);

  const [decryptText, setDecryptText] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [decryptResults, setDecryptResults] = useState<DecryptCandidate[]>([]);

  const handleEncrypt = () => {
    const input = encryptText.trim();
    if (!input) {
      setEncryptResult(null);
      return;
    }

    setEncryptResult(encryptAncient(input, encryptType));
  };

  const handleDecrypt = () => {
    const input = decryptText.trim();
    if (!input) {
      setDecryptResults([]);
      return;
    }

    setDecryptResults(decryptAncient(input, decryptKey));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <AncientCiphersHeader />
        <AncientCiphersTabs value={tab} onChange={setTab} />

        {tab === 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
            <EncryptPanel
              encryptText={encryptText}
              encryptType={encryptType}
              onTextChange={setEncryptText}
              onTypeChange={setEncryptType}
              onEncrypt={handleEncrypt}
            />
            <EncryptResultPanel result={encryptResult} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
            <DecryptPanel
              decryptText={decryptText}
              decryptKey={decryptKey}
              onTextChange={setDecryptText}
              onKeyChange={setDecryptKey}
              onDecrypt={handleDecrypt}
            />
            <DecryptResultPanel decryptText={decryptText} results={decryptResults} />
          </Box>
        )}
      </Stack>
    </Container>
  );
}