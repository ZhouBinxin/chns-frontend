<template>
  <el-tree :data="treeData" :props="defaultProps"></el-tree>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          label: '频繁项集1',
          children: [
            { label: '商品A, 商品B (支持度: 0.3)' },
            { label: '商品B, 商品C (支持度: 0.2)' }
          ]
        },
        {
          label: '频繁项集2',
          children: [
            { label: '商品A, 商品C (支持度: 0.25)' },
            { label: '商品B, 商品D (支持度: 0.18)' }
          ]
        }
        // 可根据实际数据添加更多频繁项集
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>
