import { Box, Button } from "@mui/material";
import React from "react";
import { secondaryColour } from "../../utils/colours";
import { useNavigate } from "react-router-dom";

export const NAVBAR_HEIGHT = "60px";
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "3",
        height: NAVBAR_HEIGHT,
        width: "100%",
        backgroundColor: "white",
        boxShadow: `0 5px 5px ${secondaryColour}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Button onClick={() => navigate("/")}>National</Button>
        <Button onClick={() => navigate("/kanto")}>Kanto</Button>
        <Button onClick={() => navigate("/original-johto")}>Johto</Button>
        <Button onClick={() => navigate("/hoenn")}>Hoenn</Button>
        <Button onClick={() => navigate("/original-sinnoh")}>Sinnoh</Button>
        <Button onClick={() => navigate("/original-unova")}>Unova</Button>
        <Button onClick={() => navigate("/original-alola")}>Alola</Button>
        <Button onClick={() => navigate("/original-unova")}>Unova</Button>
      </Box>
    </nav>
  );
};
