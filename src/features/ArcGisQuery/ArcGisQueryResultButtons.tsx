import Stack from "@mui/material/Stack";
import { identity, map } from "lodash";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ArcGisItem } from "../../services/types";

import { loadResults } from "./querySlice";

let CurrentArcGisItem: ArcGisItem | null = null

const QueryResultButton: React.FC<ArcGisItem> = (props) => {
  const { id, name, owner } = props;
  return (
    <p>
      {name || id} {owner}
    </p>
  );
};

export function ArcGisQueryResultButtons() {
  const arcGisSearchResult = useAppSelector(
    (state) => state.arcGisSearchResult.value
  );

  return (
    <Stack spacing={1}>
      {arcGisSearchResult.map((result) => (
        <QueryResultButton {...result}></QueryResultButton>
      ))}
    </Stack>
  );
}

export function getArcGisItem() {
  return CurrentArcGisItem
}
