import * as React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getItem } from '../Items'
export type ItemRecord = {
  itemId: string
}
export async function loader({ params }: { params: ItemRecord }):
 Promise<ItemRecord> {
   const item = await getItem(params.itemId)
    if (!item) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found"
      })
    }
  return item
}

export const Item = () => {
  const item = useLoaderData() as ItemRecord
  return <h1>Item {item.itemId}</h1>
}
