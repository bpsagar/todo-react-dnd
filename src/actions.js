import { ADD_PROJECT, MOVE_PROJECT } from './actionTypes'
import { defaultCategory } from './constants'

// Variable for generating ids
let id = 0

export function addProject (name, category = defaultCategory) {
  // Function to create an action to add a new project
  return {
    type: ADD_PROJECT,
    id: id++,
    name,
    category
  }
}

export function moveProject (id, fromCategory, fromPosition, toCategory, toPosition) {
  // Function to create an action to move project across categories or to a
  // different position in the same category 
  return {
    type: MOVE_PROJECT,
    id,
    fromCategory,
    fromPosition,
    toCategory,
    toPosition
  }
}
