import * as React from "react";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { DateTime } from "luxon";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useGetArcGisSearchResultByTopicQuery } from "./services/arcgisEnterprise";

export default function ArcGisQueryTest() {
  const [page, SetPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    SetPage(value);
  };
  const { data, error, isLoading } =
    useGetArcGisSearchResultByTopicQuery("Texas");

  return (
    <div className="QueryResult">
      {error ? (
        <>There was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <Stack spacing={1}>
            <Typography>Page: {page}</Typography>
            <Pagination
              count={100}
              page={page}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handleChange}
            />
            <p>Total: {data.total}</p>
            <p>Num: {data.num}</p>
            <p>Start: {data.start}</p>
            <p>Next Start: {data.nextStart}</p>
            <p>Results:</p>
            {data.results.map((result) => (
              <div key={result.id}>
                <p>ID: {result.id}</p>
                <p>Owner: {result.owner}</p>
                <p>Name: {result.name}</p>
                <p>
                  Created: {DateTime.fromMillis(result.created).toISODate()}
                </p>
                <p>
                  Modified: {DateTime.fromMillis(result.modified).toISODate()}
                </p>
                <React.Fragment>
                  {parse(sanitizeHtml(result.description))}
                </React.Fragment>
                <hr />
              </div>
            ))}
          </Stack>
        </>
      ) : null}
    </div>
  );
}
