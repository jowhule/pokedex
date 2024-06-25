import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAVBAR_HEIGHT } from "../../components/navbar/style";
import { useLoadPageContext } from "../../components/context-providers/load-provider";

export const ErrorrPage: React.FC = () => {
  const { setLoadPage } = useLoadPageContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoadPage(true);
  }, [setLoadPage]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height={`calc(100vh - ${NAVBAR_HEIGHT} - 20px)`}
      justifyContent="center"
      alignItems="center"
    >
      <Typography textAlign="center" variant="h1" fontWeight="bold">
        404
      </Typography>
      <Typography textAlign="center" variant="h4">
        Could not fetch specified data...
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
        sx={{ m: "50px auto" }}
      >
        Return Home
      </Button>
    </Box>
  );
};
