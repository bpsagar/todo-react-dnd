import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addProject } from '../actions'

class AddProject extends React.Component {
  // Component which contains input, to add new projects
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.updateState = this.updateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateState(e) {
    this.setState({name: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.addProject(this.state.name)
    this.setState({name: ''});
  }

  render () {
    return (
      <div className="add-project">
        <form onSubmit={this.handleSubmit}>
          <input
            className="add-project-input"
            type="text"
            placeholder="Add a project"
            value={this.state.name}
            onChange={this.updateState}
          />
          <input className="add-project-button" type="submit" value="Add" />
        </form>
      </div>
    )
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (name) => {
      dispatch(addProject(name))
    }
  }
}

AddProject = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject)

export default AddProject
