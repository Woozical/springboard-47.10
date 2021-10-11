class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    this.nodes = new Set([...this.nodes, ...vertexArray]);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let n of vertex.adjacent){
      this.removeEdge(vertex, n);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const arr = [];
    const seen = new Set([start]);
    const visitStack = [start];
    while (visitStack.length){
      let currNode = visitStack.pop();
      arr.push(currNode.value);
      for (let adj of currNode.adjacent){
        if (!seen.has(adj)){
          visitStack.push(adj);
          seen.add(adj);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start, values=true) {
    const arr = [];
    const seen = new Set([start]);
    const visitQueue = [start];
    while (visitQueue.length){
      let currNode = visitQueue.shift();
      values ? arr.push(currNode.value) : arr.push(currNode);
      for (let adj of currNode.adjacent){
        if (!seen.has(adj)){
          visitQueue.push(adj);
          seen.add(adj);
        }
      }
    }
    return arr;
  }

  // BFS shortest path, returns an array of node values showing the shortest traversal path
  bfs_shortest(start, end){
    const traverse = this.breadthFirstSearch(start, false);
    const path = [end.value];
    let cNode = end;
    // start at the end and work our way back to the start
    for (let i = traverse.indexOf(end)-1; i > -1; i--){
      // if we can finish the path from our current node, do so
      if (cNode.adjacent.has(start)){
        path.push(start.value);
        break;
      }
      // get next node in traversal, if it's adjacent to our current node, move to it and add it to the path
      let next = traverse[i];
      if (cNode.adjacent.has(next)){
        path.push(next.value);
        cNode = next;
      }
    }
    // return an empty array if there is no path
    return path.length > 1 ? path.reverse() : [];
  }
}

// [
//   'Y', 'X', 'R', 'W',
//   'P', 'U', 'Q', 'V',
//   'T', 'S'
// ]


module.exports = {Graph, Node}