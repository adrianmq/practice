"""
Encapsulate the absence of an object by providing a substitutable
alternative that offers suitable default do nothing behavior.
"""

import abc


class AbstractObject(metaclass=abc.ABCMeta):
    """
    Declare the interface for Client's collaborator.
    Implement default behavior for the interface common to all classes,
    as appropriate.
    """

    @abc.abstractmethod
    def request(self):
        pass


class RealObject(AbstractObject):
    """
    Define a concrete subclass of AbstractObject whose instances provide
    useful behavior that Client expects.
    """

    def request(self):
        pass


class NullObject(AbstractObject):
    """
    Provide an interface identical to AbstractObject's so that a null
    object can be substituted for a real object.
    Implement its interface to do nothing. What exactly it means to do
    nothing depends on what sort of behavior Client is expecting.
    """

    def request(self):
        pass



"""
    pluralsight: design patterns with python

    - behavioral
    - provide a default object
    - eliminate tests for None
    - not limited for classes, useful for functions, iterators, generators
"""
import abc


class AbsClass(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def do_something(self, value):
        pass


class MyClass(AbsClass):
    def do_something(self, value):
        print('Doing %s.' % value)


class NullClass(AbsClass):
    def do_something(self, value):
        print('Not doing %s.' % value)


class MyObjectFactory:
    @staticmethod
    def create_object(value):
        if value == 'myclass':
            return MyClass()
        else:
            return NullClass()



obj = MyObjectFactory.create_object('myclass')
obj.do_something('something')
obj = MyObjectFactory.create_object('myotherclass')
obj.do_something('something')
# if obj is not None:
#     obj.do_something('something')
# else:
#     print('Not doing anything')