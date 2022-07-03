import { Fragment, useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Code from "react-highlight";
import {Button, TableCell, Link, Table, TableBody, TableRow, TableFooter, TableHead} from '@mui/material'

  const defaultOverrides = {
    a: {
      component: Link,
    },
    button: {
      component: Button,
    },
    Button: {
      component: Button,
    },

    code: {
      component: Code,
    },
    h1: {
      component: Typography,
      props: { variant: 'h1', gutterBottom: true },
    },
    h2: {
      component: Typography,
      props: { variant: 'h2', gutterBottom: true },
    },
    h3: {
      component: Typography,
      props: { variant: 'h3', gutterBottom: true },
    },
    h4: {
      component: Typography,
      props: { variant: 'h4', gutterBottom: true },
    },
    h5: {
      component: Typography,
      props: { variant: 'h5', gutterBottom: true },
    },
    h6: {
      component: Typography,
      props: { variant: 'h6', gutterBottom: true },
    },
    li: {
      component: 'li',
    },
    Link: {
      component: Link,
    },
    ol: {
      component: 'ol',
    },
    p: {
      component: Typography,
      props: { variant: 'body1', gutterBottom: true },
    },
    pre: {
      component: Code,
    },
    table: {
      component: Table,
    },
    tbody: {
      component: TableBody,
    },
    td: {
      component: TableCell,
    },
    tfoot: {
      component: TableFooter,
    },
    thead: {
      component: TableHead,
    },
    th: {
      component: TableCell,
    },
    tr: {
      component: TableRow,
    },
    ul: {
      component: 'ul',
    },
  };


export default function Mark({contentAddr}) {
    let [content, setContent] = useState()
   
    useEffect(() => {
        fetch(contentAddr)
        .then(val => {return val.text()})
        .then(con => {
            return <Markdown options={{overrides: {...defaultOverrides}}}>{con}</Markdown>   
        })
        .then(setContent)
    }, [contentAddr])
    

    
    return <Fragment>{content}</Fragment>
}
