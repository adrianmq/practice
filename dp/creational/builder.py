"""
Separate the construction of a complex object from its representation so
that the same construction process can create different representations.
"""

import abc


class Director:
    """
    Construct an object using the Builder interface.
    """

    def __init__(self):
        self._builder = None

    def construct(self, builder):
        self._builder = builder
        self._builder._build_part_a()
        self._builder._build_part_b()
        self._builder._build_part_c()


class Builder(metaclass=abc.ABCMeta):
    """
    Specify an abstract interface for creating parts of a Product
    object.
    """

    def __init__(self):
        self.product = Product()

    @abc.abstractmethod
    def _build_part_a(self):
        pass

    @abc.abstractmethod
    def _build_part_b(self):
        pass

    @abc.abstractmethod
    def _build_part_c(self):
        pass


class ConcreteBuilder(Builder):
    """
    Construct and assemble parts of the product by implementing the
    Builder interface.
    Define and keep track of the representation it creates.
    Provide an interface for retrieving the product.
    """

    def _build_part_a(self):
        pass

    def _build_part_b(self):
        pass

    def _build_part_c(self):
        pass


class Product:
    """
    Represent the complex object under construction.
    """

    pass


def main():
    concrete_builder = ConcreteBuilder()
    director = Director()
    director.construct(concrete_builder)
    product = concrete_builder.product


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python

    - creational
    - separates the construction of an object from its implementation
    - encapsulate object construction
    - multistep construction process
    - implementations can vary
    - client sees only the abstraction

    Summary:
    - separates the 'how' from the 'what'
    - assembly separate from components
    - encapsulates what varies - the parts
    - permits different representations
    - client creates Director object
    - director uses concrete builder
    - builder adds parts to the product
    - client receives the product from builder
"""
import abc


class Computer(object):

    def display(self):
        print('Custom Computer:')
        print('\t{:>10}: {}'.format('Case', self.case))
        print('\t{:>10}: {}'.format('Mainboard', self.mainboard))
        print('\t{:>10}: {}'.format('CPU', self.cpu))


class AbsBuilder(object):
    __metaclass__ = abc.ABCMeta

    def get_computer(self):
        return self._computer

    def new_computer(self):
        self._computer = Computer()

    @abc.abstractmethod
    def get_case(self):
        pass

    @abc.abstractmethod
    def build_mainboard(self):
        pass

    @abc.abstractmethod
    def install_hard_drive(self):
        pass


class MyComputerBuilder(AbsBuilder):

    def get_case(self):
        self._computer.case = 'Case Code'

    def build_mainboard(self):
        self._computer.mainboard = 'MSI 970'
        self._computer.cpu = 'Intel Core i7-4770'
        self._computer.memory = 'Corsair Vengeance 16GB'

    def install_hard_drive(self):
        self._computer.hard_drive = 'Seagate 2TB'


class BudgetComputerBuilder(AbsBuilder):
    pass


class Director(object):

    def __init__(self, builder):
        self._builder = builder

    def build_computer(self):
        self._builder.new_computer()
        self._builder.get_case()
        self._builder.build_mainboard()
        self._builder.install_hard_drive()

    def get_computer(self):
        return self._bulder.get_computer()


# main
computer_builder = Director(MyComputerBuilder())
computer_builder.build_computer()
computer = computer_builder.get_computer()
computer.display()

computer_builder = Director(BudgetComputerBuilder())
computer_builder.build_computer()
computer = computer_builder.get_computer()
computer.display()
