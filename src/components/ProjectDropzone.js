import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../itemTypes'

// Target where the dragged object can be dropped
const projectTarget = {
  drop(props, monitor) {
    let id = monitor.getItem().projectId
    let fromCategory = monitor.getItem().projectCategory;
    let fromPosition = monitor.getItem().projectPosition;
    props.onDrop(id, fromCategory, fromPosition, props.category, props.position)
  }
}

function collect(connect, monitor) {
  // Function that injects properties into ProjectDropzone component
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class ProjectDropzone extends React.Component {
  // Component where a project can be dragged-and-dropped onto
  // On dropping a project onto it, it dispatches a MOVE_PROJECT action
  render () {
    const { projectId, connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div className={ isOver ? "project-dropzone highlighted" : "project-dropzone"}></div>
    )
  }
}

ProjectDropzone.propTypes = {
  category: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default DropTarget(ItemTypes.PROJECT, projectTarget, collect)(ProjectDropzone);
