import { connect } from "react-redux"
import {
  createPaymentMethod,
  fetchPaymentMethod,
  fetchShippingMethods,
  receivePaymentMethod,
  updatePaymentMethod,
} from "../actions"
import Form from "./components/form"

const mapStateToProps = (state, ownProps) => {
  const { methodId } = ownProps.match.params
  const gateway = state.settings.paymentMethodEdit
    ? state.settings.paymentMethodEdit.gateway
    : null

  return {
    methodId,
    gateway,
    settings: state.settings.settings,
    initialValues: state.settings.paymentMethodEdit,
    shippingMethods: state.settings.shippingMethods,
  }
}

const mapDispatchToProps = (dispatch: Function, ownProps: any) => ({
  onLoad: () => {
    const { methodId } = ownProps.match.params
    if (methodId) {
      dispatch(fetchPaymentMethod(methodId))
    } else {
      dispatch(receivePaymentMethod({ enabled: true }))
    }
    dispatch(fetchShippingMethods())
  },
  onSubmit: (method: any) => {
    if (
      method.conditions &&
      method.conditions.countries &&
      !Array.isArray(method.conditions.countries)
    ) {
      const countriesStr = method.conditions.countries
      method.conditions.countries = countriesStr
        .split(",")
        .map(item => item.trim().toUpperCase())
        .filter(item => item.length === 2)
    }

    if (method.id) {
      dispatch(updatePaymentMethod(method))
    } else {
      dispatch(createPaymentMethod(method))
      ownProps.history.push("/settings/payments")
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
