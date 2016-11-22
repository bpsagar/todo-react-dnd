import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { moveProject } from '../actions'
import { getProjectsByCategory } from '../selectors'
import Project from './Project'
import ProjectDropzone from './ProjectDropzone'

class ProjectList extends React.Component {
  // Component which contains list of Projects and ProjectDropzones
  render () {
    return (
      <div className="project-list">
        <div className="project-list-header">
          <div className="project-list-name">
            {this.props.category}
          </div>
          <div className="project-count">
            <div className="count">{this.props.projects.length}</div>
            <div>Project{ this.props.projects.length == 1 ? null : 's'}</div>
          </div>
        </div>
        <div className="projects">
          {this.props.projects.map((project, index) => (
            <div key={index}>
              <ProjectDropzone
                category={this.props.category}
                position={index}
                onDrop={this.props.moveProject}
              />
              <Project
                category={this.props.category}
                position={index}
                {...project}
              />
            </div>
          ))}
          <ProjectDropzone
            category={this.props.category}
            position={this.props.projects.length}
            onDrop={this.props.moveProject}
          />
        </div>
      </div>
    )
  }
}

ProjectList.propTypes = {
  category: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  moveProject: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  // Function to map state to properties
  return {
    projects: getProjectsByCategory(state, ownProps.category)
  }
}

function mapDispatchToProps(dispatch) {
  // Function to map dispatch to properties
  return {
    moveProject: (id, fromCategory, fromPosition, toCategory, toPosition) => {
      dispatch(moveProject(id, fromCategory, fromPosition, toCategory, toPosition))
    }
  }
}

ProjectList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)

export default ProjectList
