import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { PublicationFilter } from "../../../utils/publications";

interface PublicationFiltersProps {
  selectedFilter: PublicationFilter;
  searchText: string;
  year: string;
  activeTags: string[];
  selectedAuthor: string | null;
  authorOptions: string[];
  onFilterChange: (filter: PublicationFilter) => void;
  onSearchTextChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onRemoveTag: (tag: string) => void;
  onAuthorChange: (author: string | null) => void;
  onClearAll: () => void;
}

const FILTERS: { value: PublicationFilter; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "conference", label: "CONFERENCE" },
  { value: "journal", label: "JOURNAL" },
  { value: "book-chapter", label: "BOOK CHAPTER" },
];

export default function PublicationFilters({
  selectedFilter,
  searchText,
  year,
  activeTags,
  selectedAuthor,
  authorOptions,
  onFilterChange,
  onSearchTextChange,
  onYearChange,
  onRemoveTag,
  onAuthorChange,
  onClearAll,
}: PublicationFiltersProps) {
  const activeCount = activeTags.length + (selectedAuthor ? 1 : 0);
  const showClearAll = activeCount >= 2;

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {FILTERS.map((filter) => {
          const active = selectedFilter === filter.value;
          return (
            <Button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              variant="outlined"
              sx={(theme) => ({
                minHeight: 32,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                fontWeight: 600,
                borderWidth: "0.5px",
                borderColor: active
                  ? theme.palette.primary.main
                  : theme.palette.divider,
                backgroundColor: active
                  ? theme.palette.mode === "dark"
                    ? "rgba(16,174,180,0.10)"
                    : "rgba(63,199,205,0.10)"
                  : "transparent",
                color: active
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                "&:hover": {
                  borderWidth: "0.5px",
                  borderColor: theme.palette.primary.main,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.05)",
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                },
              })}
            >
              {filter.label}
            </Button>
          );
        })}
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <TextField
          fullWidth
          size="small"
          label="Search title"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          sx={(theme) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              fontSize: 13,
              backgroundColor: "background.paper",
              color: "text.primary",
              "& fieldset": {
                borderColor: theme.palette.divider,
                borderWidth: "0.5px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.secondary",
              fontSize: 13,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          })}
        />

        <TextField
          size="small"
          type="number"
          label="Year"
          value={year}
          onChange={(event) =>
            onYearChange(event.target.value.replace(/\D/g, "").slice(0, 4))
          }
          sx={(theme) => ({
            width: { xs: "100%", sm: 120 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              fontSize: 13,
              backgroundColor: "background.paper",
              color: "text.primary",
              "& fieldset": {
                borderColor: theme.palette.divider,
                borderWidth: "0.5px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
              },
            },
            "& .MuiInputLabel-root": {
              color: "text.secondary",
              fontSize: 13,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          })}
        />

        <Autocomplete
          size="small"
          value={selectedAuthor}
          onChange={(_, newValue) => onAuthorChange(newValue)}
          options={authorOptions}
          sx={{ width: { xs: "100%", sm: 240 } }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Author"
              sx={(theme) => ({
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  fontSize: 13,
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                    borderWidth: "0.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 1,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "text.secondary",
                  fontSize: 13,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "primary.main",
                },
              })}
            />
          )}
        />
      </Stack>

      {activeCount > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            pt: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              color: "text.secondary",
              mr: 0.5,
            }}
          >
            ACTIVE:
          </Typography>

          {selectedAuthor && (
            <Chip
              label={selectedAuthor}
              size="small"
              onDelete={() => onAuthorChange(null)}
              deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
              sx={(theme) => ({
                height: 24,
                borderRadius: 10,
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.03em",
                fontWeight: 600,
                color: theme.palette.primary.main,
                border: "0.5px solid",
                borderColor: theme.palette.primary.main,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(16,174,180,0.12)"
                    : "rgba(63,199,205,0.12)",
                "& .MuiChip-label": { px: 1 },
                "& .MuiChip-deleteIcon": {
                  color: theme.palette.primary.main,
                  mr: 0.5,
                  "&:hover": {
                    color: theme.palette.text.primary,
                  },
                },
              })}
            />
          )}

          {activeTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => onRemoveTag(tag)}
              deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
              sx={(theme) => ({
                height: 24,
                borderRadius: 10,
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.03em",
                color: theme.palette.primary.main,
                border: "0.5px solid",
                borderColor: theme.palette.primary.main,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(16,174,180,0.12)"
                    : "rgba(63,199,205,0.12)",
                "& .MuiChip-label": { px: 1 },
                "& .MuiChip-deleteIcon": {
                  color: theme.palette.primary.main,
                  mr: 0.5,
                  "&:hover": {
                    color: theme.palette.text.primary,
                  },
                },
              })}
            />
          ))}

          {showClearAll && (
            <Button
              onClick={onClearAll}
              size="small"
              sx={(theme) => ({
                minHeight: 24,
                height: 24,
                px: 1,
                borderRadius: 10,
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                fontWeight: 600,
                color: theme.palette.text.secondary,
                textTransform: "none",
                "&:hover": {
                  color: theme.palette.error.main,
                  backgroundColor: "transparent",
                },
              })}
            >
              CLEAR ALL
            </Button>
          )}
        </Box>
      )}
    </Stack>
  );
}