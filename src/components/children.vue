<template>
    <div>
       <h3>子组件</h3>
        {{value}}
    </div>
</template>

<script>
export default {
  name: '',
  popus: 'value',
  data () {
    return {
      flag: 'inner-component'
    }
  },
  methods: {

    m2 () {

    }
  },

  components: {

  }

}
</script>
