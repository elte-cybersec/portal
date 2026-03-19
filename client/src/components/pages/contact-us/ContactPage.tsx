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
import { contactPageData  } from "../../../data/contactPageData";

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
  const [expanded, setExpanded] = React.useState<boolean>(contactPageData.showForm ?? false);

  const toggle = () => setExpanded((x) => !x);

  const handleSubmit = (values: ContactFormValues) => {
    console.log("Contact form submitted:", values);

    // Future:
    // send POST request to backend here

    setExpanded(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Card
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            border: 1,
            borderColor: "divider",
          }}
        >
          <CardHeader
            title="Contact"
            subheader="Reach out to ELTE Cybersecurity for questions, collaboration, or general inquiries."
            slotProps={{
              title: {
                sx: {
                  color: "primary.main",
                  fontWeight: 700,
                },
              },
              subheader: {
                sx: {
                  color: "text.secondary",
                },
              },
            }}
            sx={{ pb: 0 }}
          />

          <CardContent>
            <List dense>
              {contactPageData.email && (
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href={`mailto:${contactPageData.email}`} underline="none" sx={linkSx}>
                        {contactPageData.email}
                      </Link>
                    }
                    secondary="Email"
                  />
                </ListItem>
              )}

              {contactPageData.phone && (
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link href={`tel:${contactPageData.phone}`} underline="none" sx={linkSx}>
                        {contactPageData.phone}
                      </Link>
                    }
                    secondary="Phone"
                  />
                </ListItem>
              )}
            </List>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", pt: 0, px: 2, pb: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }} color="text.secondary">
              {expanded ? "Hide form" : "Open contact form"}
            </Typography>
            <IconButton
              onClick={toggle}
              aria-expanded={expanded}
              aria-label="toggle contact form"
              color="primary"
            >
              <ExpandMoreIcon
                sx={{
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
            }}
          >
            <CardHeader
              title="Send a message"
              slotProps={{
                title: {
                  sx: {
                    color: "primary.main",
                    fontWeight: 700,
                  },
                },
              }}
              sx={{ pb: 0 }}
            />

            <CardContent sx={{ pt: 2 }}>
              <ContactForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </Collapse>
      </Box>
    </Container>
  );
}