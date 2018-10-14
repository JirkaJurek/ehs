import Cell from './Cell.vue'
import TreeNode from './TreeNode.vue'


import Tree from 'vue-drag-sort-tree'
let tree = Tree(Cell);
tree.components.TreeNode.render = TreeNode.render;
tree.components.TreeNode.data = TreeNode.data;
Object.assign(tree.components.TreeNode.methods, TreeNode.methods);

export default tree;