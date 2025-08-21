export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options); // 'en-GB' for DD/MM/YYYY format
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} ${formattedTime}`; // format: October 29, 2024 11:32 AM
};

// CommonUtils.js

 // Function to generate and download the vCard
export const handleSaveContact = (firstName, lastName, mobileNo) => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
TEL;TYPE=VOICE,CELL:${mobileNo}
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/x-vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${firstName}_${mobileNo}.vcf`;
  
  // Add a small delay to ensure the download works on mobile
  setTimeout(() => {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }, 100);
};

export const generateWhatsAppUrl = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const calculateAge = (timestamp) => {
  const birthDate = new Date(timestamp);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  // Adjust age if the current date is before the birth date
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
export const whatsAppMessage = () => {
  const phoneNumber = "+923217564880";
  const message = "Hello, I want to order from Pharmacy.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
  return;
};
export const whatsAppConsultancy = () => {
  const phoneNumber = "+923217564880";
  const message = "Hello, I want to book a slot for Consultancy.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
  return;
};
export const whatsAppLearnMore = () => {
  const phoneNumber = "+923217564880";
  const message = "Hello, I want to know About ApnaCard.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
  return;
};