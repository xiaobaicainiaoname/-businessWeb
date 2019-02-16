<template>
    <div>
        <!-- 过滤器 -->
        <div>{{3.1415|number(2)}}</div>
        <!-- 在 `v-bind` 中 -->
<!-- <div v-bind:id="rawId | formatId"></div> -->
        <innerComponent/><!--这个不行-->
        <inner-component/>
        <!-- 缓存非活动组件 -->
        <keep-alive>
            <!-- 动态组件 flag定义的属性 -->
            <component :is="flag"/>
        </keep-alive>
        <!-- <button @click="m2">父<button/> -->
        ============向子绑定数据传递==============
        <children :value.sync="parameter"/>
    </div>
</template>

<script>
import children from './children'
export default {
  name: '',
  data () {
    return {
      flag: 'inner-component',
      parameter: 'abc'
    }
  },
  methods: {
    m1: function (params) {

    },
    m2 () {

    }
  },
  filters: {// 过滤器 可以用于过滤数据转换 如“1”代表“上线” 可过滤转显示成上线
    number: function (data, n) { // data要过滤的数据
      return data.toFixed(n)// toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
    }
  },
  watch: {// 监听

  },
  components: {
    'inner-component': {// 局部组件
      // template: '<template><div><h3>{{name1}}</h3></div></template>', // 'innerComponent',
      template: '<h3>1111</h3>', // 'innerComponent',
      // template: '#t',
      data () {
        return {
          name1: 'a'
        }
      }
    },
    children
  }

}
</script>
