"""
Factory Method Design Pattern
Define an interface for creating an object, but let subclasses decide
which class to instantiate. Factory Method lets a class defer
instantiation to subclasses.
"""

import abc


class Creator(metaclass=abc.ABCMeta):
    """
    Declare the factory method, which returns an object of type Product.
    Creator may also define a default implementation of the factory
    method that returns a default ConcreteProduct object.
    Call the factory method to create a Product object.
    """

    def __init__(self):
        self.product = self._factory_method()

    @abc.abstractmethod
    def _factory_method(self):
        pass

    def some_operation(self):
        self.product.interface()


class ConcreteCreator1(Creator):
    """
    Override the factory method to return an instance of a
    ConcreteProduct1.
    """

    def _factory_method(self):
        return ConcreteProduct1()


class ConcreteCreator2(Creator):
    """
    Override the factory method to return an instance of a
    ConcreteProduct2.
    """

    def _factory_method(self):
        return ConcreteProduct2()


class Product(metaclass=abc.ABCMeta):
    """
    Define the interface of objects the factory method creates.
    """

    @abc.abstractmethod
    def interface(self):
        pass


class ConcreteProduct1(Product):
    """
    Implement the Product interface.
    """

    def interface(self):
        pass


class ConcreteProduct2(Product):
    """
    Implement the Product interface.
    """

    def interface(self):
        pass


def main():
    concrete_creator = ConcreteCreator1()
    concrete_creator.product.interface()
    concrete_creator.some_operation()


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python

    - creational
    - define interface for creating an object
    - let subclasses decide which object
    - defer instantiation to subclasses
    - known as Virtual Constructor
"""
import abc
from inspect import getmembers, isclass, isabstract


# autos package
class AbsAuto(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def start(self):
        pass

    @abc.abstractmethod
    def stop(self):
        pass


# autos package
class ChevvVolt(AbsAuto):
    def start(self):
        print('ChevvVolt start')

    def stop(self):
        print('ChevvVolt stop')


# autos package
class NullCar(AbsAuto):
    def __init__(self, carname):
        self._carname = carname
    
    def start(self):
        print('Unknown car "%s".' % self._carname)

    def stop(self):
        pass


class AutoFactory(object):
    autos = {} # Key = car model name, value = class for the car name

    def __init__(self):
        self.load_autos()

    def load_autos(self):
        classes = getmembers(autos,
                             lambda m: isclass(m) and not isabstract(m))

        for name, _type in classes:
            if isclass(_type) and issubclass(_type, autos.AbsAuto):
                self.autos.update([[name, _type]])

    def create_instance(self, carname):
        if carname in self.autos:
            return self.autos[carname]()
        else:
            return autos.NullCar(carname)


factory = AutoFactory()

for carname in 'ChevvVolt', 'FordFocus', 'Tesla P90D':

    car = factory.create_instance(carname)
    car.start()
    car.stop()


# module search tips
# handled_exceptions_classes = tuple(member[1] for member in inspect.getmembers(exceptions, inspect.isclass))


"""
    Full factory pattern
"""
# autos package
class AbsAuto(metaclass=abc.ABCMeta):

    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, name):
        self._name = name

    @abc.abstractmethod
    def start(self):
        pass

    @abc.abstractmethod
    def stop(self):
        pass


# autos package
class ChevyVolt(AbsAuto):
    def start(self):
        print('ChevvVolt start')

    def stop(self):
        print('ChevvVolt stop')


# autos package
class NullCar(AbsAuto):
    def __init__(self, carname):
        self._carname = carname
    
    def start(self):
        print('Unknown car "%s".' % self._carname)

    def stop(self):
        pass


# factories package
class AbsFactory(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def create_auto(self):
        pass


# factories package
class ChevyFactory(AbsFactory):

    def create_auto(self):
        self.chevy = chevy = ChevyVolt()
        chevy.name = 'Chevy Volt'
        return chevy


# loader module
def load_factory(factory_name):
    try:
        factory_module = import_module('.'+factory_name, 'factories')
    except ImportError:
        factory_module = import_module('.null_factory', 'factories')

    classes = getmembers(factory_module,
                         lambda m: isclass(m) and not isabstract(m))

    for name, _class in classes:
        if issubclass(_class, AbsFactory):
            return _class()


# main
for factory_name in 'chevy_factory', 'ford_factory', 'tesla_factory':

    factory = loader.load_factory(factory_name)
    car = factory.create_auto()

    car.start()
    car.stop()

