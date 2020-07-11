import { connect } from "react-redux";

import Dialogs from "./Dialogs";
import { actions } from "../../redux/actions/dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/store";

// как бы срабатывает обращение к store.getState() в state
const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsReducer,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect // hoc
)(Dialogs);
