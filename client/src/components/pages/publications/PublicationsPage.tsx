import { useEffect, useMemo, useState } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";

import { publicationsData } from "../../../data/publicationsData";
import {
  searchPublications,
  sortPublications,
  type PublicationFilter,
} from "../../../utils/publications";

import PublicationArchiveItem from "./PublicationArchiveItem";
import PublicationEmptyState from "./PublicationEmptyState";
import PublicationFilters from "./PublicationFilters";

const ITEMS_PER_PAGE = 7;

export default function PublicationsPage() {
  const [selectedFilter, setSelectedFilter] = useState<PublicationFilter>("all");
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const sortedItems = useMemo(() => sortPublications(publicationsData), []);

  const filteredItems = useMemo(
    () =>
      searchPublications(sortedItems, {
        type: selectedFilter,
        searchText,
        year,
      }),
    [selectedFilter, searchText, year, sortedItems]
  );

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  useEffect(() => {
    setPage(1);
    setExpandedId(null);
  }, [selectedFilter, searchText, year]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ mb: 3 }}>

        <Typography
          sx={{
            fontSize: { xs: 28, md: 34 },
            fontWeight: 600,
            lineHeight: 1.15,
            color: "primary.main",
            mb: 0.5,
          }}
        >
          PUBLICATION ARCHIVE
        </Typography>

        <Typography
            sx={{
                fontSize: 13,
                fontFamily: "monospace",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
            }}
            >
            <Box
                component="span"
                sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#1D9E75",
                display: "inline-block",
                flexShrink: 0,
                }}
            />
            [CLEARANCE: PUBLIC] -{" "}
            <Box
                component="span"
                sx={{
                color: "#1D9E75",
                fontWeight: 700,
                }}
            >
                {filteredItems.length}
            </Box>{" "}
            record{filteredItems.length === 1 ? "" : "s"} indexed
            </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <PublicationFilters
          selectedFilter={selectedFilter}
          searchText={searchText}
          year={year}
          onFilterChange={(filter) => {
            setSelectedFilter(filter);
          }}
          onSearchTextChange={(value) => {
            setSearchText(value);
          }}
          onYearChange={(value) => {
            setYear(value);
          }}
        />
      </Box>

      <Box
        sx={{
          border: "0.5px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        {filteredItems.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <PublicationEmptyState />
          </Box>
        ) : (
          paginatedItems.map((publication) => (
            <PublicationArchiveItem
              key={publication.id}
              publication={publication}
              expanded={expandedId === publication.id}
              onToggle={() => handleToggle(publication.id)}
            />
          ))
        )}
      </Box>

      {filteredItems.length > 0 && pageCount > 1 ? (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              setExpandedId(null);
            }}
            shape="rounded"
            color="primary"
            siblingCount={0}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 700,
              },
            }}
          />
        </Box>
      ) : null}
    </Container>
  );
}