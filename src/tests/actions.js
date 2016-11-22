import expect from 'expect'
import { describe, it } from 'mocha'
import { ADD_PROJECT, MOVE_PROJECT } from '../actionTypes'
import { addProject, moveProject } from '../actions'

describe('Action creators', () => {
  // Tests for action creators
  it('should create an action to add a project', () => {
    const id = 0
    const name = 'Project 1'
    const category = 'To do'
    const expectedAction = { type: ADD_PROJECT, id, name, category }
    expect(addProject(name)).toEqual(expectedAction)
  })

  it('should create an action to move a project', () => {
    const id = 0
    const fromCategory = 'To do'
    const fromPosition = 0
    const toCategory = 'In Progress'
    const toPosition = 1
    const expectedAction = {
      type: MOVE_PROJECT,
      id,
      fromCategory,
      fromPosition,
      toCategory,
      toPosition
    }
    expect(moveProject(
      id, fromCategory, fromPosition, toCategory, toPosition
      )).toEqual(expectedAction)
  })
})
