import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";

const featuresData = {
  "Prescription Record": [
    "Facility to upload prescription",
    "Facility to download Prescription",
    "Maintain record monthly/yearly wise",
  ],
  "Lab Record": [
    "Patient information (name, ID, and medical history)",
    "Test details (test name, date, and lab name)",
    "Results (numerical values, ranges, and interpretations)",
    "Doctor's remarks or recommendations",
    "Upload lab record",
    "Download lab record",
    "Maintain record monthly/yearly wise",
  ],
  "Hospital Record": [
    "Admission and discharge summaries",
    "Diagnoses and treatments",
    "Upload record",
    "Download record",
    "Maintain record monthly/yearly wise",
  ],
  "Radiology Record": [
    "Imaging type (e.g., X-ray, MRI, CT scan, and ultrasound)",
    "Date of the procedure",
    "Radiologist's findings and report",
    "Upload reports",
    "Download reports",
    "Maintain record monthly/yearly wise",
  ],
};

const servicesData = {
  "Video Doctor Consultation": [
    "Book instant video consultations with verified doctors.",
  ],
  "Home Nursing Service": ["Access professional nursing care at your home."],
  "Medicines Delivery": ["Get medicines delivered to your doorstep with ease."],
  "Online Medical Appointment": ["Schedule appointments with doctors online."],
};

const ApnaCardInfo = () => {
  const [flippedCard, setFlippedCard] = React.useState(null);

  const handleFlip = (type, key) => {
    setFlippedCard((prev) =>
      prev === `${type}-${key}` ? null : `${type}-${key}`
    );
  };

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        px: { xs: 2, sm: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
      }}
    >
      {/* How It Works Section */}
      <Typography
        component="h2"
        variant="h4"
        align="center"
        sx={{
          color: "text.primary",
          mb: 3,
          fontWeight: "bold",
        }}
      >
        How Does It Work
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: "900px",
          margin: "0 auto",
          lineHeight: 1.8,
        }}
      >
        Apna Card is a seamless digital solution for instant connections. Share
        your contact details with a tap using NFC or let others scan your QR
        code—no more paper exchanges.
        <br />
        <br />
        Apna Card goes beyond contact sharing. Capture leads, track
        interactions, and integrate with your CRM to nurture your network and
        grow your business. Export data to Excel or CSV, identify potential
        clients, and make smarter marketing decisions.
      </Typography>

      {/* Apna Card Services */}
      <Typography
        component="h2"
        variant="h5"
        align="center"
        marginTop="50px"
        sx={{ color: "text.primary", mb: 3, fontWeight: "bold" }}
      >
        Apna Card Services
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }} justifyContent="center">
        {Object.keys(servicesData).map((service, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              sx={{
                perspective: "1000px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s",
                  transform:
                    flippedCard === `services-${service}`
                      ? "rotateY(180deg)"
                      : "none",
                }}
                onClick={() => handleFlip("services", service)}
              >
                {/* Front Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    {service}
                  </Typography>
                </Box>

                {/* Back Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#f4f6f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    padding: "10px",
                    transform: "rotateY(180deg)",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {servicesData[service]}
                  </Typography> */}
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {servicesData[service].map((item, idx) => (
                      <li
                        key={idx}
                        style={{ fontSize: "14px", color: "text.secondary" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Unique Features */}
      <Typography
        component="h2"
        variant="h5"
        align="center"
        marginTop="50px"
        sx={{ color: "text.primary", mb: 3, fontWeight: "bold" }}
      >
        Unique Features of Apna Card
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {Object.keys(featuresData).map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              sx={{
                perspective: "1000px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s",
                  transform:
                    flippedCard === `features-${feature}`
                      ? "rotateY(180deg)"
                      : "none",
                }}
                onClick={() => handleFlip("features", feature)}
              >
                {/* Front Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    {feature}
                  </Typography>
                </Box>

                {/* Back Side */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#f4f6f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    padding: "10px",
                    transform: "rotateY(180deg)",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {featuresData[feature].map((item, idx) => (
                      <li
                        key={idx}
                        style={{ fontSize: "14px", color: "text.secondary" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApnaCardInfo;
