from queue import Queue


def exec(graph):
    queue = Queue()
    indegree_map = {}

    for i in range(graph.num_vertices):
        indegree_map[i] = graph.get_indegree(i)
        # Queue all nodes which have no dependencies i.e. no edges comming in
        if indegree_map[i] == 0:
            queue.put(i)

    sorted_list = []
    while not queue.empty():
        vertex = queue.get()
        sorted_list.append(vertex)
        for v in graph.get_adjacent_vertices(vertex):
            indegree_map[v] = indegree_map[v] - 1
            if indegree_map[v] == 0:
                queue.put(v)

    if len(sorted_list) != graph.num_vertices:
        raise ValueError('This graph has a cycle!')

    return sorted_list
