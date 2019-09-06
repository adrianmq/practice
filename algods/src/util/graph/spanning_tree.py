from src.util.structs import priority_dict


def get_after_source(graph, source):
    """
        Spanning tree algorithm by Prim
    """
    # A dictionary mapping from the vertex number to a tuple of
    # (distance from source, last vertex on path from source)
    distance_table = {}

    for i in range(graph.num_vertices):
        distance_table[i] = (None, None)

    # The distance to the source from itself is 0
    distance_table[source] = (0, source)

    # Holds mapping of vertex id to distance from source
    # Access the highest priority (lowest distance) item first
    priority_queue = priority_dict()

    priority_queue[source] = 0

    visited_vertices = set()
    # Set of edges where each edge is represented as a tuple
    spanning_tree = set()

    while len(priority_queue.keys()) > 0:
        current_vertex = priority_queue.pop_smallest()

        # If we've visited a vertex earlier then we have all
        # outbound edges from it, we do not process it again
        if current_vertex in visited_vertices:
            continue

        visited_vertices.add(current_vertex)

        # If the current vertex is the source, we haven't traversed an edge yet,
        # no edge to add to our spanning tree
        if current_vertex != source:
            # The current vertex is connected by the lowest weighted edge
            last_vertex = distance_table[current_vertex][1]
            edge = (last_vertex, current_vertex)
            if edge not in spanning_tree:
                spanning_tree.add(edge)

        for neighbor in graph.get_adjacent_vertices(current_vertex):
            # The distance to the neighbor is only the weight of the edge connecting the neighbor
            distance = graph.get_edge_weight(current_vertex, neighbor)

            # The last recorded distance of this neighbor
            neighbor_distance = distance_table[neighbor][0]

            if neighbor_distance is None or neighbor_distance > distance:
                distance_table[neighbor] = (distance, current_vertex)
                priority_queue[neighbor] = distance

    return spanning_tree


def get(graph):
    """
        Spanning tree algorithm by Kruskal
    """
    # Holds a mapping from a pair of edges to the edge weight
    # The edge weight is the priority of the edge
    priority_queue = priority_dict()

    visited_vertices = set()

    # Maps a node to all its adjacent nodes which are in the
    # minimum spanning tree
    spanning_tree = {}

    for v in range(graph.num_vertices):
        spanning_tree[v] = set()
        for neighbor in graph.get_adjacent_vertices(v):
            priority_queue[(v, neighbor)] = graph.get_edge_weight(v, neighbor)

    # Number of edges we have got so far
    num_edges = 0

    while len(priority_queue.keys()) > 0 and num_edges < graph.num_vertices - 1:
        v1, v2 = priority_queue.pop_smallest()

        if v1 in spanning_tree[v2]:
            continue

        # Arrange the spanning tree so the node with the smaller vertex id is always first.
        # This greatly simplifies the code to find cycles in this tree
        vertex_pair = sorted([v1, v2])

        spanning_tree[vertex_pair[0]].add(vertex_pair[1])

        # Check if adding the current edge causes a cycle
        if _has_cycle(spanning_tree):
            spanning_tree[vertex_pair[0]].remove(vertex_pair[1])
            continue

        num_edges = num_edges + 1

        visited_vertices.add(v1)
        visited_vertices.add(v2)

    if len(visited_vertices) != graph.num_vertices:
        raise Exception('Minimum spanning tree not found')

    return spanning_tree


def _has_cycle(spanning_tree):
    for source in spanning_tree:
        q = []
        q.append(source)
        visited_vertices = set()
        while len(q) > 0:
            vertex = q.pop(0)
            # If we've seen the vertex before in this spanning tree, there is a cycle
            if vertex in visited_vertices:
                return True
            visited_vertices.add(vertex)
            # Add all vertices connected by edges in this spanning tree
            q.extend(spanning_tree[vertex])
    return False
