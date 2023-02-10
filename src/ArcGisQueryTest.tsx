import * as React from 'react';
import { useGetArcGisSearchResultByTopicQuery } from './services/arcgisEnterprise';

export default function ArcGisQueryTest() {
  const { data, error, isLoading } = useGetArcGisSearchResultByTopicQuery('Texas')

  return (
    <div className="QueryResult">
      {error? (
        <>There was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
        <p>Total: {data.total}</p>
        <p>Num: {data.num}</p>
        </>
      ) : null}
    </div>
  )
}