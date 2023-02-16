import * as React from 'react'
import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'
import { Form, useLoaderData, useFetcher } from 'react-router-dom'
import { getArcGisItem } from '../features/ArcGisQuery/ArcGisQueryResultButtons'
import type { ArcGisItem } from '../services/types'
import { DateTime } from 'luxon'
import { json } from 'stream/consumers'

export function loader() : ArcGisItem {
  const item = getArcGisItem()
  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return item
}

export function action({
  request,
  params,
}: {
  request: any;
  params: ArcGisItem;
}) {
  return params
}

export default function ArcGisItemRecord() {
  const item = useLoaderData() as ArcGisItem
  return (
    <div id="arcgisItemRecord">
      <p>ID: {item.id}</p>
      <p>Owner: {item.owner}</p>
      <p>Created: {DateTime.fromMillis(item.created).toISODate()}</p>
      <p>Modified: {DateTime.fromMillis(item.modified).toISODate()}</p>
      <p>GUID: {item.guid}</p>
      <p>Name: {item.name}</p>
      <p>Title: {item.title}</p>
      <p>Type: {item.type}</p>
      <p>TypeKeywords: {JSON.stringify(item.typeKeywords)}</p>
      <h1>Snippet</h1>
      <React.Fragment>
        {parse(sanitizeHtml(item.snippet))}
      </React.Fragment>
      <p>Thumbnail: {item.thumbnail}</p>
      <p>Documentation: {item.documentation}</p>
      <p>Extent: {JSON.stringify(item.extent)}</p>
      <p>Categories: {JSON.stringify(item.categories)}</p>
      <p>SpatialReference: {item.spatialReference}</p>
      <p>AccessInformation: {item.accessInformation}</p>
      <p>LicenseInfo: {item.licenseInfo}</p>
      <p>Culture: {item.culture}</p>
      <p>URL: {item.url}</p>
      <p>ProxyFilter: {JSON.stringify(item.proxyFilter)}</p>
      <p>Access: {item.access}</p>
      <p>Size: {item.size}</p>
    </div>
  )
}