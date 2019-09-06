import logging

from functools import wraps
from queue import Queue

import numpy as np


def tracker(traverse):
    """
    Return list with traversal order
    """

    @wraps(traverse)
    def traverse_decorator(*args, **kwargs):
        traverse_order = []
        try:
            result = traverse(*args, **kwargs)
            traverse_order = list(map(lambda r: r[0], sorted(
                result.items(), key=lambda kv: kv[1])))
            return traverse_order
        except Exception as e:
            raise e

    return traverse_decorator


@tracker
def breadth_first(graph, start=0, visited=None):
    queue = Queue()
    queue.put(start)

    while not queue.empty():
        vertex = queue.get()

        if visited is None:
            visited = {start: 0}
        elif vertex in visited:
            continue
        else:
            last_index = sorted(visited.values())[-1]
            visited[vertex] = last_index + 1

        for v in graph.get_adjacent_vertices(vertex):
            if v not in visited:
                queue.put(v)

    return visited


@tracker
def depth_first(graph, current=0, visited=None):
    if visited is None:
        visited = {current: 0}
    elif current in visited:
        return visited
    else:
        last_index = sorted(visited.values())[-1]
        visited[current] = last_index + 1

    for vertex in graph.get_adjacent_vertices(current):
        depth_first(graph, vertex, visited)

    return visited
