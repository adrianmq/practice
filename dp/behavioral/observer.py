"""
Observer Design Pattern
* Pub-Sub pattern / Dependents pattern
- Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- Encapsulate the core (or common or engine) components in a Subject abstraction, and the variable (or optional or user interface) components in an Observer hierarchy.
- The "View" part of Model-View-Controller.

https://sourcemaking.com/design_patterns/observer
"""
import abc


class Subject:
    """
    Know its observers. Any number of Observer objects may observe a
    subject.
    Send a notification to its observers when its state changes.
    """

    def __init__(self):
        self._observers = set()
        self._subject_state = None

    def attach(self, observer):
        observer._subject = self
        self._observers.add(observer)

    def detach(self, observer):
        observer._subject = None
        self._observers.discard(observer)

    def _notify(self):
        for observer in self._observers:
            observer.update(self._subject_state)

    @property
    def subject_state(self):
        return self._subject_state

    @subject_state.setter
    def subject_state(self, arg):
        self._subject_state = arg
        self._notify()


class Observer(metaclass=abc.ABCMeta):
    """
    Define an updating interface for objects that should be notified of
    changes in a subject.
    """

    def __init__(self):
        self._subject = None
        self._observer_state = None

    @abc.abstractmethod
    def update(self, arg):
        pass


class ConcreteObserver(Observer):
    """
    Implement the Observer updating interface to keep its state
    consistent with the subject's.
    Store state that should stay consistent with the subject's.
    """

    def update(self, arg):
        self._observer_state = arg
        # ...


def main():
    subject = Subject()
    concrete_observer = ConcreteObserver()
    subject.attach(concrete_observer)
    subject.subject_state = 123


if __name__ == "__main__":
    main()



"""
    pluralsight: design patterns with python

    ! Python char: (bug)
    - runs managed code
    - uses reference counters for objects
    - set of observers holds references, therefore detach each observer so that
    reference count == 0
    - dangling reference stops garbage collection

    --> solution: use context managers
        - observers will detach themselves
        - subjects will clean up observers
"""
import abc

class AbsObserver(metaclass=abc.ABCMeta):
    @abstractmethod
    def update(self, value):
        pass

    def __enter__(self):
        pass

    @abc.abstractmethod
    def __exit__(self, exc_type, exc_value, traceback):
        pass


class AbsSubject(object):
    __metaclass__ = abc.ABCMeta
    _observers = set()

    def attach(self, observer):
        if not isinstance(observer, Observer):
            raise TypeError('Observer not derived from AbsOserver')
        self._observers |= {observer}

    def detach(self, observer):
        self._observers -= {observer}

    def notify(self, value=None):
        for observer in self._observers:
            if value is None:
                observer.update()
            else:
                observer.update(value)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self._observers.clear()


class KPIs(AbsSubject):
    _open_tickets = -1

    @property
    def open_tickets(self):
        return self._open_tickets

    def set_kpis(self, open_tickets):
        self._open_tickets = open_tickets
        self.notify()


class CurrentKPIs(AbsObserver):
    open_tickets = -1

    def __init__(self, kpis):
        self._kpis = kpis
        kpis.attach(self)

    def update(self):
        self.open_tickets = self._kpis.open_tickets
        self.display()

    def display(self):
        print('Current open tickets: {}***\n'.format(self.open_tickets))

    def __exit__(self, exc_type, exc_value, traceback):
        self._kpis.detach(self)


class ForecastKPIs(CurrentKPIs):

    def display(self):
        print('Forecast open tickets: {}***\n'.format(self.open_tickets))


# kpis = KPIs()
# currentKPIs = CurrentKPIs(kpis)
# forecastKPIs = ForecastKPIs(kpis)
with KPIs() as kpis:
    with CurrentKPIs(kpis), ForecastKPIs(kpis):
        kpis.set_kpis(25)
        kpis.set_kpis(100)
        kpis.set_kpis(50)

print('\n***Detaching the currentKPIs observer.***\n\n')
# kpis.detach(currentKPIs)
kpis.set_kpis(150)
