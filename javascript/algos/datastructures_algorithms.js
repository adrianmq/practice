// ----- 1
// Array = linear collection of elements, that can be accessed via indices
// -----

// js - specialized type of object, not as efficient as implemented in other languages
// js - elements don't have to be of same type
// js - pass by reference (shallow copy)
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = i+1;
}
var samenums = nums;
nums[0] = 400;
print(samenums[0]); // displays 400

// js - deep copy || JSON.parse(JSON.stringify())
function copy(arr1, arr2) {
    for (var i = 0; i < arr1.length; ++i) {
        arr2[i] = arr1[i];
    }
}

// js - accessor functions: indexOf, lastIndexOf, join, toString, concat, splice,
// js - mutator functions: push, pop, shift, unshift, sort
// js - iterator functions:  forEach, map, reduce, reduceRight, filter
var nums = [1,2,3,7,8,9];
var newElements = [4,5,6];
nums.splice(3,0,newElements);
print(nums); // 1,2,3,4,5,6,7,8,9

// js - arrays are only one-dimensional, but by creating AoA you can have multidimensional arrs
// js - creating an AoA
Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}
var nums = Array.matrix(5,5,0);
print(nums[1][1]); // displays 0

// Processing two dimensional arrays
// - accesing array elements by column / row
// - jagged arrays = different number of elements
var grades = [[89, 77, 78],[76, 82, 81],[91, 94, 89]];
var total = 0;
var average = 0.0;
for (var row = 0; row < grades.length; ++row) {
    for (var col = 0; col < grades[row].length; ++col) {
        total += grades[row][col]; // access by column !! same approach for jagged arrays
        // total += grades[col][row]; // access by row !!! must be matrix
    }
    average = total / grades[row].length;
    print("Student " + parseInt(row+1) + " average: " +
    average.toFixed(2));
    total = 0;
    average = 0.0;
}

// js - array in objects
function weekTemps() {
    this.dataStore = [];
    this.add = add;
    this.average = average;
}
function add(temp) {
    this.dataStore.push(temp);
}
function average() {
    var total = 0;
    for (var i = 0; i < this.dataStore.length; ++i) {
        total += this.dataStore[i];
    }
    return total / this.dataStore.length;
}
var thisWeek = new weekTemps();
thisWeek.add(52);
thisWeek.add(55);
print(thisWeek.average());



// ----- 2
// Lists = an ordered sequence of data
//  - not recommended if: 
//      - data in sorted order
//      - perform searches on the items
//      - perform complex sorts or deal with more complex data structures
//  - list abstract data type ADT
// -----

// operations: - append element to end of list, insert after existing or at the begining, remove
// - an iterator allows us to traverse a list without referencing the internal storage mechanism of the List class.
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = []; // initializes an empty array to store list elements
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.length = length;
    this.contains = contains;
}
function append(element) {
    this.dataStore[this.listSize++] = element;
}
function find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return
}
function remove(element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        --this.listSize;
        return true;
    }
    return false;
}
function length() {
    return this.listSize;
}
function toString() {
    return this.dataStore;
}
function insert(element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}
function clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}
function contains(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}
function front() {
    this.pos = 0;
}
function end() {
    this.pos = this.listSize-1;
}
function prev() {
    if (this.pos > 0) {
        --this.pos;
    }
}
function next() {
    if (this.pos < this.listSize-1) {
        ++this.pos;
    }
}
function currPos() {
    return this.pos;
}
function moveTo(position) {
    this.pos = position;
}
function getElement() {
    return this.dataStore[this.pos];
}

// Advantages of using iterators over using array indexing:
//  - Not having to worry about the underlying data storage structure when accessing list elements
//  - Being able to update the list and not having to update the iterator, where an index becomes invalid when a new element is added to the list
//  - Providing a uniform means of accessing elements for different types of data stores used in the implemenation of a List class
// iterator traverse through a list
for(names.front(); names.currPos() < names.length(); names.next()) {
    print(names.getElement());
}
for(names.end(); names.currPos() >= 0; names.prev()) {
    print(names.getElement());
}



// ----- 3
// Stacks = list of elements that are accesible only from one end of the list (list-like data structure)
//      - data can be added or removed only from top of the stack 
//      - last-in, first-out (LIFO) data structure
//      - used extensively in programming language implementations for everything from expression evaluation to handling function calls 
// -----
function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
}
function push(element) {
    this.dataStore[this.top++] = element;
}
function pop() {
    return this.dataStore[--this.top];
}
function peek() {
    return this.dataStore[this.top-1];
}
function length() {
    return this.top;
}
function clear() {
    this.top = 0;
}

// example: multiple base conversion algorithm
function mulBase(num, base) {
    var s = new Stack();
    do {
        s.push(num % base);
        num = Math.floor(num /= base);
    } while (num > 0);
    var converted = "";
    while (s.length() > 0) {
        converted += s.pop();
    }
    return converted;
}
// example: palindrome
function isPalindrome(word) {
    var s = new Stack();
    for (var i = 0; i < word.length; ++i) {
        s.push(word[i]);
    }
    var rword = "";
    while (s.length() > 0) {
        rword += s.pop();
    }
    if (word == rword) {
        return true;
    }
    else {
        return false;
    }
}
// example: factorial 5! = 5 * 4 * 3 * 2 * 1 = 120
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    else {
        return n * factorial(n-1);
    }
}
function fact(n) {
    var s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    var product = 1;
    while (s.length() > 0) {
        product *= s.pop();
    }
    return product;
}
print(factorial(5)); // displays 120
print(fact(5)); // displays 120



// ----- 4
// Queues = list of elements where data is inserted at the end and are removed from the front
//      - first-in, first-out (FIFO) data structure
//      - usage: order processes submitted to an OS
// -----
function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
function enqueue(element) {
    this.dataStore.push(element);
}
function dequeue() {
    return this.dataStore.shift();
}
function front() {
    return this.dataStore[0];
}
function back() {
    return this.dataStore[this.dataStore.length-1];
}
function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + "\n";
    }
    return retStr;
}
function empty() {
    if (this.dataStore.length == 0) {
        return true;
    }
    else {
        return false;
    }
}

// example: sorting data with queues (radix sort)
function distribute(nums, queues, n, digit) { // digit represents either the 1s or 10s place
    for (var i = 0; i < n; ++i) {
        if (digit == 1) {
            queues[nums[i]%10].enqueue(nums[i]);
        }
        else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}
function collect(queues, nums) {
    var i = 0;
    for (var digit = 0; digit < 10; ++digit) {
        while (!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}
function dispArray(arr) {
    for (var i = 0; i < arr.length; ++i) {
        putstr(arr[i] + " ");
    }
}
for (var i = 0; i < 10; ++i) {
    queues[i] = new Queue();
}
var nums = [];
for (var i = 0; i < 10; ++i) {
    nums[i] = Math.floor(Math.floor(Math.random() * 101));
}
print("Before radix sort: ");
dispArray(nums);
distribute(nums, queues, 10, 1);
collect(queues, nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);
print("\n\nAfter radix sort: ");
dispArray(nums);

// example: priority queues
function Patient(name, code) {
    this.name = name;
    this.code = code;
}
function dequeue() {
    var priority = this.dataStore[0].code;
    for (var i = 1; i < this.dataStore.length; ++i) {
        if (this.dataStore[i].code < priority) {
            priority = i;
        }
    }
    return this.dataStore.splice(priority,1);
}
function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i].name + " code: "+ this.dataStore[i].code + "\n";
    }
    return retStr;
}



// ----- 5
// Linked lists = a collection of objects called nodes (another type of list)
//      - each node is linked to a successor node in the list using an object reference (link)
//      - marking the begining can be difficult (use head node)
//      - inserting/removing a node is a very efficient task
//      - array elements are referenced by their position, linked list elements are referenced by their relationship to other
//      - usage: situation where a one-dimensional array is used, except when there's need for random access to elements
//  js - arrays are implemented as objects, causing them to be less efficient than C++ or Java.
// -----
function Node(element) {
    this.element = element;
    this.next = null;
}
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}
function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}
function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}
function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        print(currNode.next.element);
        currNode = currNode.next;
    }
}
function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();

// Double linked-lists = backward traversing
function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
}
function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        print(currNode.element);
        currNode = currNode.previous;
    }
}
function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}
function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}
function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        print(currNode.next.element);
        currNode = currNode.next;
    }
}
function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
print();
cities.remove("Carlisle");
cities.display();

// Circulary linked lists - changes
function LList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}
function display() {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        !(currNode.next.element == "head")) {
        print(currNode.next.element);
        currNode = currNode.next;
    }
}

// Other linked list functions
// advance(n) - advances n nodes in the linked list
// back(n) - moves n nodes backward in a doubly linked list
// show(n) - displays the current node only



// ----- 6
// Dictionaries = data structure that stores data as key-value pair
//      - the key is the element you use to perform the search
//      - usage: Dictionary class - Array class as basis (for sort)
//  js - object designed to operate as a dictionary
// -----
function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
}
function add(key, value) {
    this.datastore[key] = value;
}
function find(key) {
    return this.datastore[key];
}
function remove(key) {
    delete this.datastore[key];
}
function showAll() {
    for each (var key in Object.keys(this.datastore).sort()) {
        print(key + " -> " + this.datastore[key]);
    }
}
function count() {
    var n = 0;
    for each (var key in Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}
function clear() {
    for each (var key in Object.keys(this.datastore)) {
        delete this.datastore[key];
    }    
}
var pbook = new Dictionary();
pbook.add("Raymond","123");
pbook.add("David", "345");
pbook.add("Cynthia", "456");
print("Number of entries: " + pbook.count());
print("David's extension: " + pbook.find("David"));
pbook.showAll();
pbook.clear();
print("Number of entries: " + pbook.count());



// ----- 7
// Hash table = common technique for storing data in such way that the data can be inserted and retrieved very quickly
//      - provide fast insertion, deletion and retrival
//      - poorly for operations that involve searching (min <> max values) (binary tree better)
//      - designed around array with predetermined size
//      - key is mapped into a number in the range of 0 through the hash table size, using a hash function
//      - collisions
// -----
function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
}
function put(data) {
    var pos = this.betterHash(data);
    this.table[pos] = data;
}
function get(key) {
    return this.table[this.betterHash(key)];
}
function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    return total % this.table.length;
}
function betterHash(string, arr) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
       total += H * total + string.charCodeAt(i);
    }
    total = total % arr.length;
    return parseInt(total);
}
function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
        if (this.table[i] != undefined) {
            print(i + ": " + this.table[i]);
        }
    }
}
var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; ++i) {
    hTable.put(someNames[i]);
}
hTable.showDistro();

// Hashing integer keys
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function genStuData(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var num = "";
        for (var j = 1; j <= 9; ++j) {
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50, 100);
        arr[i] = num;
    }
}

// Handling collisions: separate chaining vs linear probing



// ----- 8
// Sets = is an unordered collection of related members in which no memberoccurs more than once
//      - members are unordered and unique
//      - list of members surrounded by curly braces
//      - the order doesn't matter
//      - set without members is an empty set
//      - two sets are equal if they have exactly the same members
//      - operations: union, intersection, difference
// -----
function Set() {
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.size = size;
    this.union = union;
    this.intersect = intersect;
    this.subset = subset;
    this.difference = difference;
    this.show = show;
}
function add(data) {
    if (this.dataStore.indexOf(data) < 0) {
        this.dataStore.push(data);
        return true;
    }
    else {
        return false;
    }
}
function remove(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
        this.dataStore.splice(pos,1);
        return true;
    }
    else {
        return false;
    }
}
function contains(data) {
    if (this.dataStore.indexOf(data) > -1) {
        return true;
    }
    else {
        return false;
    }
}
function union(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        tempSet.add(this.dataStore[i]);
    }
    for (var i = 0; i < set.dataStore.length; ++i) {
        if (!tempSet.contains(set.dataStore[i])) {
            tempSet.dataStore.push(set.dataStore[i]);
        }
    }
}
function intersect(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}
function difference(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (!set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}
function subset(set) {
    if (this.size() > set.size()) {
        return false;
    }
    else {
        for each (var member in this.dataStore) {
            if (!set.contains(member)) {
                return false;
            }
        }
    }
    return true;
}
function size() {
    return this.dataStore.length;
}
function show() {
    return this.dataStore;
}



// ----- 9
// Binary trees = nonlinear data structure used to store data in a hierarchical manner
//      - quick search (as opposed to a linked list)
//      - quick insert and delete (as opposed to an array)
//      - made of nodes connected by edges
//      - root node is level 0, its children are at level 1, and so on
//      - node at any level is considered the root of subtree
//      - restrict the number of child nodes to no more than two
// Binary search tree
//      - traversal functions used: inorder, preorder, postorder
//      - inorder: visits all the nodes of a BST in ascending order of the node key values
//      - preorder: visits the root node first, followed by the nodes in the subtrees under the left child of the root node, followed by the nodes in the subtrees under the right child of the root node
//      - postorder: visits all of the child nodes of the left subtree up to the root node, and then visits all of the child nodes of the right subtree up to the root node
// -----
// The BST and Node class
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}
function show() {
    return this.data;
}
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
}
function insert(data) {
    var n = new Node(data, null, null);
    if (this.root == null) {
        this.root = n;
    }
    else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                if (current == null) {
                    parent.left = n;
                    break;
                }
            }
            else {
                current = current.right;
                if (current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}
function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.left);
        putstr(node.show() + " ");
        inOrder(node.right);
    }
}
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
print("Inorder traversal: ");
inOrder(nums.root);
function preOrder(node) {
    if (!(node == null)) {
        putstr(node.show() + " ");
        preOrder(node.left);
        preOrder(node.right);
    }
}
function postOrder(node) {
    if (!(node == null)) {
        postOrder(node.left);
        postOrder(node.right);
        putstr(node.show() + " ");
    }
}
// Inorder traversal:
// 3 16 22 23 37 45 99
// Preorder traversal:
// 23 16 3 22 45 37 99
// Postorder traversal:
// 3 22 16 37 99 45 23
// 
// BST searches
//      - searching for a particular value
//      - searching for the minimum value
//      - searching for the maximum value
function getMin() {
    var current = this.root;
    while (!(current.left == null)) {
        current = current.left;
    }
    return current.data;
}
function getMax() {
    var current = this.root;
    while (!(current.right == null)) {
        current = current.right;
    }
    return current.data;
}
function find(data) {
    var current = this.root;
    while (current.data != data) {
        if (data < current.data) {
            current = current.left;
        }
        else {
            current = current.right;
        }
        if (current == null) {
            return null;
        }
    }
    return current;
}
// Removing nodes from a BST
function remove(data) {
    root = removeNode(this.root, data);
}
function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // node has no children
        if (node.left == null && node.right == null) {
            return null;
        }
        // node has no left child
        if (node.left == null) {
            return node.right;
        }
        // node has no right child
        if (node.right == null) {
            return node.left;
        }
        // node has two children
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    }
    else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    }
    else {
        node.right = removeNode(node.right, data);
        return node;
    }
}



// ----- 10
// Graphs = consists of a set of vertices and a set of edges
//      - edges represented as an adjacency list or adjacency matrix (two dimensional array in which elements indicate whether an edge exists)
// -----
function Vertex(label) {
    this.label = label;
}
function Graph(v) {
    this.vertices = v;
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.toString = toString;
}
function addEdge(v,w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}
function showGraph() {
    for (var i = 0; i < this.vertices; ++i) {
        putstr(i + " -> ");
        for (var j = 0; j < this.vertices; ++j) {
            if (this.adj[i][j] != undefined)
                putstr(this.adj[i][j] + ' ');
        }
        print();
    }
}
g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();

// Seaching through a graph
// Depth-first
function Graph(v) {
    this.vertices = v;
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false;
    }
}
function addEdge(v,w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}
function showGraph() {
    for (var i = 0; i < this.vertices; ++i) {
        putstr(i + " -> ");
        for (var j = 0; j < this.vertices; ++j) {
            if (this.adj[i][j] != undefined)
                putstr(this.adj[i][j] + ' ');
        }
        print();
    }
}
function dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] != undefined) {
        print("Visited vertex: " + v);
    }
    for each (var w in this.adj[v]) {
        if (!this.marked[w]) {
            this.dfs(w);
        }
    }
}
g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
g.dfs(0);

// Breadth-first
function bfs(s) {
    var queue = [];
    this.marked[s] = true;
    queue.push(s); // add to back of queue
    while (queue.length > 0) {
        var v = queue.shift(); // remove from front of queue
        if (v == undefined) {
            print("Visited vertex: " + v);
        }
        for each (var w in this.adj[v]) {
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.push(w);
            }
        }
    }
}
g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
g.bfs(0);

// Finding shortest path
// add this to Graph class
this.edgeTo = [];
this.pathTo = pathTo;
this.hasPathTo = hasPathTo;
// bfs function
function bfs(s) {
    var queue = [];
    this.marked[s] = true;
    queue.push(s); // add to back of queue
    while (queue.length > 0) {
        var v = queue.shift(); // remove from front of queue
        if (v == undefined) {
            print("Visited vertex: " + v);
        }
        for each (var w in this.adj[v]) {
            if (!this.marked[w]) {
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.push(w);
            }
        }
    }
}
function pathTo(v) {
    var source = 0;
    if (!this.hasPathTo(v)) {
        return undefined;
    }
    var path = [];
    for (var i = v; i != source; i = this.edgeTo[i]) {
        path.push(i);
    }
    path.push(s);
    return path;
}
function hasPathTo(v) {
    return this.marked[v];
}
g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
var vertex = 4;
var paths = g.pathTo(vertex);
while (paths.length > 0) {
    if (paths.length > 1) {
        putstr(paths.pop() + '-');
    }
    else {
        putstr(paths.pop());
    }
}

// Topological sorting
function Graph(v) {
    this.vertices = v;
    this.vertexList = [];
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false;
    }
    this.bfs = bfs;
    this.edgeTo = [];
    this.hasPathTo = hasPathTo;
    this.pathTo = pathTo;
    this.topSortHelper = topSortHelper;
    this.topSort = topSort;
}
function topSort() {
    var stack = [];
    var visited = [];
    for (var i = 0; i < this.vertices; i++) {
        visited[i] = false;
    }
    for (var i = 0; i < this.vertices; i++) {
        if (visited[i] == false) {
            this.topSortHelper(i, visited, stack);
        }
    }
    for (var i = 0; i < stack.length; i++) {
        if (stack[i] != undefined && stack[i] != false) {
            print(this.vertexList[stack[i]]);
        }
    }
}
function topSortHelper(v, visited, stack) {
    visited[v] = true;
    for each (var w in this.adj[v]) {
        if (!visited[w]) {
            this.topSortHelper(visited[w], visited, stack);
        }
    }
    stack.push(v);
}
function addEdge(v,w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
}


// ----- 11
// Sorting algorithms
// 
// -----
// 
// The Array Test Bed
// 
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;
    for (var i = 0; i < numElements; ++i) {
    this.dataStore[i] = i;
    }
}
function setData() {
    for (var i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements+1));
    }
}
function clear() {
    for (var i = 0; i < this.dataStore.length; ++i) {
        this.dataStore[i] = 0;
    }
}
function insert(element) {
    this.dataStore[this.pos++] = element;
}
function toString() {
    var retstr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retstr += this.dataStore[i] + " ";
        if (i > 0 && i % 10 == 0) {
            retstr += "\n";
        }
    }
    return retstr;
}
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

// 
// Basic Sorting Algorithms
// - uses two loops to sort the data; outer loop iterates over the elements while the inner loop is used for comparison
// 
// #1 Bubble sort
// - slowest sorting algorithms
// - values float like a bubble from one end to another
// 
function bubbleSort() {
    var numElements = this.dataStore.length;
    var temp;
    for (var outer = numElements; outer >= 2; --outer) {
        for (var inner = 0; inner <= outer-1; ++inner) {
            if (this.dataStore[inner] > this.dataStore[inner+1]) {
                swap(this.dataStore, inner, inner+1);
            }
        }
        print(this.toString());
    }
}
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
print(mynums.toString());
mynums.bubbleSort();
print();
print(mynums.toString());

// #2 Selection sort
// - start from the begining of the array and compare the first elem with the remaining
// - after examining all elements the smallest is placed at the begining of the array, and the algorithm moves to the second position
// 
function selectionSort() {
    var min, temp;
    for (var outer = 0; outer <= this.dataStore.length-2; ++outer) {
        min = outer;
        for (var inner = outer + 1; inner <= this.dataStore.length-1; ++inner) {
            if (this.dataStore[inner] < this.dataStore[min]) {
                min = inner;
            }
        }
        swap(this.dataStore, outer, min);
    }
}

// #3 Insertion sort
// - element compared to next element and swapped
// 
function insertionSort() {
    var temp, inner;
    for (var outer = 1; outer <= this.dataStore.length-1; ++outer) {
        temp = this.dataStore[outer];
        inner = outer;
        while (inner > 0 && (this.dataStore[inner-1] >= temp)) {
            this.dataStore[inner] = this.dataStore[inner-1];
            --inner;
        }
        this.dataStore[inner] = temp;
    }
}
// Timing comparisons
// Elapsed time for the bubble sort on 10000 elements is: 1096 milliseconds.
// Elapsed time for the selection sort on 10000 elements is: 591 milliseconds.
// Elapsed time for the insertion sort on 10000 elements is: 471 milliseconds.



// 
// Advanced sorting algorithms
// 
// Adv - Shellsort
// - based on insertion sort with a big improvement
// - the key concept is to compare distant elements first, rather than adjacent elements (insertion sort)
// - works by defining a gap sequence that indicates how far apart compared elements are when starting the sorting process
// - the gap sequence can be defined dynamically
// - several published gap sequences
// - example using gap sequence published by Marcin Garcia
// 
function shellsort() {
    for (var g = 0; g < this.gaps.length; ++g) {
        for (var i = this.gaps[g]; i < this.dataStore.length; ++i) {
            var temp = this.dataStore[i];
            for (var j = i; j >= this.gaps[g] &&
                this.dataStore[j-this.gaps[g]] > temp;
                j -= this.gaps[g]) {

                this.dataStore[j] = this.dataStore[j - this.gaps[g]];
            }
            this.dataStore[j] = temp;
        }
    }
}
// to add to CArray class
this.gaps = [5,3,1];
function setGaps(arr) {
    this.gaps = arr;
}
// - outer loop controls movement within the gap sequence
// - by the time the gap 1 (standard insertion sort) many of the elements will already be in place
// load("CArray.js")
var nums = new CArray(10);
nums.setData();
print("Before Shellsort: \n");
print(nums.toString());
print("\nDuring Shellsort: \n");
nums.shellsort();
print("\nAfter Shellsort: \n");
print(nums.toString());

// dynamically computed gap sequence
function shellsort1() {
    var N = this.dataStore.length;
    var h = 1;
    while (h < N/3) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (var i = h; i < N; i++) {
            for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h) {
                swap(this.dataStore, j, j-h);
            }
        }
        h = (h-1)/3;
    }
}
// load("CArray.js")
var nums = new CArray(100);
nums.setData();
print("Before Shellsort1: \n");
print(nums.toString());
nums.shellsort1();
print("\nAfter Shellsort1: \n");
print(nums.toString());


// 
// Adv - Mergesort algorithm
// 
// - s: create sorted sublists and merge them
// - works by merging sorted sublists together to form a larger, completely sorted list
// - two subsorted arrays and a third array into which we merge the two subarrays by comparing data elements and inserting the smallest value
// - downside: sorting large data set, the amount of space needed for storage can be quite large
// Top-down Mergesort - js: recursive approach not recommended due to depth reached
// Buttom-up Mergesort - nonrecursive or iterative version
// - break down data into a set of one-element arrays
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.gaps = [5,3,1];
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.setGaps = setGaps;
    this.shellsort = shellsort;
    this.mergeSort = mergeSort;
    this.mergeArrays = mergeArrays;
    for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = 0;
    }
}
function mergeArrays(arr,startLeft, stopLeft, startRight, stopRight) {
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    k = startRight;
    for (var i = 0; i < (rightArr.length-1); ++i) {
        rightArr[i] = arr[k];
        ++k;
    }
    k = startLeft;
    for (var i = 0; i < (leftArr.length-1); ++i) {
        leftArr[i] = arr[k];
        ++k;
    }
    rightArr[rightArr.length-1] = Infinity; // a sentinel value
    leftArr[leftArr.length-1] = Infinity; // a sentinel value
    var m = 0;
    var n = 0;
    for (var k = startLeft; k < stopRight; ++k) {
        if (leftArr[m] <= rightArr[n]) {
            arr[k] = leftArr[m];
            m++;
        }
        else {
            arr[k] = rightArr[n];
            n++;
        }
    }
    print("left array - ", leftArr);
    print("right array - ", rightArr);
}
function mergeSort() {
    if (this.dataStore.length < 2) {
        return;
    }
    var step = 1;
    var left, right;
    while (step < this.dataStore.length) {
        left = 0;
        right = step;
        while (right + step <= this.dataStore.length) {
            mergeArrays(this.dataStore, left, left+step, right, right+step);
            left = right + step;
            right = left + step;
        }
        if (right < this.dataStore.length) {
            mergeArrays(this.dataStore, left, left+step, right, this.dataStore.length);
        }
        step *= 2;
    }
}
var nums = new CArray(10);
nums.setData();
print(nums.toString());
nums.mergeSort();
print(nums.toString());


// 
// Adv - Quicksort algorithm
// 
// - uses pivot element to dividethe list into two sublists
// - one of the fastest algorithms for large datasets
// - divide-and-conquer algorithm that recursively breaks a list of data into successively smaller sublists consisting of the smaller elements
// 
// Pseudocode
// - pick pivot elementthat divedes the list into two sublists
// - reorder the list so that all elements less than the pivot element are placed before the pivot and all elements greater, placed after it
// - repeat steps 1 and 2 on both lists
function qSort(list) {
    if (list.length == 0) {
        return [];
    }
    var lesser = [];
    var greater = [];
    var pivot = list[0];
    for (var i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            lesser.push(list[i]);
        } else {
            greater.push(list[i]);
        }
    }
    return qSort(lesser).concat(pivot, qSort(greater));
}



// ----- 12
// Searching algorithms
// 
// -----
// 
// Sequential search (linear search)
// 
// - go over the entire list
// 
function seqSearch(arr, data) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i] == data) {
            return true;
        }
    }
}
function findMin(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; ++i) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

// 
// Binary search
// 
// - requires sorted data
// - three responses: correct / too high / too low
// 
function binSearch(arr, data) {
    var upperBound = arr.length-1;
    var lowerBound = 0;
    while (lowerBound <= upperBound) {
        var mid = Math.floor((upperBound + lowerBound) / 2);
        if (arr[mid] < data) {
            lowerBound = mid + 1;
        }
        else if (arr[mid] > data) {
            upperBound = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -1;
}
var nums = [];
for (var i = 0; i < 100; ++i) {
    nums[i] = Math.floor(Math.random() * 101);
}
insertionsort(nums);
dispArr(nums);
print();
putstr("Enter a value to search for: ");
var val = parseInt(readline());
var retVal = binSearch(nums, val);
if (retVal >= 0) {
    print("Found " + val + " at position " + retVal);
}
else {
    print(val + " is not in array.");
}




















