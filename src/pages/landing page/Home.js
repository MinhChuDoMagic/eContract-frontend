import * as React from "react";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ProductCTA from "./modules/views/ProductCTA";
import AppAppBar from "./modules/views/AppAppBar";
import theme from "./modules/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <ProductValues />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <ProductSmokingHero />
        <AppFooter />
      </React.Fragment>
    </ThemeProvider>
  );
};
