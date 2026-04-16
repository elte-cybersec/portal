import { Button, Stack, TextField } from "@mui/material";
import type { PublicationFilter } from "../../../utils/publications";

interface PublicationFiltersProps {
  selectedFilter: PublicationFilter;
  searchText: string;
  year: string;
  onFilterChange: (filter: PublicationFilter) => void;
  onSearchTextChange: (value: string) => void;
  onYearChange: (value: string) => void;
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
  onFilterChange,
  onSearchTextChange,
  onYearChange,
}: PublicationFiltersProps) {
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
            width: { xs: "100%", sm: 140 },
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
      </Stack>
    </Stack>
  );
}