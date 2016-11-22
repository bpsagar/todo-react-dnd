import Immutable from 'immutable'
import expect from 'expect'
import { it, describe } from 'mocha'
import { ADD_PROJECT, MOVE_PROJECT } from '../actionTypes'
import { byId, byCategory } from '../reducers'

describe('Reducers', () => {
  describe('byId', () => {
    it('should return the initial state', () => {
      expect(byId(undefined, {}).toJS()).toEqual({})
    })

    it('should handle ADD_PROJECT action', () => {
      let action = {
        type: ADD_PROJECT,
        id: 0,
        name: 'Project 1',
        category: 'To do'
      }
      let expectedState = { 0: { id: 0, name: 'Project 1' } }
      let state = byId(Immutable.Map({}), action)
      expect(state.toJS()).toEqual(expectedState)
    })
  })

  describe('byCategory', () => {
    it('should return the initial state', () => {
      expect(byCategory(undefined, {}).toJS()).toEqual({})
    })

    it('should handle ADD_PROJECT action', () => {
      let action = {
        type: ADD_PROJECT,
        id: 0,
        name: 'Project 1',
        category: 'To do'
      }
      let expectedState = { 'To do': [ 0 ] }
      let state = byCategory(Immutable.Map({}), action)
      expect(state.toJS()).toEqual(expectedState)
    })

    it('should handle MOVE_PROJECT action: To an empty category', () => {
      let action = {
        type: MOVE_PROJECT,
        id: 0,
        fromCategory: 'To do',
        toCategory: 'In Progress',
        fromPosition: 0,
        toPosition: 0
      }
      let initialState = { 'To do': [ 0 ] }
      let expectedState = { 'To do': [ ], 'In Progress': [ 0 ] }
      let state = byCategory(Immutable.fromJS(initialState), action)
      expect(state.toJS()).toEqual(expectedState)
    })

    it('should handle MOVE_PROJECT action: To non-empty category', () => {
      let action = {
        type: MOVE_PROJECT,
        id: 1,
        fromCategory: 'To do',
        fromPosition: 1,
        toCategory: 'In Progress',
        toPosition: 2
      }
      let initialState = { 'To do': [ 0, 1, 2 ], 'In Progress': [ 4, 5, 6] }
      let expectedState = { 'To do': [ 0, 2 ], 'In Progress': [ 4, 5, 1, 6 ] }
      let state = byCategory(Immutable.fromJS(initialState), action)
      expect(state.toJS()).toEqual(expectedState)
    })

    it('should handle MOVE_PROJECT action: Within a category down', () => {
      let action = {
        type: MOVE_PROJECT,
        id: 1,
        fromCategory: 'To do',
        fromPosition: 1,
        toCategory: 'To do',
        toPosition: 3
      }
      let initialState = { 'To do': [ 0, 1, 2 ] }
      let expectedState = { 'To do': [ 0, 2, 1 ] }
      let state = byCategory(Immutable.fromJS(initialState), action)
      expect(state.toJS()).toEqual(expectedState)
    })

    it('should handle MOVE_PROJECT action: Within a category up', () => {
      let action = {
        type: MOVE_PROJECT,
        id: 2,
        fromCategory: 'To do',
        fromPosition: 2,
        toCategory: 'To do',
        toPosition: 0
      }
      let initialState = { 'To do': [ 0, 1, 2 ] }
      let expectedState = { 'To do': [ 2, 0, 1 ] }
      let state = byCategory(Immutable.fromJS(initialState), action)
      expect(state.toJS()).toEqual(expectedState)
    })
  })
})
