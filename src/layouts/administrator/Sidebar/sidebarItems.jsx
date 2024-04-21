import Menuitems from "./menuItems";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { checkToken } from "@/services/auth/auth";

const SidebarItems = () => {
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const [role, setRole] = useState();
  const [token, setToken] = useState(Cookies.get("token"));
  useEffect(() => {
    async function checkAtuhorize() {
      if (!token) return;
      const response = await checkToken(token);
      setRole(response.data.role);
    }
    checkAtuhorize();
  }, [token]);

  console.log(role);
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          } else {
            if (item.access.includes(role) || item.access == "All") {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );
            }
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
