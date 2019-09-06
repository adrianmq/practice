import pytest

from src.graph import AdjacencyMatrixGraph, AdjacencySetGraph


def get_mock_graph_9_edges_v1(): return [
    (0, 1), (1, 2), (2, 7), (2, 4), (2, 3), (1, 5), (5, 6), (6, 3), (3, 4), (6, 8)
]


def mock_unweighted_graph_9_edges_v2(): return {
    'num_vertices': 9,
    'edges': [(0, 1), (1, 2), (1, 3), (2, 3), (1, 4), (3, 5), (5, 4), (3, 6), (6, 7), (0, 7)]
}


def mock_weighted_graph_9_edges(): return {
    'num_vertices': 9,
    'edges': [(0, 1, 1), (1, 2, 2), (1, 3, 6), (2, 3, 2), (1, 4, 3), (3, 5, 1), (5, 4, 5), (3, 6, 1), (6, 7, 1), (0, 7, 8)]
}


def mock_weighted_graph_8_edges_v1(): return {
    'num_vertices': 8,
    'edges': [(0, 1, 1), (1, 2, 2), (1, 3, 2), (2, 3, 2), (1, 4, 3), (3, 5, 1), (5, 4, 3), (3, 6, 1), (6, 7, 1), (7, 0, 1)]
}


def mock_weighted_graph_8_edges_v2(): return {
    'num_vertices': 8,
    'edges': [(0, 1, 1), (1, 2, 2), (1, 3, 2), (2, 3, 2), (1, 4, 3), (3, 5, 1), (5, 4, 2), (3, 6, 1), (6, 7, 1), (7, 0, 1)]
}


def mock_adjacency_matrix_graph(directed=False):
    edges = get_mock_graph_9_edges_v1()
    return make_adjacency_matrix_graph(9, edges, directed)


def make_adjacency_matrix_graph(num_vertices, edges=[], directed=False):
    graph = AdjacencyMatrixGraph(num_vertices, directed)
    for i, e in enumerate(edges):
        graph.add_edge(*e)

    return graph


def make_adjacency_set_graph(num_vertices, edges=[], directed=False):
    graph = AdjacencySetGraph(num_vertices, directed)
    for i, e in enumerate(edges):
        graph.add_edge(*e)

    return graph


def mock_params_shortest_path_unweighted():
    data = mock_unweighted_graph_9_edges_v2()
    graph_undirected = make_adjacency_set_graph(**data)
    graph_directed = make_adjacency_set_graph(**data, directed=True)
    return [
        pytest.param({'graph': graph_undirected,
                      'source': 0, 'destination': 5}, [0, 1, 3, 5]),
        pytest.param({'graph': graph_undirected,
                      'source': 0, 'destination': 6}, [0, 7, 6]),
        pytest.param({'graph': graph_undirected,
                      'source': 7, 'destination': 4}, [7, 0, 1, 4]),
        pytest.param({'graph': graph_directed,
                      'source': 0, 'destination': 5}, [0, 1, 3, 5]),
        pytest.param({'graph': graph_directed,
                      'source': 0, 'destination': 6}, [0, 1, 3, 6]),
        pytest.param({'graph': graph_directed,
                      'source': 7, 'destination': 4, 'side_effect': True}, []),
    ]


def mock_params_shortest_path_weighted():
    data = mock_weighted_graph_9_edges()
    graph_undirected = make_adjacency_matrix_graph(**data)
    graph_directed = make_adjacency_matrix_graph(**data, directed=True)
    return [
        pytest.param({'graph': graph_undirected,
                      'source': 0, 'destination': 5}, [0, 1, 2, 3, 5]),
        pytest.param({'graph': graph_undirected,
                      'source': 4, 'destination': 7}, [4, 5, 3, 6, 7]),
        pytest.param({'graph': graph_undirected,
                      'source': 7, 'destination': 0}, [7, 6, 3, 2, 1, 0]),
        pytest.param({'graph': graph_directed,
                      'source': 0, 'destination': 5}, [0, 1, 2, 3, 5]),
        pytest.param({'graph': graph_directed,
                      'source': 4, 'destination': 7, 'side_effect': True}, []),
        pytest.param({'graph': graph_directed,
                      'source': 7, 'destination': 0, 'side_effect': True}, []),
    ]


def mock_params_spanning_tree_connected():
    data = mock_weighted_graph_8_edges_v1()
    graph_undirected = make_adjacency_matrix_graph(**data)
    graph_directed = make_adjacency_matrix_graph(**data, directed=True)
    return [
        pytest.param({'graph': graph_undirected, 'source': 1}, {
                     (1, 2), (7, 6), (0, 7), (1, 4), (6, 3), (1, 0), (3, 5)}),
        pytest.param({'graph': graph_undirected, 'source': 3}, {
                     (0, 1), (3, 2), (5, 4), (7, 0), (6, 7), (3, 6), (3, 5)}),
        pytest.param({'graph': graph_directed, 'source': 1}, {
                     (1, 2), (1, 3), (6, 7), (7, 0), (1, 4), (3, 6), (3, 5)}),
        pytest.param({'graph': graph_directed, 'source': 3}, {
                     (0, 1), (1, 2), (5, 4), (7, 0), (6, 7), (3, 6), (3, 5)})
    ]


def mock_params_spanning_tree_kruskal():
    data = mock_weighted_graph_8_edges_v2()
    graph_undirected = make_adjacency_matrix_graph(**data)
    return [
        pytest.param({'graph': graph_undirected}, [
                     (0, 1), (0, 7), (1, 2), (3, 5), (3, 6), (4, 5), (6, 7)])
    ]
