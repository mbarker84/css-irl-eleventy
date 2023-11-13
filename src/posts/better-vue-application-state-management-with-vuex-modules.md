---
title: 'Better Vue Application State Management with Vuex Modules'
date: '2023-11-13'
tags: ['post', 'National Blog Posting Month', 'javascript']
intro: 'Day 13 of National Blog Posting Month #NaBloPoMo'
---

If you use Vue you might be familiar with the state management library [Vuex](https://vuex.vuejs.org). It used to be the state management library recommended by Vue, until the team developed [Pinia](https://pinia.vuejs.org/). But lots of applications still use Vuex, including the one I work on. This post contains some tips for handling state in a Vue app with Vuex. Some familiarity with building with Vue and Vuex will be assumed.

## The Vuex Store

Using Vuex allows us to manage our application’s state in a global store, which helps avoid “prop drilling” — the process of passing down props through multiple levels of components. Using Vuex we can reach into the store and retrieve part of our state to use in a variable, or mutate the state from inside the component. This example uses Vue’s composition API:

```js
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

/* Retrieve the user from the store */
const name = computed(() => store.state.currentUser.name)
```

Vuex lets us use getters, actions and mutations to better handle this. If `currentUser` is deeply nested within our application’s store, it might be better to abstract that out to a getter function in a separate JS file, avoiding polluting our component file with too much logic.

```js
/* store/index.js */
const store = {
  getters: {
    getUsername: (state) => {
      return store.state.currentUser.name
    },
  },
}
```

```js
/* Component file */
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

/* Retrieve the user from the store */
const name = computed(() => store.getters.getUsername)
```

For large applications, our Vuex store can get out of hand. In the project I’ve been working on, one highly interactive area of the app needed extensive state management. The Vuex store got pretty large, and became difficult to manage. We also ran into the problem of naming things. In such a large store, it was easy to inadvertently end up writing two functions with the same name. At this point, it made sense to split our Vuex store into modules.

## Creating modules

As the name suggests, Vuex modules enable us to split our Vuex store into smaller files. This makes them easier to manage and test, and can help us avoid naming clashes by namespacing the module files.

We don’t have to refactor our entire app to use modules. If we have one particular part of the state that’s getting unwieldy, we can separate it out into its own module, leaving the rest of the application code as it was.

Previously, our store structure might look something like this:

```bash
store
| index.js
| actions.js
| getters.js
| mutations.js
```

Lets add a _modules_ directory, where we can house the getters, actions and mutations associated with the part of the app we’re concerned with (the data explorer section):

```bash
store
| index.js
| actions.js
| getters.js
| mutations.js
| modules
| | dataExplorer
| | | index.js
| | | actions.js
| | | getters.js
| | | mutations.js
```

We’ll create our new module in _store/modules/dataExplorer/index.js_. To keep things better organised, I prefer to import the getters, actions and mutations from their individual files, but you can write them in a single file if you choose.

We’re adding `namespaced: true` to ensure our module is namespaced, otherwise actions, mutations and getters are all registered under the global namespace by default.

```js
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const dataExplorerStore = {
  namespaced: true,
  state: () => {},
  getters,
  mutations,
  actions,
}

export default dataExplorerStore
```

## Registering a module

We’ll need to register the module with the store.

```js
/* store/index.js */
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import dataExplorer from './modules/dataExplorer/index.js'

const store = createStore({
  state: () => {},
  modules: {
    dataExplorer,
  },
  getters,
  mutations,
  actions,
})
```

It’s also possible to register a module dynamically:

```js
store.registerModule('dataExplorer', dataExplorer)
```

Our module will now be in the application state. We can access it in our component files (such as in a computed property):

```js
/* Component file */
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const selectedDates = computed(() => store.state.dataExplorer.startDate)
```

## Local and global state

In our module, `state` refers to the module’s local state. For example, when writing a getter function, `state` here would be `state.dataExplorer` in the global state object:

```js
/* store/dataExplorer/getters.js */
const getters = {
  getStartDate: (state) => state.startDate,
}
```

We can use the namespaces getter function in our component file:

```js
/* Component file */
const selectedDates = computed(() => store.getters['dataExplorer/getStartDate'])
```

If we need to access the root state within a getter, we can use the third and fourth arguments of our getters:

```js
/* store/dataExplorer/getters.js */
const getters = {
  /* Gets startDate from the local state */
  getStartDate: (state) => state.startDate,

  /* Gets startDate from the global state */
  getGlobalStartDate: (state, getters, rootState, rootGetters) => {
    return rootState.startDate
  },
}
```

### Actions

Root getters can be accessed by our actions too:

```js
/* store/dataExplorer/actions.js */
const actions = {
  updateStartDate: ({ dispatch, commit, rootGetters }) => {
    const startDateGlobal = rootGetters.getStartDate
    commit('updateDate', startDateGlobal) // update local state with the date from the global state
  },
}
```

We can also dispatch root actions from our module:

```js
/* store/dataExplorer/actions.js */
const actions = {
  updateStartDate: ({ dispatch, commit }, args) => {
    dispatch('notifyUser', args, { root: true }) // dispatch global action
  },
}
```

To dispatch a local action from a component, we use it like this:

```js
/* Component file */
onBeforeMount(() => {
  store.dispatch('dataExplorer/updateStartDate')
})
```

## Getting organised

Modules are a handy way to manage state in large applications. It’s even possible to [nest modules](https://vuex.vuejs.org/guide/modules.html#namespacing), and to choose whether they inherit the parent namespace.

It’s possible to implement modules incrementally, avoiding an application-wide refactor. So if your global state is getting out of control, it might be worth giving modules a go today.
