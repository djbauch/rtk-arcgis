import type { ArcGisItem } from "./services/types";
import {store} from './app/store'
import { arcGisEnterpriseApi } from './services/arcgisEnterprise'

const Items = () => {
  const reducer = arcGisEnterpriseApi.reducerPath
  return (
    <>
    </>
  )
}