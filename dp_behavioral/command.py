"""
Encapsulate a request as an object, thereby letting you parameterize
clients with different requests, queue or log requests, and support
undoable operations.
"""

import abc


class Invoker:
    """
    Ask the command to carry out the request.
    """

    def __init__(self):
        self._commands = []

    def store_command(self, command):
        self._commands.append(command)

    def execute_commands(self):
        for command in self._commands:
            command.execute()


class Command(metaclass=abc.ABCMeta):
    """
    Declare an interface for executing an operation.
    """

    def __init__(self, receiver):
        self._receiver = receiver

    @abc.abstractmethod
    def execute(self):
        pass


class ConcreteCommand(Command):
    """
    Define a binding between a Receiver object and an action.
    Implement Execute by invoking the corresponding operation(s) on
    Receiver.
    """

    def execute(self):
        self._receiver.action()


class Receiver:
    """
    Know how to perform the operations associated with carrying out a
    request. Any class may serve as a Receiver.
    """

    def action(self):
        pass


def main():
    receiver = Receiver()
    concrete_command = ConcreteCommand(receiver)
    invoker = Invoker()
    invoker.store_command(concrete_command)
    invoker.execute_commands()


if __name__ == "__main__":
    main()


"""
    pluralsight: design patterns with python

    - behavioral
    - encapsulates a request as an object
    - parameterize objects
    - quesues and log operations
    - undoable operations and macros
    - known as: action pattern / transaction pattern

    Summary:
    - encapsulate behavior
    - separate command logic from the client
    - command line programs
    - add additional capabilities:
        - validation
        - undo
    - building menus
"""
import abc


class AbsCommand(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def execute(self):
        pass


class AbsOrderCommand(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractproperty
    def name(self):
        pass

    @abc.abstractproperty
    def description(self):
        pass


class NoCommand(AbsCommand):
    def __init__(self, args):
        self._command = args[0]
        pass

    def execute(self):
        print('No command named %s' % self._command)


class UpdateOrder(AbsCommand, AbsOrderCommand):
    name = 'UpdateQuantity'
    description = 'UpdateQuantity number'

    def __init__(self, args):
        self.newqty = args[1]

    def execute(self):
        oldqty = 5
        # Simulate database update
        print('DB updated')

        # Simulate loggin the update
        print('Logging: update quantity from %s to %s' % (oldqty, self.newqty))


# main
def get_commands():
    commands = (UpdateOrder, )
    return dict([cls.name , cls] for cls in commands)


def print_usage(commands):
    print('Usage: python -m Command CommandName [arguments]')
    print('Commands:')
    for command in commands.values():
        print('    %s ' % command description)


def parse_command(commands, args):
    command = commands.setdefault(args[0], NoCommand)
    return command(args)


commands = get_commands()
if len(sys.argv) < 2:
    print_usage(commands)
    exit()

# Find and execute the command
command = parse_command(commands, sys.argv[1:])
command.execute()























