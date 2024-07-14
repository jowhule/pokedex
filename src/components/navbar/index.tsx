import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BodyText, Hoverable } from "../../utils/styledComponents";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { hideNavbar, navbarContainer, navbarWrapper } from "./style";
import iconLogo from "../../assets/pokeball-icon.png";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [hideNav, setHideNav] = useState<boolean>(false);

  const menuItemClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    position > scrollPosition ? setHideNav(true) : setHideNav(false);

    setScrollPosition(position);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // click on logo and go to home page
  const handleLogoClick = () => navigate("/");

  /*-- drop down menu code taken from mui demos --*/
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    )
      return;

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) anchorRef.current!.focus();

    prevOpen.current = open;
  }, [open]);

  return (
    <nav style={hideNav ? hideNavbar : navbarContainer}>
      <Box sx={navbarWrapper}>
        <Hoverable onClick={handleLogoClick}>
          <Box
            component="img"
            src={iconLogo}
            alt="Pokeball"
            sx={{ width: "40px", margin: "0 10px", marginTop: "3px" }}
          />
        </Hoverable>

        <Box>
          <Button variant="text" ref={anchorRef} onClick={handleToggle}>
            <BodyText fontWeight="bold">Pokedexes</BodyText>
            <KeyboardArrowDownRoundedIcon sx={{ color: "text.primary" }} />
          </Button>
        </Box>
      </Box>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ width: "130px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => menuItemClick("/")}>
                    National
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/kanto")}>
                    Kanto
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/johto")}>
                    Johto
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/hoenn")}>
                    Hoenn
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/sinnoh")}>
                    Sinnoh
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/unova")}>
                    Unova
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/kalos")}>
                    Kalos
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/alola")}>
                    Alola
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/galar")}>
                    Galar
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/hisui")}>
                    Hisui
                  </MenuItem>
                  <MenuItem onClick={() => menuItemClick("/paldea")}>
                    Paldea
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </nav>
  );
};
