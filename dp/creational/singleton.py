"""
Ensure a class only has one instance, and provide a global point of
access to it.
"""


class Singleton(type):
    """
    Define an Instance operation that lets clients access its unique
    instance.
    """

    def __init__(cls, name, bases, attrs, **kwargs):
        super().__init__(name, bases, attrs)
        cls._instance = None

    def __call__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance


class MyClass(metaclass=Singleton):
    """
    Example class.
    """

    pass


def main():
    m1 = MyClass()
    m2 = MyClass()
    assert m1 is m2


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python
    - creational
    - ensure a class has only one instance
    - control access to limited resource:
        - Device access
        - Buffer pools
        - Web/DB connection pools
    - provide a global point of access
    - class responsible for its one instance
    - lazy construction

    Disadvantages:
    - violates SRP (solved)
    - non-standard class access (solved)
    - harder to test
    - carry global state
    - hard to sub-class and are considered harmful

    Summary:
    - controlled access to a single instance
    - reduces the global namespace
    - subclassible for extended uses
    - variable number of instances
        - Base Class and Meta Class variants
    - more flexible than a static class
        - Class with no instances
    - MonoState shares all state
    - Can also use a Python module
    - TO USE SPARINGLY! Considered Antipattern
"""
import datetime


class ClassicSingleton(object):
    ans = None

    @staticmethod
    def instance():
        if '_instance' not in ClassicSingleton.__dict__:
            _inst = ClassicSingleton()

        ClassicSingleton._instance = _inst

        return ClassicSingleton._instance

s1 = ClassicSingleton.instance()
s2 = ClassicSingleton.instance()

assert s1 is s2
s1.ans = 42
assert s2.ans == s1.ans
print('Assertion passed.')


class Logger(object):
    log_file = None

    @static_method
    def instance():
        if '_instance' not in Logger.__dict__:
            Logger._instance = Logger()
        return Logger._instance
    
    def open_log(self, path):
        self.log_file = open(path, mode='w')

    def write_log(self, log_record):
        now = str(datetime.datetime.now())
        record = '%s: %s' % (now, log_record)
        self.log_file.writelines(record)

    def close_log(self):
        self.log_file.close()

logger = Logger.instance()
logger.open_log('my.log')
logger.write_log('Logging with classic Singleton pattern')
logger.close_log()
with open('my.log', 'r') as file;
    for line in f:
        print(line)


# 2nd approach
# solve SRP, use base class for all singletons and fix non-standard instance access
class SingletonBase(object):
    _instances = {} # dict([cls, instance])

    def __new__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__new__(cls)
            cls._instances[cls] = instance
        return cls._instances[cls]


class Logger(SingletonBase):
    log_file = None

    def __init__(self, path):
        if self.log_file is None:
            self.log_file = open(path, mode='w')

    def write_log(self, log_record):
        now = str(datetime.datetime.now())
        record = '%s: %s' % (now, log_record)
        self.log_file.writelines(record)

    def close_log(self):
        self.log_file.close()
        self.log_file = None


# 3rd approach
# build a metaclass
# metaclass = class's class
# class is an instance of a metaclass
# control building of a class
class Singleton(type):
    _instalces = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class Logger(metaclass=Singleton, Logger):
    pass


logger = Logger('my.log')
logger.write_log('Logging with classic Singleton pattern')
logger2 = Logger('***ignored***')
logger2.write_log('Another log record')

logger.close_log()

with open('my.log', 'r') as file:
    for line in f:
        print(line, end='')


# 4th approach = Monostate pattern
class Monostate(object):
    _state = {}

    def __new__(cls, *args, **kwargs):
        self = super().__new__(cls)
        self.__dict__ = cls._state
        return self


class Logger(Monostate):
    pass
