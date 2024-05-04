import { FC } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    overflow: "hidden",
    display: "flex",
  }));

  return (
    <LinkStyled href="/">
      <Typography
        variant="h3"
        fontWeight={600}
        color="textPrimary"
        height={customizer.TopbarHeight}
        width={180}
        display="flex"
        alignItems="center"
        justifyContent="left"
      >
        Atma Kitchen
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
