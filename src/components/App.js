import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ProjectList from './ProjectList'
import AddProject from './AddProject'
import { getTotalProjects } from '../selectors'
var HTML5Backend = require('react-dnd-html5-backend')
var DragDropContext = require('react-dnd').DragDropContext

class App extends React.Component {
  // Component which contains the entire App
  render () {
    return (
      <div>
        <div className="columns">
          <div className="column column-left">
            <AddProject />
          </div>
          <div className="column column-right">
            <div className="total-projects-box">
              Total
              <div className="total-projects">
                <div className="count">{this.props.totalProjects}</div>
                <div>Project{ this.props.totalProjects !== 1 && 's' }</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.props.categories.map(category =>
            <ProjectList key={category} category={category} />
          )}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  totalProjects: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  // Function to map state to properties
  return {
    totalProjects: getTotalProjects(state)
  }
}

function mapDispatchToProps(dispatch) {
  // Function to map dispatch to properties
  return {}
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default DragDropContext(HTML5Backend)(App)
