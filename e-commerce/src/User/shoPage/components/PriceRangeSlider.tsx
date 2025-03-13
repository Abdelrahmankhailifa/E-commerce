import { Box, Slider, SliderThumb, styled, TextField } from "@mui/material";
import React from "react";

const CustomizedSlider = styled(Slider)(({ theme }) => ({
  color: "#8BC34A",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#8BC34A",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  "& .MuiSlider-rail": {
    color: "#E8E8E9",
    opacity: 1,
    height: 4,
    ...theme.applyStyles("dark", {
      color: "#bfbfbf",
      opacity: undefined,
    }),
  },
}));

function AirbnbThumbComponent(props: React.HTMLAttributes<unknown>) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

export function PriceRangeSlider({
  value,
  handleChange,
  min,
  max,
}: {
  value: number[];
  handleChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void;
  min: number;
  max: number;
}) {
  return (
    <Box sx={{ width: 250 }}>
      <CustomizedSlider
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index: number) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
        disableSwap
        valueLabelDisplay="auto"
      />
      <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <TextField
            value={value[0]}
            variant="outlined"
            size="small"
            sx={{ width: 50, backgroundColor: "white", ml: 0.5 }}
            inputProps={{ readOnly: true, startAdornment: <span>$</span> }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <TextField
            value={value[1]}
            variant="outlined"
            size="small"
            sx={{ width: 50, backgroundColor: "white", ml: 0.5 }}
            inputProps={{ readOnly: true, startAdornment: <span>$</span> }}
          />
        </Box>
      </Box>
    </Box>
  );
}
