import React, { ChangeEvent } from "react";

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};
type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType>  {
  state = {
    editMode: false,
    status: this.props.status,
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    // отправляем на значение на сервер когда вышли из редактируемого мода
    this.props.updateStatus(this.state.status);
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "Hello World!"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            {/*onBlur, когда фокус уходит с элемента*/}
            <input
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              onChange={this.onStatusChange}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
