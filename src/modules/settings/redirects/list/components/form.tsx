import { Divider, List, ListItem, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import messages from "../../../../../lib/text"

const RedirectItem = ({ redirect }) => (
  <>
    <Divider />
    <Link
      to={`/settings/redirects/${redirect.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem>
        <div className="row">
          <div className="col-xs-4">{redirect.from}</div>
          <div className="col-xs-4">{redirect.to}</div>
          <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
            301
          </div>
        </div>
        <KeyboardArrowRight className="material-icons" />
      </ListItem>
    </Link>
  </>
)

const RedirectsList = (props: Readonl<{ redirects; onLoad }>) => {
  const { redirects, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const listItems = redirects.map((redirect, index) => (
    <RedirectItem key={index} redirect={redirect} />
  ))

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.redirectsAbout}
      </div>
      <Paper className="paper-box" elevation={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default RedirectsList
