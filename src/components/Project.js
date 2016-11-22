import React, { PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../itemTypes'

// Object that describes the draggable source
const projectSource = {
  beginDrag(props) {
    return {
      projectId: props.id,
      projectCategory: props.category,
      projectPosition: props.position
    }
  }
}

function collect (connect, monitor) {
  // Function to inject properties in the Project component
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Project extends React.Component {
  // Draggable component which displays Project name
  render () {
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div className={ isDragging ? "project is-dragging" : "project"}>
        {this.props.name}
      </div>
    )
  }
}

Project.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired
}

export default DragSource(ItemTypes.PROJECT, projectSource, collect)(Project)
