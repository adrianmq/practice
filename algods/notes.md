<!-- ### notes on algorithms ### -->

# Graph

- tool for modelling complex relationships
- an adjacent matrix is the most common way of representing a graph
- adjacency lists and adjacency sets are alternative data representations

- fundamental ways of traversing:
  - depth-first: all nodes in certain direction visited together
  - breadth-first: all nodes of same distance from origin visited together
  * aspects:
    - no designated root
    - multiple paths possible between any pair of nodes
    - cycles possible
    - nodes could be visited multiple times (could lead to infinite loop)
    - essential to track which nodes already visited
    - explicitly ensure each node is visited only once and all nodes are visited
    - unconnected nodes possible

- consist of:
  - vertices (entities)
  - edges (relationships)

- relationships:
  - directed (one direction)
  - undirected (both directions)

- terminoloogy:
  - adjacent nodes (single edge)
  - degree of a node (number of edges incident on F)
  - path (serie of edges that links node A to B)
  - cycle (path to starting node) (undirected cyclic graph)
  - undirected acyclic graph (no path to starting node)
  - connected / disconnected graph
  - connected graph with no Cycle == tree (can assign any node as root, great for depicting hierarchical relationships)
  - forest: set of disjoint trees
  - directed acyclic graphs (DAGs):
    - scheduling tasks
    - evaluating expressions
    * neural network computation graph
  - in-degree of a node is the number of directed edges that directly flow into that node

- overview:
  - DAGs are extremely versatile constructs
  - application of DAGs include building neural network models
  - DAGs specify precedence relationships between nodes
  - any ordering of all nodes that satisfies all relationships is a topological sort

- representation in code:
  - adjacency matrices (symetric for undirected graphs / asymetric)
  - adjacency lists
    - flaws:
      - order matters in list, thus the same graph can have multiple representations
      - deletion of a node is inefficient, requires iterations through all adjacency lists
  - adjacency sets
    - addresses adjacency lists flaws

- comparison for graph representation
  *adjacency:                |    matrix      |     list        |     set
  - space required:               O(V^2)            O(E+V)            O(E+V)
  - check if edge is present:     O(1)              O(degree V)       O(ln(degree V))
  - iterating over edges:         O(V)              O(degree V)       O(degree V)
  /*

- three common graph problems
  - establishing precedence (topological sort)
    - a topological sort is any ordering of all the DAGs vertices that satisfies all precedence relationships
    - start the procedure by visiting any node that has in-degree = 0 (otherwise graph has cycle, and procedure not possible)
    - complexity: O(V+E)
    - each edge/vertex visited exactly once
    - eg: computational graphs in neural networks

  - getting from point A to point B (shortest path algorithms)
    - focus on the most efficient route between a pair of nodes
    - widely used in transportation and scheduling
    - edge weights determine the cost of a path in such algorithms
    - if all edge weights are equal, use the unweighted shortest path algorithm
    *comparison:
      - unweighted:
        - all edges have equal weights
        - shortest path has smallest number of hops
        - unweighted shortes path algo (distance table[3-column array], backtracking[stack])
        - time complexity:
          - adjacency matrix: O(V^2)
          - adjacency list/set: O(V+E)
      - weighted:
        - edges have differing weights
        - shortest path has lowest sum weights along path
        - Djisktra's algorithm (distance table[3-column array], backtracking[stack], priority queue(heap or array))
        - time complexity:
          - priority queue (heap): O(E ln(V))
          - priority queue (array: O(E + V^2)
    /*
    *unweighted shortes path algorithm / Djikstra's algoritm
      - enqueuing neighbors: any order / decreasing order of weight
      - calculating distance: number of hops / sum of weights
      - visited nodes: don't update distance to visited nodes / re-calculate distance to visited nodes, update if needed
      - enqueuing visited nodes: never re-enqueue visited nodes / re-enqueue if distance was updated
    /*
    - eg: deliveries from warehouses to customers

  - covering all nodes in a graph (minimum spanning tree algorithms)
    - multiple spanning trees may exist for a graph (no cycles)
    - minimum spanning tree for a graph with the lowest weight
    - seek to find the shortest way to cover all nodes
    - are used when start and end nodes do not matter
    - algos:
      - Prim's for connected graph
        - greedy for a undirected graph
        - considers edges in continous order
        - benefit: intermediate result is a tree as well
        - drawback: does not work for disconnected graphs
        - implementation heavily drawn from Dijkstra
        - distance table, but with edge weight as the distance
        - requires priority queue to find edge with lowest cost
        - time complexity:
          - binary heap: O(E ln(V))
          - array: O(E + V^2)
      - Kruskal's works even for disconnected graphs
        - greedy for weighted undirected graph
    - eg: planning railway lines

# Tree

## Heap
  - gurantees that elements on higher levels are greater(for max-heap) than elements on lower levels
  - complete binary tree typically represented as an array
    - the root will be at Arr[0]
    - indexes of other nodes, for the Ith node, Arr[i]:
        Arr[(i-1)/2]  Returns the parent node
        Arr[(2*i)+1]  Returns the left child node
        Arr[(2*i)+2]  Returns the right child node
  - min/max heaps
  - applications:
    - heap sort with binary tree to sort array O(nlogn)
    - priority queue
    - graph algorithms
    - k'th largest element in an array; sort almost sorted array; merge k sorted arrays

## Binary Search Tree
  - node-based binary tree data structure
    - left subtree of a node contains only nodes with keys lesser than the node's key
    - right subtree of a node contains only nodes with keys greater than the node's key
    - left and right subtree each must also be a binary search tree
    - there must be no duplicate nodes
  - insertion is always as leaf
  - delete:
    - node is leaf then simply remove from tree
    - node has one child, then copy the child to the node and delete the child
    - node to be deleted has two children, then find the inorder successor (only when right child isn't empty), copy the contents of the successor to the node and delete the inorder successor (can use inorder predecessor)
  - time-complexity:
    - worst case for search/insert/delete is O(n)
    - search and insert is O(h), where h is the height of the tree
  - traversals:
    - depth first traversals:
      - inorder (left, root, right):
        - always produces sorted output
        - a BST can be constructed with only preorder or postorder os level order traversal
        - number of unique BSTs with n distinct keys is catalan number
        - inorder successor is always either a leaf node or a node with empty left child
      - preorder (root, left, right):
      - postorder (left, right, root):
    - breadth/level first traversal:

  - binary heap vs BST
    Type      BST (*)   Heap
    Insert    average   log(n)    1
    Insert    worst     log(n)    log(n) or n (***)
    Find any  worst     log(n)    n
    Find max  worst     1 (**)    1
    Create    worst     n log(n)  n
    Delete    worst     log(n)    log(n)  
