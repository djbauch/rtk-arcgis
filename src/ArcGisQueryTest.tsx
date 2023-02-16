import * as React from "react";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { DateTime } from "luxon";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetArcGisSearchResultByTopicQuery } from "./services/arcgisEnterprise";
import { ArcGisQueryArgs } from "./services/types";

const ArcGisQueryTest: React.FC<ArcGisQueryArgs> = ({ topic }) => {
  const [page, SetPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    SetPage(value);
  };
  const { data, error, isLoading } = useGetArcGisSearchResultByTopicQuery({
    topic,
    start: (page - 1) * 10 + 1,
  });

  return (
    <div className="QueryResult">
      {error ? (
        <>There was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <Stack spacing={1}>
            <Typography>
              Page: {page} of {Math.ceil(data.total / 10)}
            </Typography>
            <Pagination
              count={Math.ceil(data.total / 10)}
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
                <p>Title: {result.title}</p>
                <p>Type: {result.type}</p>
                <p>
                  Created: {DateTime.fromMillis(result.created).toISODate()}
                </p>
                <p>
                  Modified: {DateTime.fromMillis(result.modified).toISODate()}
                </p>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{result.snippet}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <React.Fragment>
                      {parse(sanitizeHtml(result.description))}
                    </React.Fragment>
                  </AccordionDetails>
                </Accordion>
                <p>Tags: {JSON.stringify(result.tags)}</p> 
                <p>Thumbnail: {result.thumbnail}</p>
                <p>Documentation: { result.documentation }</p>
                <p>Extent: { JSON.stringify(result.extent).replace(/,/g, ',&nbsp;&nbsp; ')}</p>
                <p>URL: { result.url}</p>
  
                <hr />
              </div>
            ))}
        </Stack>
        </>
  ) : null
}
    </div >
  );
};
export default ArcGisQueryTest;
