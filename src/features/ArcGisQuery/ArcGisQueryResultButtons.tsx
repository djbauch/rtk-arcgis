import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import parse from 'html-react-parser'
import { identity, map } from 'lodash'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { ArcGisItem, ArcGisSearchResult } from '../../services/types'

import { loadResults } from './querySlice'
import { NavLink } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'

let CurrentArcGisItem: ArcGisItem | null = null

export const QueryResultButton: React.FC<ArcGisItem> = (props) => {
  const { title, id, name, owner } = props
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <NavLink to={`items/${id}`}>{(title || name || id || 'untitled').substring(0, 84)}</NavLink>
      </AccordionSummary>
      <AccordionDetails>
        <React.Fragment>{parse(sanitizeHtml(props.description))}</React.Fragment>
      </AccordionDetails>
    </Accordion>
  )
}

type AGQRBProps = {
  data?: ArcGisSearchResult
  error?: FetchBaseQueryError | SerializedError
  isLoading: boolean
}

export const ArcGisQueryResultButtons: React.FC<AGQRBProps> = (props) => {
  const arcGisSearchResult = useAppSelector((state) => state.arcGisSearchResult.value)

  return (
    <nav>
      <Stack spacing={1}>
        ks
        {arcGisSearchResult.map((result) => (
          <QueryResultButton {...result}></QueryResultButton>
        ))}
      </Stack>
    </nav>
  )
}

export function getArcGisItem() {
  return CurrentArcGisItem
}
