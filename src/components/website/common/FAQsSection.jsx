import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const FAQsSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FAQ data
  const faqItems = [
    {
      id: "panel1",
      question: "What is Apna Card?",
      answer: "Apna Card empower individuals by providing a secure platform to manage personal records and share profiles effortlessly with a single tap.",
    },
    {
      id: "panel2",
      question: "How does it work?",
      answer:"Apna Card utilizes innovative technology to simplify contact sharing. Users can create a personalized digital profile that includes their name, photo, social media links, websites, and other relevant medical record information. This profile is stored securely on the web page."
    },
    {
      id: "panel3",
      question: "How do i share my Apna Card profile?",
      answer:"You can effortlessly share your contact information by tapping your Apna Card device against another compatible device. Alternatively, you can display a QR code that others can scan, providing instant access to your digital profile."
    },
    {
      id: "panel4",
      question: "Is Apna Card compatible with all devices?",
      answer:"Apna Card is designed to be compatible with a wide range of devices."
    },
    {
      id: "panel5",
      question: "Is Apna Card available globally?",
      answer:"Yes, Apna Card is accessible to users globally. Whether you are networking at a local event or connecting with international contacts, Apna Card provides a seamless solution for sharing your contact information, regardless of your location."
    },
    {
      id: "panel6",
      question: "Is my data safe on Apna Card?",
      answer:"Apna Card prioritizes data security and confidentiality. Your information is securely stored within the app, utilizing advanced encryption and protective measures to safeguard your data. We do not sell or share your information with any third parties, ensuring your privacy remains intact."
    },
    {
      id: "panel7",
      question: "Can i customize my Apna Card profile?",
      answer:"Apna Card enables you to customize your digital profile to effectively represent your personal or professional brand. You can select a profile picture, add social media links, provide a detailed bio, and include any other relevant information you wish to share."
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6.25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6.25,
      }}
    >
      <Typography
        variant="h1"
        color="#1f164f"
        fontFamily="'Jost-Bold', Montserrat"
        fontSize={64}
        fontWeight="bold"
        textAlign="center"
        letterSpacing="-0.9px"
      >
        FAQs
      </Typography>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: "15px",
          border: "1px solid #909090",
          p: 2.5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              disableGutters
              elevation={0}
              sx={{
                border: "none",
                borderBottom:
                  index < faqItems.length - 1 ? "1px solid #e0e0e0" : "none",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 0,
                  "& .MuiAccordionSummary-content": {
                    margin: 0,
                  },
                }}
              >
                <Typography
                  fontFamily="'Open_Sans-Medium', Montserrat"
                  fontWeight="500"
                  fontSize="1.5rem"
                  letterSpacing="-0.32px"
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Typography
                  fontFamily="'Open_Sans-Medium', Montserrat"
                  fontWeight="400"
                  fontSize="1rem"
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQsSection;
