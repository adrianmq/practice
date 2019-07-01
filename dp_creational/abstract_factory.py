"""
Provide an interface for creating families of related or dependent
objects without specifying their concrete classes.
"""

import abc


class AbstractFactory(metaclass=abc.ABCMeta):
    """
    Declare an interface for operations that create abstract product
    objects.
    """

    @abc.abstractmethod
    def create_product_a(self):
        pass

    @abc.abstractmethod
    def create_product_b(self):
        pass


class ConcreteFactory1(AbstractFactory):
    """
    Implement the operations to create concrete product objects.
    """

    def create_product_a(self):
        return ConcreteProductA1()

    def create_product_b(self):
        return ConcreteProductB1()


class ConcreteFactory2(AbstractFactory):
    """
    Implement the operations to create concrete product objects.
    """

    def create_product_a(self):
        return ConcreteProductA2()

    def create_product_b(self):
        return ConcreteProductB2()


class AbstractProductA(metaclass=abc.ABCMeta):
    """
    Declare an interface for a type of product object.
    """

    @abc.abstractmethod
    def interface_a(self):
        pass


class ConcreteProductA1(AbstractProductA):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_a(self):
        pass


class ConcreteProductA2(AbstractProductA):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_a(self):
        pass


class AbstractProductB(metaclass=abc.ABCMeta):
    """
    Declare an interface for a type of product object.
    """

    @abc.abstractmethod
    def interface_b(self):
        pass


class ConcreteProductB1(AbstractProductB):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_b(self):
        pass


class ConcreteProductB2(AbstractProductB):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_b(self):
        pass


def main():
    for factory in (ConcreteFactory1(), ConcreteFactory2()):
        product_a = factory.create_product_a()
        product_b = factory.create_product_b()
        product_a.interface_a()
        product_b.interface_b()


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python

    - creational
    - close cousin of factory pattern
    - factory creates one product vs. abstract factory creates families
    - enforces dependencies between classes
    - defers creation of objects to concrete subclasses
    - known as Kit Pattern

    Summary:
    - encapsulates object instantiation
    - supports dependecy inversion
    - clients can write to an abstraction
    - Factory vs Abstract Factory?
        - Factory is great when you don't know which concrete classes you'll need
        - Abstract Factory is useful when you have families of objects
"""
import abc


# autos module
class AbsAuto(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def start(self):
        pass

    @abc.abstractmethod
    def stop(self):
        pass


# autos module
class FordFiesta(AbsAuto):
    pass
class FordMustang(AbsAuto):
    pass
class FordLincolnMKS(AbsAuto):
    pass


# factories module
class AbsFactory(metaclass=abc.ABCMeta):
    @abc.abstractstaticmethod
    def create_economy():
        pass

    @abc.abstractstaticmethod
    def create_sport():
        pass

    @abc.abstractstaticmethod
    def create_luxury():
        pass


# factories module
class FordFactory(AbsFactory):
    @staticmethod
    def create_economy():
        return FordFiesta()

    @staticmethod
    def create_sport():
        return FordMustang()

    @staticmethod
    def create_luxury():
        return FordLincolnMKS()


# main
for factory in tuple(FordFactory):
    car = factory.create_economy()
    car.start()
    car.stop()
    car = factory.create_sport()
    car.start()
    car.stop()
    car = factory.create_luxury()
    car.start()
    car.stop()
