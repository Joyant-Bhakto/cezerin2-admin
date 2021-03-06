import { Button, Dialog, Paper } from "@material-ui/core"
import React, { useState } from "react"
import * as helper from "../../../../lib/helper"
import messages from "../../../../lib/text"
import style from "./style.module.sass"
import SummaryForm from "./summaryForm"

const CustomerSummary = props => {
  const [openSummaryEdit, setOpenSummaryEdit] = useState(false)

  const { customer, settings } = props

  const saveSummaryEdit = customer => {
    props.onCustomerSummaryUpdate(customer)
    setOpenSummaryEdit(false)
  }
  const totalSpent = helper.formatCurrency(customer.total_spent, settings)

  return (
    <Paper className="paper-box" elevation={1}>
      <div className={style.innerBox}>
        <div
          className={style.customerName}
          style={{ paddingBottom: 26, paddingTop: 0 }}
        >
          {customer.full_name}
          <>
            <small>{customer.group_name}</small>
          </>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.email}</span>
          </div>
          <div className="col-xs-7">
            <a href={`MailTo:${customer.email}`} className={style.link}>
              {customer.email}
            </a>
          </div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.mobile}</span>
          </div>
          <div className="col-xs-7">{customer.mobile}</div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.customers_totalSpent}</span>
          </div>
          <div className="col-xs-7">{totalSpent}</div>
        </div>

        <div className={`${style.summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.note}</span>
          </div>
          <div className="col-xs-7">{customer.note}</div>
        </div>

        <div style={{ marginTop: 20 }}>
          <Button
            style={{ marginRight: 15 }}
            onClick={() => setOpenSummaryEdit(true)}
          >
            Edit
          </Button>
        </div>

        <Dialog
          title={messages.customers_titleEdit}
          modal={false}
          open={openSummaryEdit}
          onRequestClose={setOpenSummaryEdit(false)}
          contentStyle={{ width: 600 }}
        >
          <div style={{ width: "500px", margin: "25px" }}>
            <SummaryForm
              initialValues={customer}
              onCancel={() => setOpenSummaryEdit(false)}
              onSubmit={saveSummaryEdit}
            />
          </div>
        </Dialog>
      </div>
    </Paper>
  )
}

export default CustomerSummary
