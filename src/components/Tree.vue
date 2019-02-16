<template>
<div style="width:25%;margin:auto;border:3px solid grey;padding:10px">
  <!-- margin:auto;border:3px solid green;padding:10px -->
  可以任意拖拉拽的树形图
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"

          :expand-on-click-node="false"
          :render-content="renderContent"
      > <!-- show-checkbox -->
    </el-tree>

    <el-dialog :title="addOrUpdate=='add'?'新增树':'编辑树'" :visible.sync="dialogVisible" width=500px >
      <el-form :model="form" label-position="left" >
        <el-form-item label="新增类型" label-width=100px >
          <el-select  v-model="form.isInner" placeholder="请选择新增树在同级或者子级" :disabled="addOrUpdate=='add'?false:true" size=250px>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="树节点名" label-width=100px>
          <el-input v-model="form.label" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,value=''">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addOrUpdate=='add'?addTree():updateTree(form),value=''">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
// import treeDialog from './treeDialog/treeAddOrModifyDialog'
// let id = 1000
export default {
  name: 'Tree',
  // components: {
  //   treeDialog
  // },
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogVisible: false,
      form: {
        id: -1,
        label: '',
        parentId: -1,
        sort: -1,
        isInner: false
      },
      addOrUpdate: '',
      options: [{
        value: false,
        label: '同级'
      }, {
        value: true,
        label: '子集'
      }],
      value: ''
    }
  },
  created () {
    this.queryTree()
  },
  methods: {
    queryTree () {
      let _this = this
      axios.get('http://localhost:8084/tree/query', {
        params: {
          ID: 12345
        }
      })
        .then(function (response) {
          console.log(response)
          _this.data = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 拖拉和修改使用同一接口
    updateTree (params) {
      debugger
      let _this = this
      axios.put('http://localhost:8084/tree/modify', params)
        .then(function (response) {
          console.log(response.data)
          _this.queryTree()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addTree () {
      // debugger
      let _this = this
      // 判断是否是内部添加
      if (this.form.isInner === true) {
        this.form.parentId = this.form.id
        this.form.sort = 1// 排序为1
      } else {
        this.form.sort = this.form.sort + 1// 同级中新增拍在当前节点后面
      }
      // 恢复id值，后台也不需要。可选
      this.form.id = -1
      axios.post('http://localhost:8084/tree/add', this.form)
        .then(function (response) {
          console.log(response.data)
          _this.queryTree()
        })
        .catch(function (error) {
          console.log(error)
        })
      this.dialogVisible = false
    },
    delete (data1) { // 删除菜单
      let _this = this
      // axios的delete方法较为特殊
      axios.delete('http://localhost:8084/tree/delete', {
        data: data1.id,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }

      })
        .then(function (response) {
          console.log(response.data)
          _this.queryTree()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) { // 拖拽结束的事件
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) { // 最后执行 拖拽成功完成时触发的事件
      debugger
      // before、after、inner
      let params = {
        id: null, parentId: null, sort: null
      }
      params.id = draggingNode.data.id// 被拖动的节点
      switch (dropType) {
        case 'inner':
          params.parentId = dropNode.data.id// 移动到的层级
          params.sort = 1// 移动到的位置,内部放在第一位
          break
        default:// before、after情况一样,因为后台使用了等于。
          params.parentId = dropNode.data.parentId// 移动到的层级
          params.sort = dropNode.data.sort// 移动到的位置
          break
      }
      console.log('tree drop: ', dropNode.label, dropType)
      this.updateTree(params)
    },
    allowDrop (draggingNode, dropNode, type) {
      console.log('allowDrop: ', dropNode.label)
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      // return draggingNode.data.label.indexOf('三级 3-2-2') === -1
      //
      console.log('allowDrag: ', draggingNode)
      return true
    },

    renderContent (h, { node, data, store }) {
      // debugger
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.openDialog('add', data)}>新增</el-button>
            <el-button size="mini" type="text" on-click={ () => this.openDialog('upload', data) }>编辑</el-button>
            <el-button size="mini" type="text" on-click={ () => this.delete(data) }>删除</el-button>
          </span>
        </span>)
    },
    openDialog (addOrUpdate, data) {
      // 打开弹框并绑定数据，为后面确定使用
      console.log('===========', data)
      this.addOrUpdate = addOrUpdate

      this.form.sort = data.sort
      this.form.parentId = data.parentId
      this.form.id = data.id
      if (addOrUpdate === 'upload') { // 编辑需要传label
        this.form.label = data.label
      }
      this.dialogVisible = true
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
