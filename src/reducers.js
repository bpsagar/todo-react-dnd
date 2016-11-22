import Immutable from 'immutable'
import { combineReducers } from 'redux'
import { ADD_PROJECT, MOVE_PROJECT } from './actionTypes'

export function byId (state = Immutable.Map({}), action) {
  // Reducer to store projects in an Immutable map with id as keys and
  // values as project details
  switch (action.type) {
    case ADD_PROJECT:
      let project = { id: action.id, name: action.name }
      return state.set(action.id, Immutable.Map(project))
    default:
      return state
  }
}

export function byCategory (state = Immutable.Map({}), action) {
  // Reducer to store project ids in an Immutable map with categories as keys
  // and array of ids as values
  switch (action.type) {
    case ADD_PROJECT:
      if(!state.has(action.category)) {
        state = state.set(action.category, Immutable.List([]))
      }
      let projects = state.get(action.category).push(action.id)
      return state.set(action.category, projects)
    case MOVE_PROJECT:
      if(!state.has(action.toCategory)) {
        state = state.set(action.toCategory, Immutable.List([]))
      }
      return state.map((items, category) => {
        if (action.fromCategory == category) {
          items = items.remove(action.fromPosition)
        }
        if (action.toCategory == category) {
          let position = action.toPosition
          if (action.fromCategory == action.toCategory) {
            if (action.fromPosition < action.toPosition) {
              position -= 1
            }
          }
          items = items.splice(position, 0, action.id)
        }
        return items
      })
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  byId,
  byCategory
})
