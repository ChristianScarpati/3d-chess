import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  return (
    <Grid
      h="full"
      templateAreas={`" header header"
                      " main movesList"
                      " footer footer"
    `}
      gridTemplateRows="auto 8fr auto"
      gap={1}
    >
      <GridItem area={"header"}>This is the header</GridItem>
      <GridItem area={"movesList"}>This is the moves list</GridItem>
      <GridItem area={"main"} roundedRight="md">
        main area
      </GridItem>
      <GridItem area={"footer"}>This is the footer</GridItem>
    </Grid>
  );
}

export default App;
