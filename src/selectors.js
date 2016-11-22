import Immutable from 'immutable'

export function getProjectsByCategory(state, category) {
  // Returns the list of projects belonging to the given category
  if(!state.byCategory.has(category)) {
    return []
  }
  return state.byCategory.get(category).map((id) => (state.byId.get(id))).toJS()
}

export function getTotalProjects(state) {
  // Return the total count of projects
  return state.byId.toArray().length
}
