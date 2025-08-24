import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";

// This will be replaced with API call later
const dummyPartners = [
  {
    id: "p1",
    name: "Partner A",
    logo: "/images/partnerA.png",
    contactName: "John Doe",
    contactNumber: "123-456-7890",
    totalPromo: 100,
    usedPromo: 25,
    remainingPromo: 75,
  },
  {
    id: "p2",
    name: "Partner B",
    logo: "/images/partnerB.png",
    contactName: "Jane Smith",
    contactNumber: "987-654-3210",
    totalPromo: 50,
    usedPromo: 10,
    remainingPromo: 40,
  },
];

const ListingPartners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  // This function will later call API
  const fetchPartners = async () => {
    try {
      // const response = await apiService.getPartners(); // Example API call
      // setPartners(response.data);

      // Using dummy data for now
      setPartners(dummyPartners);
    } catch (error) {
      console.error("Failed to fetch partners:", error);
    }
  };

  const handleGeneratePromoClick = (partnerId) => {
    navigate(`/super-admin/partners/${partnerId}/generate-promo`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listing Partners
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Partner Name</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Total Promo Codes</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Remaining</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.contactName}</TableCell>
                <TableCell>{partner.contactNumber}</TableCell>
                <TableCell>{partner.totalPromo}</TableCell>
                <TableCell>{partner.usedPromo}</TableCell>
                <TableCell>{partner.remainingPromo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                      sx={{padding:1}}
                    onClick={() => handleGeneratePromoClick(partner.id)}
                  >
                    Generate Promo Codes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ListingPartners;
