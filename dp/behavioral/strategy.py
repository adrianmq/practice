"""
Strategy Design Pattern
- Define a family of algorithms, encapsulate each one, and make them
interchangeable. Strategy lets the algorithm vary independently from
clients that use it.
- Capture the abstraction in an interface, bury implementation details in derived classes.

https://sourcemaking.com/design_patterns/strategy
"""
import abc


class Context:
    """
    Define the interface of interest to clients.
    Maintain a reference to a Strategy object.
    """

    def __init__(self, strategy):
        self._strategy = strategy

    def context_interface(self):
        self._strategy.algorithm_interface()


class Strategy(metaclass=abc.ABCMeta):
    """
    Declare an interface common to all supported algorithms. Context
    uses this interface to call the algorithm defined by a
    ConcreteStrategy.
    """

    @abc.abstractmethod
    def algorithm_interface(self):
        pass


class ConcreteStrategyA(Strategy):
    """
    Implement the algorithm using the Strategy interface.
    """

    def algorithm_interface(self):
        pass


class ConcreteStrategyB(Strategy):
    """
    Implement the algorithm using the Strategy interface.
    """

    def algorithm_interface(self):
        pass


def main():
    concrete_strategy_a = ConcreteStrategyA()
    context = Context(concrete_strategy_a)
    context.context_interface()


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python
"""
class Order(object):
    pass


class ShippingCost(object):
    def __init__(self, strategy):
        self._strategy = strategy

    def shipping_cost(self, order):
        return self._strategy.calculate(order)


from abc import ABCMeta, abstractmethod


class AbsStrategy(object):
    __metaclass__ = ABCMeta

    @abstractmethod
    def calculate(self, order):
        """Calculate shipping cost"""
        pass


class FedExStrategy(AbsStrategy):
    def calculate(self, order):
        return 3.00


class PostalStrategy(AbsStrategy):
    def calculate(self, order):
        return 5.00


class UPSStrategy(AbsStrategy):
    def calculate(self, order):
        return 4.00


order = Order()
strategy = FedExStrategy()
cost_calculator = ShippingCost(strategy)
cost = cost_calculator.shipping_cost(order)
assert cost == 3.0
