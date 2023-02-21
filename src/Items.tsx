import type { ArcGisItem } from "./services/types";
import {store} from './app/store'
import type { ItemRecord } from './routes/Item'
import { arcGisEnterpriseApi } from './services/arcgisEnterprise'

export async function getItem(id:string) : Promise<ItemRecord | null>  {
  return {itemId: id}
}
const Items = () => {
  const reducer = arcGisEnterpriseApi.reducerPath
  return (
    <>
    Item!
    </>
  )
}