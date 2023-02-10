import * as React from 'react';
import { useGetArcGisSearchResultByTopicQuery } from './services/arcgisEnterprise';

export default function ArcGisQueryTest() {
  const { data, error, isLoading } = useGetArcGisSearchResultByTopicQuery('Texas')

  return (
    <div className="QueryResult" >
      {error ? (
        <>There was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <p>Total: {data.total}</p>
          <p>Num: {data.num}</p>
          <p>Start: {data.start}</p>
          <p>Next Start: {data.nextStart}</p>
          <p>Results:</p>
          {data.results.map(result => (
            <div key={result.id}>
              <p>ID: {result.id}</p>
              <p>Owner: {result.owner}</p>
              <p>Name: {result.name}</p>
              <React.Fragment>{result.description}</React.Fragment>
              <div dangerouslySetInnerHTML={{__html: result.description}}/>
              <hr/>
            </div>
          ))}
        </>
      ) : null}
    </div>
  )
}