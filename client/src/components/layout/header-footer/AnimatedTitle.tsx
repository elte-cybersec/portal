import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface AnimatedTitleProps {
  title: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function makeEncryptedChars(target: string) {
  return target.split("").map((char) => (char === " " ? " " : randomChar()));
}

export default function AnimatedTitle({ title }: AnimatedTitleProps) {
  const chars = React.useMemo(() => title.split(""), [title]);

  const highlightedIndexes = React.useMemo(() => {
    const result = new Set<number>();
    let highlightNext = true;

    chars.forEach((char, index) => {
      if (char === " ") {
        highlightNext = true;
        return;
      }

      if (highlightNext) {
        result.add(index);
        highlightNext = false;
      }
    });

    return result;
  }, [chars]);

  const [displayChars, setDisplayChars] = React.useState<string[]>(() =>
    makeEncryptedChars(title)
  );

  React.useEffect(() => {
    let frame = 0;

    const intervalId = window.setInterval(() => {
      setDisplayChars(
        chars.map((char, index) => {
          if (char === " ") return " ";

          const revealPoint = index * 4;
          return frame >= revealPoint ? char : randomChar();
        })
      );

      frame += 1;

      if (frame > chars.length * 4) {
        clearInterval(intervalId);
        setDisplayChars(chars);
      }
    }, 75);

    return () => clearInterval(intervalId);
  }, [chars]);

  return (
    <Box
      component={RouterLink}
      to="/"
      sx={(theme) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2, md: 2.5 },
        py: { xs: 1.25, md: 1.25 },
        my: 2.5,
        textDecoration: "none",
        border: `5px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        overflow: "hidden",
        minHeight: { xs: 58, sm: 66, md: 74 },
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(17, 45, 82, 0.10)"
            : "rgba(17, 45, 82, 0.06)",
        transition: "all 0.25s ease",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(17, 45, 82, 0.16)"
              : "rgba(17, 45, 82, 0.10)",
          borderColor: theme.palette.primary.light,
        },
      })}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {displayChars.map((char, index) => {
          const isSpace = chars[index] === " ";
          const highlightCell = highlightedIndexes.has(index) && !isSpace;

          return (
            <Box
              key={index}
              sx={(theme) => ({
                minWidth: { xs: "0.9ch", sm: "1ch", md: "1.05ch" },
                px: { xs: 0.08, sm: 0.12, md: 0.16 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderLeft:
                  index === 0
                    ? "none"
                    : `1px solid ${theme.palette.divider}`,
                backgroundColor: highlightCell
                  ? theme.palette.primary.main
                  : "transparent",
                transition: "background-color 0.25s ease",
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontFamily: '"Roboto Condensed", "Roboto", sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: "1.35rem", sm: "1.9rem", md: "2.8rem" },
                  lineHeight: 1,
                  letterSpacing: 0,
                  color: isSpace
                    ? "transparent"
                    : highlightCell
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  textAlign: "center",
                  userSelect: "none",
                  transition: "color 0.25s ease",
                })}
              >
                {isSpace ? "M" : char}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}