import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Container,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactForm, { type ContactFormValues } from "./ContactForm";
import { contactPageData } from "../../../data/contactPageData";

const linkSx = (theme: Theme) => ({
  color: "primary.main",
  fontWeight: 500,
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  },
});

export default function ContactPage() {
  const [expanded, setExpanded] = React.useState<boolean>(
    contactPageData.showForm ?? false
  );

  const toggle = () => setExpanded((x) => !x);

  const handleSubmit = (values: ContactFormValues) => {
    console.log("Contact form submitted:", values);
    setExpanded(false);
  };

  return (
    <Container maxWidth="xs" sx={{ py: { xs: 1.5, md: 2 } }}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Card
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <CardHeader
            title="Contact"
            subheader="Reach out for questions, collaboration, or general inquiries."
            slotProps={{
              title: {
                sx: {
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                },
              },
              subheader: {
                sx: {
                  color: "text.secondary",
                  fontSize: { xs: "0.82rem", md: "0.86rem" },
                  lineHeight: 1.4,
                },
              },
            }}
            sx={{
              pb: 0,
              px: 1.5,
              pt: 1.5,
            }}
          />

          <CardContent sx={{ px: 1.5, py: 0.75 }}>
            <List dense sx={{ py: 0 }}>
              {contactPageData.email && (
                <ListItem disableGutters sx={{ py: 0.15 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <EmailIcon color="primary" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link
                        href={`mailto:${contactPageData.email}`}
                        underline="none"
                        sx={linkSx}
                      >
                        {contactPageData.email}
                      </Link>
                    }
                    secondary="Email"
                    slotProps={{
                      primary: {
                        sx: { fontSize: "0.86rem", lineHeight: 1.2 },
                      },
                      secondary: {
                        sx: { fontSize: "0.74rem", lineHeight: 1.2 },
                      },
                    }}
                  />
                </ListItem>
              )}

              {contactPageData.phone && (
                <ListItem disableGutters sx={{ py: 0.15 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <PhoneIcon color="primary" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link
                        href={`tel:${contactPageData.phone}`}
                        underline="none"
                        sx={linkSx}
                      >
                        {contactPageData.phone}
                      </Link>
                    }
                    secondary="Phone"
                    slotProps={{
                      primary: {
                        sx: { fontSize: "0.86rem", lineHeight: 1.2 },
                      },
                      secondary: {
                        sx: { fontSize: "0.74rem", lineHeight: 1.2 },
                      },
                    }}
                  />
                </ListItem>
              )}
            </List>
          </CardContent>

          <CardActions
            sx={{
              justifyContent: "flex-end",
              pt: 0,
              px: 1.25,
              pb: 1.25,
            }}
          >
            <Typography
              variant="body2"
              sx={{ mr: 0.35, fontSize: "0.78rem" }}
              color="text.secondary"
            >
              {expanded ? "Hide form" : "Open form"}
            </Typography>
            <IconButton
              onClick={toggle}
              aria-expanded={expanded}
              aria-label="toggle contact form"
              color="primary"
              size="small"
              sx={{ p: 0.5 }}
            >
              <ExpandMoreIcon
                sx={{
                  fontSize: 18,
                  transition: "transform 150ms ease",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </IconButton>
          </CardActions>
        </Card>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Card
            elevation={0}
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <CardHeader
              title="Send a message"
              slotProps={{
                title: {
                  sx: {
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                  },
                },
              }}
              sx={{
                pb: 0,
                px: 1.5,
                pt: 1.5,
              }}
            />

            <CardContent sx={{ pt: 1, px: 1.5, pb: 1.5 }}>
              <ContactForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </Collapse>
      </Box>
    </Container>
  );
}