import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React from "react";

const color = red[500];

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Blog({ blog, index }) {
  const { title, description } = blog;
  return (
    <>
      <Grid item xs={6} sm={4} md={4} lg={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {index + 1}
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
          <ButtonGroup variant="text" size="small">
            <Button color="secondary">View</Button>
            <Button>Edit</Button>
            <Button color="error">Delete</Button>
          </ButtonGroup>
        </Card>
      </Grid>
    </>
  );
}
