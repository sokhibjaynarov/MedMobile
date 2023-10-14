// ** Redux Imports
import { getUserData } from "@utils";
import { createSlice } from "@reduxjs/toolkit";
// ** ThemeConfig Import
import themeConfig from "@configs/themeConfig";
// ** User roles import
import { USER_ROLE } from "@/utility/constants";

const user = getUserData();
const { ADMIN } = USER_ROLE;

const contentWidth =
  user?.role === ADMIN ? themeConfig.layout.contentWidth : "full";
const navbarType =
  user?.role === ADMIN ? themeConfig.layout.contentWidth : "static";

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem("menuCollapsed");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialDirection = () => {
  const item = window.localStorage.getItem("direction");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = () => {
  const item = window.localStorage.getItem("skin");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    skin: initialSkin(),
    layout: "vertical",
    navbarType: navbarType,
    lastLayout: "vertical",
    isRTL: initialDirection(),
    contentWidth: contentWidth,
    menuCollapsed: initialMenuCollapsed(),
    footerType: themeConfig.layout.footer.type,
    menuHidden: themeConfig.layout.menu.isHidden,
    navbarColor: themeConfig.layout.navbar.backgroundColor,
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload;
      window.localStorage.setItem("direction", JSON.stringify(action.payload));
    },
    handleSkin: (state, action) => {
      state.skin = action.payload;
      window.localStorage.setItem("skin", JSON.stringify(action.payload));
    },
    handleLayout: (state, action) => {
      state.layout = action.payload;
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload;
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload;
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload;
      window.localStorage.setItem(
        "menuCollapsed",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
} = layoutSlice.actions;

export default layoutSlice.reducer;
