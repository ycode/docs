---

title: Style Guide
description: 'Get started with ycode.'
position: 3
category: Getting started

---#

> We follow [official Vue.js styleguide](https://vuejs.org/v2/style-guide/), but since it suggest multiple ways of doing thing, we clarified it and highlighted which options we choose and follow in our apps.

## Components

**Filenames of [single-file components](../guide/single-file-components.html) should either be always PascalCase or always kebab-case.**

PascalCase works best with autocompletion in code editors, as it's consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

#### Bad

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

#### Good

```
components/
|- MyComponent.vue
```

#### Component `data` must be a function.

When using the `data` property on a component (i.e. anywhere except on `new Vue`), the value must be a function that returns an object.

```js
// Bad

Vue.component('some-comp', {
  data: {
    foo: 'bar'
  }
})

export default {
  data: {
    foo: 'bar'
  }
}

// Good
Vue.component('some-comp', {
  data: function() {
    return {
      foo: 'bar'
    }
  }
})

export default {
  data() {
    return {
      foo: 'bar'
    }
  }
}
```

It's OK to use an object directly in a root Vue instance, since only a single instance will ever exist.

```js
new Vue({
  data: {
    foo: 'bar'
  }
})
```

#### Prop definitions should be as detailed as possible.

In committed code, prop definitions should always be as detailed as possible, specifying at least type(s).

#### Bad

```js
// Bad (this is only OK when prototyping)
props: ['status']


// Good
props: {
  status: String
}


// Even better!
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}

```

## Conditionals & list render

#### Always use `key` with `v-for`.

`key` with `v-for` is _always_ required on components, in order to maintain internal component state down the subtree. Even for elements though, it's a good practice to maintain predictable behavior, such as [object constancy](https://bost.ocks.org/mike/constancy/) in animations.

```html
<!-- Bad -->
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>

<!-- Good -->
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

#### Never use `v-if` on the same element as `v-for`.

There are two common cases where this can be tempting:

- To filter items in a list (e.g. `v-for="user in users" v-if="user.isActive"`). In these cases, replace `users` with a new computed property that returns your filtered list (e.g. `activeUsers`).

- To avoid rendering a list if it should be hidden (e.g. `v-for="user in users" v-if="shouldShowUsers"`). In these cases, move the `v-if` to a container element (e.g. `ul`, `ol`).

```html
<!-- Bad -->

<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<!-- Good -->
<ul>
  <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<!-- Good -->
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<!-- Good -->
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

## Styling

**For applications, styles in a top-level `App` component and in layout components may be global, but all other components should always be scoped.**

This is only relevant for [single-file components](../guide/single-file-components.html). It does _not_ require that the [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) be used. Scoping could be through [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules.html), a class-based strategy such as [BEM](http://getbem.com/), or another library/convention.

**Component libraries, however, should prefer a class-based strategy instead of using the `scoped` attribute.**

This makes overriding internal styles easier, with human-readable class names that don't have too high specificity, but are still very unlikely to result in a conflict.

```html
<!-- Bad -->

<template>
  <button class="btn btn-close">X</button>
</template>

<style>
  .btn-close {
    background-color: red;
  }
</style>

<!-- Good (using the `scoped` attribute) -->
<template>
  <button class="button button-close">X</button>
</template>

<style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }

  .button-close {
    background-color: red;
  }
</style>

<!-- Good (Using CSS modules / `module` attribute)  -->
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<style module>
  .button {
    border: none;
    border-radius: 2px;
  }

  .buttonClose {
    background-color: red;
  }
</style>

<!-- Good (using CSS naming conventions - BEM in this example) -->
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<style>
  .c-Button {
    border: none;
    border-radius: 2px;
  }

  .c-Button--close {
    background-color: red;
  }
</style>
```

**Use module scoping to keep private functions inaccessible from the outside. If that's not possible, always use the `$_` prefix for custom private properties in a plugin, mixin, etc that should not be considered public API. Then to avoid conflicts with code by other authors, also include a named scope (e.g. `$_yourPluginName_`).**

```js
// Bad

var myGreatMixin = {
  // ...
  methods: {
    update: function() {
      // ...
    }
  }
}

var myGreatMixin = {
  // ...
  methods: {
    _update: function() {
      // ...
    }
  }
}

var myGreatMixin = {
  // ...
  methods: {
    $update: function() {
      // ...
    }
  }
}

var myGreatMixin = {
  // ...
  methods: {
    $_update: function() {
      // ...
    }
  }
}

// Good
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function() {
      // ...
    }
  }
}

// Even better!
var myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```

**Whenever a build system is available to concatenate files, each component should be in its own file.**

This helps you to more quickly find a component when you need to edit it or review how to use it.

```js
// Bad (multiple components defined in single file)
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```

```
# Good (one file per component)

components/
|- TodoList.vue
|- TodoItem.vue
```

**Filenames of [single-file components](../guide/single-file-components.html) should either be always PascalCase or always kebab-case.**

PascalCase works best with autocompletion in code editors, as it's consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

#### Bad

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

#### Good

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

**Base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with a specific prefix, such as `Base`, `App`, or `V`.**

```
# Bad

components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue


# Good

components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue


components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue


components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

**Components that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one.**

This does not mean the component is only used in a single page, but it will only be used once _per page_. These components never accept any props, since they are specific to your app, not their context within your app. If you find the need to add props, it's a good indication that this is actually a reusable component that is only used once per page _for now_.

```
# Bad

components/
|- Heading.vue
|- MySidebar.vue

# Good

components/
|- TheHeading.vue
|- TheSidebar.vue
```

**Child components that are tightly coupled with their parent should include the parent component name as a prefix.**

If a component only makes sense in the context of a single parent component, that relationship should be evident in its name. Since editors typically organize files alphabetically, this also keeps these related files next to each other.

You might be tempted to solve this problem by nesting child components in directories named after their parent. For example:

This isn't recommended, as it results in:

- Many files with similar names, making rapid file switching in code editors more difficult.
- Many nested sub-directories, which increases the time it takes to browse components in an editor's sidebar.

```
# Bad
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue


# Bad
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue

# Bad
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

# Bad
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue


# Good
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

# Good
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

**Component names should start with the highest-level (often most general) words and end with descriptive modifying words.**

```
# Bad
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue


# Good
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

**Components with no content should be self-closing in [single-file components](../guide/single-file-components.html), string templates, and [JSX](../guide/render-function.html#JSX) - but never in DOM templates.**

Components that self-close communicate that they not only have no content, but are **meant** to have no content. It's the difference between a blank page in a book and one labeled "This page intentionally left blank." Your code is also cleaner without the unnecessary closing tag.

Unfortunately, HTML doesn't allow custom elements to be self-closing - only [official "void" elements](https://www.w3.org/TR/html/syntax.html#void-elements). That's why the strategy is only possible when Vue's template compiler can reach the template before the DOM, then serve the DOM spec-compliant HTML.

```html
<!-- Bad (in single-file components, string templates, and JSX) -->
<MyComponent></MyComponent>

<!-- Bad (In DOM templates) -->
<my-component />

<!-- Good (In single-file components, string templates, and JSX) -->
<MyComponent />

<!-- Good (In DOM templates) -->
<my-component></my-component>
```

**In most projects, component names should always be PascalCase in [single-file components](../guide/single-file-components.html) and string templates - but kebab-case in DOM templates.**

PascalCase has a few advantages over kebab-case:

- Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.
- `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).
- If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.

Unfortunately, due to HTML's case insensitivity, DOM templates must still use kebab-case.

Also note that if you've already invested heavily in kebab-case, consistency with HTML conventions and being able to use the same casing across all your projects may be more important than the advantages listed above. In those cases, **using kebab-case everywhere is also acceptable.**

```html
<!-- Bad (In single-file components and string templates) -->
<mycomponent />

<!-- Bad (In single-file components and string templates) -->
<myComponent />

<!-- Bad (In DOM templates) -->
<MyComponent></MyComponent>

<!-- Good (In single-file components and string templates) -->
<MyComponent />

<!-- Good (In DOM templates) -->
<my-component></my-component>

<!-- ...or use this Everywhere -->
<my-component></my-component>
```

**Component names in JS/[JSX](../guide/render-function.html#JSX) should always be PascalCase, though they may be kebab-case inside strings for simpler applications that only use global component registration through `Vue.component`.**

```js
// Bad
Vue.component('myComponent', {
  // ...
})

import myComponent from './MyComponent.vue'

export default {
  name: 'myComponent'
  // ...
}

export default {
  name: 'my-component'
  // ...
}

// Good
Vue.component('MyComponent', {
  // ...
})

Vue.component('my-component', {
  // ...
})

import MyComponent from './MyComponent.vue'

export default {
  name: 'MyComponent'
  // ...
}
```

**Component names should prefer full words over abbreviations.**

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

```
# Bad

components/
|- SdSettings.vue
|- UProfOpts.vue

# Good
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

**Prop names should always use camelCase during declaration, but kebab-case in templates and [JSX](../guide/render-function.html#JSX).**

We're simply following the conventions of each language. Within JavaScript, camelCase is more natural. Within HTML, kebab-case is.

```js
// Bad
props: {
  'greeting-text': String
}
```

```html
<!-- Bad -->
<WelcomeMessage greetingText="hi" />
```

```js
// Good
props: {
  greetingText: String
}
```

```html
<!-- Good -->
<WelcomeMessage greeting-text="hi" />
```

**Elements with multiple attributes should span multiple lines, with one attribute per line.**

In JavaScript, splitting objects with multiple properties over multiple lines is widely considered a good convention, because it's much easier to read. Our templates and [JSX](../guide/render-function.html#JSX) deserve the same consideration.

#### Bad

```html
<!-- Bad -->
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />

<MyComponent foo="a" bar="b" baz="c" />

<!-- Good -->
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />

<MyComponent foo="a" bar="b" baz="c" />
```

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.**

Complex expressions in your templates make them less declarative. We should strive to describe _what_ should appear, not _how_ we're computing that value. Computed properties and methods also allow the code to be reused.

```html
<!-- Bad -->
{{ fullName.split(' ').map(function (word) { return word[0].toUpperCase() +
word.slice(1) }).join(' ') }}
```

```html
<!-- Good -->
{{ normalizedFullName }}
```

Toggether with:

```js
// The complex expression has been moved to a computed property
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

**Complex computed properties should be split into as many simpler properties as possible.**

```js
// Bad
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}


// Good
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

**Non-empty HTML attribute values should always be inside quotes (single or double, whichever is not used in JS).**

While attribute values without any spaces are not required to have quotes in HTML, this practice often leads to _avoiding_ spaces, making attribute values less readable.

```html
<!-- Bad -->
<input type="text" />

<AppSidebar :style={width:sidebarWidth+'px'}>

<!-- Good -->
<input type="text" />

<AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```

**Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always or never.**

```html
<!-- Bad -->
<input v-bind:value="newTodoText" :placeholder="newTodoInstructions" />

<input v-on:input="onInput" @focus="onFocus" />

<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>

<!-- Good -->
<input :value="newTodoText" :placeholder="newTodoInstructions" />

<input v-bind:value="newTodoText" v-bind:placeholder="newTodoInstructions" />

<input @input="onInput" @focus="onFocus" />

<input v-on:input="onInput" v-on:focus="onFocus" />

<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

**Component/instance options should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add new properties from plugins.

1. **Side Effects** (triggers effects outside the component)

- `el`

2. **Global Awareness** (requires knowledge beyond the component)

- `name`
- `parent`

3. **Component Type** (changes the type of the component)

- `functional`

4. **Template Modifiers** (changes the way templates are compiled)

- `delimiters`
- `comments`

5. **Template Dependencies** (assets used in the template)

- `components`
- `directives`
- `filters`

6. **Composition** (merges properties into the options)

- `extends`
- `mixins`

7. **Interface** (the interface to the component)

- `inheritAttrs`
- `model`
- `props`/`propsData`

8. **Local State** (local reactive properties)

- `data`
- `computed`

9. **Events** (callbacks triggered by reactive events)

- `watch`
- Lifecycle Events (in the order they are called)
  - `beforeCreate`
  - `created`
  - `beforeMount`
  - `mounted`
  - `beforeUpdate`
  - `updated`
  - `activated`
  - `deactivated`
  - `beforeDestroy`
  - `destroyed`

10. **Non-Reactive Properties** (instance properties independent of the reactivity system)

- `methods`

11. **Rendering** (the declarative description of the component output)

- `template`/`render`
- `renderError`

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)

- `is`

2. **List Rendering** (creates multiple variations of the same element)

- `v-for`

3. **Conditionals** (whether the element is rendered/shown)

- `v-if`
- `v-else-if`
- `v-else`
- `v-show`
- `v-cloak`

4. **Render Modifiers** (changes the way the element renders)

- `v-pre`
- `v-once`

5. **Global Awareness** (requires knowledge beyond the component)

- `id`

6. **Unique Attributes** (attributes that require unique values)

- `ref`
- `key`

7. **Two-Way Binding** (combining binding and events)

- `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)

- `v-on`

10. **Content** (overrides the content of the element)

- `v-html`
- `v-text`

**You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.**

When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.

```js
// Good
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue: function () {
    // ...
  },

  inputClasses: function () {
    // ...
  }
}

// No spaces are also fine, as long as the component
// is still easy to read and navigate.
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue: function () {
    // ...
  },
  inputClasses: function () {
    // ...
  }
}
```

**[Single-file components](../guide/single-file-components.html) should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.**

```html
<!-- Bad -->
<style>
  /* ... */
</style>
<script>
  /* ... */
</script>
<template>...</template>

<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>

<!-- Good -->

<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>
```

**It's usually best to use `key` with `v-if` + `v-else`, if they are the same element type (e.g. both `<div>` elements).**

By default, Vue updates the DOM as efficiently as possible. That means when switching between elements of the same type, it simply patches the existing element, rather than removing it and adding a new one in its place. This can have [unintended consequences](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-priority-d-rules-unintended-consequences) if these elements should not actually be considered the same.

```html
<!-- Bad -->
<div v-if="error">
  Error: {{ error }}
</div>
<div v-else>
  {{ results }}
</div>

<!-- Good -->
<div v-if="error" key="search-status">
  Error: {{ error }}
</div>
<div v-else key="search-results">
  {{ results }}
</div>
```

**Element selectors should be avoided with `scoped`.**

Prefer class selectors over element selectors in `scoped` styles, because large numbers of element selectors are slow.

```html
<!-- Bad -->
<template>
  <button>X</button>
</template>

<style scoped>
  button {
    background-color: red;
  }
</style>

<!-- Good -->
<template>
  <button class="btn btn-close">X</button>
</template>

<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```

**Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.**

An ideal Vue application is props down, events up. Sticking to this convention makes your components much easier to understand. However, there are edge cases where prop mutation or `this.$parent` can simplify two components that are already deeply coupled.

The problem is, there are also many _simple_ cases where these patterns may offer convenience. Beware: do not be seduced into trading simplicity (being able to understand the flow of your state) for short-term convenience (writing less code).

```js
// Bad
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: '<input v-model="todo.text">'
})

Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeTodo() {
      var vm = this
      vm.$parent.todos = vm.$parent.todos.filter(function(todo) {
        return todo.id !== vm.todo.id
      })
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        X
      </button>
    </span>
  `
})

// Good
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})

Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        X
      </button>
    </span>
  `
})
```

**[Vuex](https://github.com/vuejs/vuex) should be preferred for global state management, instead of `this.$root` or a global event bus.**

Managing state on `this.$root` and/or using a [global event bus](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) can be convenient for very simple cases, but it is not appropriate for most applications.

Vuex is the [official flux-like implementation](https://vuejs.org/v2/guide/state-management.html#Official-Flux-Like-Implementation) for Vue, and offers not only a central place to manage state, but also tools for organizing, tracking, and debugging state changes. It integrates well in the Vue ecosystem (including full [Vue DevTools](https://vuejs.org/v2/guide/installation.html#Vue-Devtools) support).

```js
// Bad
new Vue({
  data: {
    todos: []
  },
  created: function() {
    this.$on('remove-todo', this.removeTodo)
  },
  methods: {
    removeTodo: function(todo) {
      var todoIdToRemove = todo.id
      this.todos = this.todos.filter(function(todo) {
        return todo.id !== todoIdToRemove
      })
    }
  }
})
```

```js
// Good
export default {
  state: {
    list: []
  },
  mutations: {
    REMOVE_TODO(state, todoId) {
      state.list = state.list.filter(todo => todo.id !== todoId)
    }
  },
  actions: {
    removeTodo({ commit, state }, todo) {
      commit('REMOVE_TODO', todo.id)
    }
  }
}
```

Together with:

```html
<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo(todo)">
      X
    </button>
  </span>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    methods: mapActions(['removeTodo'])
  }
</script>
```
