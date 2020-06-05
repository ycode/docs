# Components

Component names should always be multi-word, except for root `App` components, and built-in components provided by Vue, such as `<transition>` or `<component>`.

This [prevents conflicts](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) with existing and future HTML elements, since all HTML elements are a single word.

```js
// Bad
Vue.component('todo', {
  // ...
})

export default {
  name: 'Todo'
  // ...
}

// Good
Vue.component('todo-item', {
  // ...
})
```

```js
export default {
  name: 'TodoItem'
  // ...
}
```

### Component `data` must be a function.

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

### Prop definitions should be as detailed as possible.

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
