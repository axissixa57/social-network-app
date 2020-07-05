import { connect } from "react-redux";

import Dialogs from "./Dialogs";
import { actions } from "../../redux/actions/dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// как бы срабатывает обращение к store.getState() в state
const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) =>
      dispatch(actions.sendMessageCreator(newMessageBody)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect // hoc
)(Dialogs);
