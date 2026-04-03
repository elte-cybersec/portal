import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  List,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactInfoItem from "./ContactInfoItem";
import { contactPageData } from "../../../data/contactPageData";

interface ContactInfoCardProps {
  expanded: boolean;
  onToggle: () => void;
}

const cardSx = {
  bgcolor: "background.paper",
  color: "text.primary",
  border: 1,
  borderColor: "divider",
  borderRadius: 2.5,
};

export default function ContactInfoCard({
  expanded,
  onToggle,
}: ContactInfoCardProps) {
  return (
    <Card elevation={0} sx={cardSx}>
      <CardHeader
        title="Contact"
        subheader="Reach out for questions, collaboration, or general inquiries."
        slotProps={{
          title: {
            sx: {
              color: "primary.main",
              fontWeight: 700,
              fontSize: { xs: "1.35rem", md: "1.55rem" },
            },
          },
          subheader: {
            sx: {
              color: "text.secondary",
              fontSize: { xs: "0.92rem", md: "0.96rem" },
              lineHeight: 1.5,
            },
          },
        }}
        sx={{
          pb: 0,
          px: { xs: 2, md: 2.5 },
          pt: { xs: 2, md: 2.25 },
        }}
      />

      <CardContent sx={{ px: { xs: 2, md: 2.5 }, py: 1.25 }}>
        <List dense sx={{ py: 0 }}>
          {contactPageData.email && (
            <ContactInfoItem
              icon={<EmailIcon color="primary" fontSize="small" />}
              href={`mailto:${contactPageData.email}`}
              value={contactPageData.email}
              label="Email"
            />
          )}

          {contactPageData.phone && (
            <ContactInfoItem
              icon={<PhoneIcon color="primary" fontSize="small" />}
              href={`tel:${contactPageData.phone}`}
              value={contactPageData.phone}
              label="Phone"
            />
          )}
        </List>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "flex-end",
          pt: 0,
          px: { xs: 1.5, md: 2 },
          pb: { xs: 1.5, md: 2 },
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mr: 0.5, fontSize: "0.85rem" }}
        >
          {expanded ? "Hide form" : "Open form"}
        </Typography>

        <IconButton
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label="toggle contact form"
          color="primary"
          size="small"
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
  );
}