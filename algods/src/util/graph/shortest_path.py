"""
    Shortest path algorithm
"""
from queue import Queue

from src.util.structs import priority_dict


def build_distance_table_unweighted(graph, source):
    """
        Build distance table for an unweighted graph
    """

    # A dictionary mapping from the vertex number to a tuple of
    # (distance from source, last vertex on path from source)
    distance_table = {}

    for i in range(graph.num_vertices):
        distance_table[i] = (None, None)

    # The distance to the source from itself is 0
    distance_table[source] = (0, source)

    queue = Queue()
    queue.put(source)

    while not queue.empty():
        current_vertex = queue.get()

        # The distance of the current vertex from the source
        current_distance = distance_table[current_vertex][0]

        for neighbor in graph.get_adjacent_vertices(current_vertex):
            # Only update the distance table if no current distance from the source is set
            if distance_table[neighbor][0] is None:
                distance_table[neighbor] = (
                    1 + current_distance, current_vertex)

                # Enqueue the neighbor only if it has other adjacent vertices to explore
                if len(graph.get_adjacent_vertices(neighbor)) > 0:
                    queue.put(neighbor)

    return distance_table


def build_distance_table_weighted(graph, source):
    """
        Build distance table for an weighted graph
        Dijkstra's algorithm
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

    while len(priority_queue.keys()) > 0:
        current_vertex = priority_queue.pop_smallest()
        # The distance of the current node from the source
        current_distance = distance_table[current_vertex][0]

        for neighbor in graph.get_adjacent_vertices(current_vertex):
            distance = current_distance + \
                graph.get_edge_weight(current_vertex, neighbor)

            # The last recorded distance of this neighbor from the source
            neighbor_distance = distance_table[neighbor][0]

            # If there is a currently recorded distance from the source and this
            # is greater than the distance of the new path found, update the current
            # distance from the source in the distance table
            if neighbor_distance is None or neighbor_distance > distance:
                distance_table[neighbor] = (distance, current_vertex)
                priority_queue[neighbor] = distance

    return distance_table


def get(graph, source, destination, strategy):
    distance_table = strategy(graph, source)

    path = [destination]

    previous_vertex = distance_table[destination][1]

    while previous_vertex is not None and previous_vertex is not source:
        path = [previous_vertex] + path

        previous_vertex = distance_table[previous_vertex][1]

    if previous_vertex is None:
        raise Exception(f'There is no path from {source} to {destination}')
    else:
        path = [source] + path

    return path
