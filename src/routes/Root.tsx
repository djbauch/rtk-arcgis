import React, { FC, useEffect } from 'react'
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom'
import {
  ArcGisQueryResultButtons,
  getArcGisItem,
  QueryResultButton
} from '../features/ArcGisQuery/ArcGisQueryResultButtons'
import ArcGisItemRecord from './ArcGisItemRecord'
import type { ArcGisItem, ArcGisSearchResult } from '../services/types'
import { useGetArcGisSearchResultByTopicQuery } from '../services/arcgisEnterprise'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

export function action() {
  return <div></div>
}

export function loader({ request }: { request: { url: string } }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const bbox = url.searchParams.get('bbox')
  return { q, bbox }
}

export default function Root() {
  let { q, bbox } = useLoaderData() as { q?: string; bbox?: string }
  //q = q || 'San Antonio'
  const [page, SetPage] = React.useState(1)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    SetPage(value)
  }
  const navigation = useNavigation()
  const submit = useSubmit()
  const result = useGetArcGisSearchResultByTopicQuery({ topic: q, start: (page - 1) * 10 + 1 })
  const { data, error, isLoading } = result
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    ;(document.getElementById('q') as HTMLInputElement).value = q || ''
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>ArcGIS Portal Items</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search Portal Items"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, { replace: !isFirstSearch })
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">Go</button>
          </Form>
        </div>
        {/* <ArcGisQueryResultButtons data={data} isLoading={isLoading} error={error}/> */}
        <nav>
          {error ? (
            <p>
              <b>There was an error</b>
            </p>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <Stack spacing={1}>
                          <Pagination
              count={Math.ceil(data.total / 10)}
              page={page}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
              {data.results.map((item) => (
                <QueryResultButton key={item.id} {...item} />
              ))}
            </Stack>
          ) : (
            <p>
              <i>No items</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  )
}
/*
  const NavContent:FC<{data?: ArcGisSearchResult, error?: FetchBaseQueryError | SerializedError , isLoading: boolean}> =
  (props) => {
    const { data, error, isLoading } = props;
    if (error) {
      return <>There was an error</>
    } else if (isLoading) {
      return <>Loading...</>
    } else if (data) {

    }
    return <><i>No items</i></>
  }
  */
