import types from '../mutation-types'

const app = {
  state: {
    sidebar: {
      opened: !localStorage.getItem('sidebarStatus')
    },
    visitedViews: []
  },
  mutations: {
    [types.TOGGLE_SIDEBAR](state) {
      const newOpened = !state.sidebar.opened
      localStorage.setItem('sidebarStatus', newOpened)
      state.sidebar.opened = newOpened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({
        name: view.name,
        path: view.path
      })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit(types.TOGGLE_SIDEBAR)
    },
    addVisitedViews({
      commit
    }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({
      commit,
      state
    }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
