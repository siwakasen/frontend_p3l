import { FC } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";
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
      {!customizer.isCollapse || customizer.isSidebarHover ? (
        customizer.activeMode === "dark" ? (
          <Image
            src="/images/logos/light-logo.svg"
            alt="logo"
            height={customizer.TopbarHeight}
            width={180}
            priority
          />
        ) : (
          <Image
            src={"/images/logos/dark-logo.svg"}
            alt="logo"
            height={customizer.TopbarHeight}
            width={180}
            priority
          />
        )
      ) : (
        <Image
          src={"/images/logos/logoIcon.svg"}
          alt="logo"
          height={customizer.TopbarHeight}
          width={50}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
