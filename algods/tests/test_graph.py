import pytest

from src.util.graph import traversal
from src.util.graph import topological_sort
from src.util.graph import shortest_path
from src.util.graph import spanning_tree
from tests.conftest import (mock_adjacency_matrix_graph,
                            mock_params_shortest_path_unweighted,
                            mock_params_shortest_path_weighted,
                            mock_params_spanning_tree_connected,
                            mock_params_spanning_tree_kruskal)


class TestGraph:

    def test_breadth_first_traversal(self):
        graph = mock_adjacency_matrix_graph()
        result = traversal.breadth_first(graph)

        assert result == [0, 1, 2, 5, 3, 4, 7, 6, 8]

    def test_depth_first_traversal(self):
        graph = mock_adjacency_matrix_graph()
        result = traversal.depth_first(graph)

        assert result == [0, 1, 2, 3, 4, 6, 5, 8, 7]

    def test_topological_sort(self):
        graph = mock_adjacency_matrix_graph(directed=True)
        result = topological_sort.exec(graph)

        assert result == [0, 1, 2, 5, 7, 6, 3, 8, 4]

    @pytest.mark.parametrize(('args', 'path'), mock_params_shortest_path_unweighted())
    def test_shortest_path_unweighted(self, args, path):
        result_path = []
        def get_shortest_path(): return shortest_path.get(
            **args, strategy=shortest_path.build_distance_table_unweighted)

        if 'side_effect' in args:
            del args['side_effect']
            with pytest.raises(Exception):
                result_path = get_shortest_path()
        else:
            result_path = get_shortest_path()

        assert result_path == path

    @pytest.mark.parametrize(('args', 'path'), mock_params_shortest_path_weighted())
    def test_shortest_path_weighted(self, args, path):
        result_path = []
        def get_shortest_path(): return shortest_path.get(
            **args, strategy=shortest_path.build_distance_table_weighted)

        if 'side_effect' in args:
            del args['side_effect']
            with pytest.raises(Exception):
                result_path = get_shortest_path()
        else:
            result_path = get_shortest_path()

        assert result_path == path

    @pytest.mark.parametrize(('args', 'tree'), mock_params_spanning_tree_connected())
    def test_spanning_tree_by_prim(self, args, tree):
        result_tree = spanning_tree.get_after_source(**args)

        assert result_tree == tree

    @pytest.mark.parametrize(('args', 'minimum_tree'), mock_params_spanning_tree_kruskal())
    def test_spanning_tree_minimum(self, args, minimum_tree):
        result_tree = spanning_tree.get(**args)

        result_spanning_tree_edges = sorted({
            (k, v) for k in result_tree for v in result_tree[k]})

        assert result_spanning_tree_edges == minimum_tree
