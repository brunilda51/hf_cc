/* eslint-disable @typescript-eslint/no-explicit-any */

import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getValueFromPath, traverse } from "../helpers/helpers";
import { useState } from "react";

const Explorer = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const jsonData = {
    date: "2021-10-27T07:49:14.896Z",
    hasError: false,
    fields: [
      {
        id: "4c212130",
        prop: "iban",
        value: "DE81200505501265402568",
        hasError: false,
      },
    ],
  };

  const handleClick = (e: React.MouseEvent, path: string[]) => {
    e.preventDefault();
    setInputValue(path.join("."));
    setCurrentValue(getValueFromPath(jsonData, path));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCurrentValue(getValueFromPath(jsonData, e.target.value.split(".")));
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Property"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
          {currentValue && (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: "10px" }}
            >
              {`Value: ${currentValue}`}
            </Typography>
          )}
        </Grid>
        <Grid size={6}>
          <TextField label="Block/Variable" variant="outlined" fullWidth />
        </Grid>
        <pre style={{ textAlign: "left" }}>
          {traverse(jsonData, [], handleClick)}
        </pre>
      </Grid>
    </div>
  );
};

export default Explorer;
