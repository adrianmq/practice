<!-- 
  Java Fundamentals: Java programming language by jim Wilson
 -->

# Source Code File - structure
    - package statement
    - import statements
    - comments
    - class declaration
      - variables
      - comments
      - constructors
      - methods
      - nested classes
      - nested interfaces
      - enum
    - classes and interfaces can be defined in any order of occurrence in a Java source code file
    - a source code file can define only one `public` class/interface
    - the name of a `public` interface/class should match the source code file name

# Class
    - template for creating an object (specify the attributes and behavior of an object)
    - are reference types
    - class name should be the same as the file name (case-sensitive)
      - 'Pascal Case' and with descriptive nouns (without abbreviations)
    - constructor name should be the same as the class name
    - object assignment is done by reference
    - the Java Virtual Machine executes all classes when they are used
    - executable:
      - when handed over to JVM, the execution starts at the main method (entry point)
    - non-executable: without the main method
    - 'top-level' class is a class that isn't defined within any other class

## Declaration
    - parts:
      - access modifiers: public, private, protected, default
      - nonaccess modifiers: final, static
      - class name, name of base class if the class extends another, all implemented interfaces, class body (fields, methods and constructors)
      * mandatory: class keyword, name and body

## Definition
    - fields(attributes or instance variables) for keeping state
    - encapsulation = hides the internal representation of an object ans is done using access modifiers
    - access modifiers to control encapsulation
    - accessors and mutators (getters/setters)
    - methods:
      - manipulate state and perform operations
      - return value (only one): primitive value, reference to an object or reference to an array
    - this reference to the current object:
      - useful for reducing ambiguity
      - allows an object to pass itself as a parameter
    - null is a reference literal
      - represent an uncreated object
      - can be assigned to any reference variable

## `main` method
    - required for creating an executable application
    - signature: public static void main(String args[])
    - rules:
      - should be marked as `public` and `static`
      - the name must be `main`
      - the return type of this method must be void
      - the method must accept a method argument of a String array or a variable argument (varargs) of type String
      - `public` and `static` can be interchanged
    - if a class defines a main method that doesn't match the signature of the main method, it's referred to as an overloaded method (same name but different signature)

## Establishing initial state:
    - field initializers
    - constructors
    - initialization blocks
    * field receiving initial values:
      - byte/short/int/long: 0
      - float/double: 0.0
      - char: '\u0000'
      - boolean: false
      - reference types: null
    ** initialization order:
      1. field initialization
      2. initialization blocks
      3. constructor

## Field initializers
    - allow to specify a field's initial value as part of its declaration
    - can be a simple assignment
    - can be an equation
    - can reference other fields(without this)
    - can be a method call(Math.round)

## Initialization blocks
    - shared across all constructors
    - executed as if the code were placed at the start of each constructor
    - enclose statements in brackets outside of any method or constructor
    - multiple initialization blocks included in the same class will be executed in the declaration order
    - used to initialize variables of anonymous classes, which cannot define a constructor given the missing name
    - capabilities:
      - create local variables
      - access and asign calues to instance and static variables
      - call methods and define loops, conditional statements or try-catch blocks

## Constructors:
    - executable code during object creation to set initial state 
    - initialize instance variables of a class with their default values
    - must not have a return type (implicit return of object of its class), otherwise it will be threated as a regular method
    - can have access modifiers applied
    - every class has at least one constructor (created default by java with no arguments)
    - a class can have multiple constructors, each with a different parameter list
    - constructors can be chained:
      - call another constructor by invoking this() with approapiate constructor signature
      - limits what code can perform specific operations
    - default constructor with no parameters created by compiler, in case non provided,
    - default constructor with super(); call for parent constructor
    - default constructor accessibility matches the accessibility of the class

## Access modifiers
    - control the accesibility of class or an interface, including its members(methods and variables), by other classes and interfaces within the same or separate packages
    - local variables and method parameters cannot be defined using access modifiers
    - default access [~] (package access / package-private):
      - members of a class defined without using any explicit access modifier, are defined with package accessibility
      - members with package access are only accessible to classes and interfaces defined in the same package
      - visible only within its own package
      - usable on classes(types) / members
      - a class defined with this access modifier cannot be accessed within other packages, nor its members
    - public [+]:
      - accessible across all packages, from derived to unrelated classes (visible everywhere)
      - applies to:
        - top-level class, interface or enum
        - class variables and methods
        - instance variables and methods
        (usable on classes(types) / members)
    - protected [#] (package-private + kids):
      - accessible to:
        - classes and interfaces defined in the same package 
        - all derived classes even if they're defined in separate packages
        (visible only within its own class and subclasses)
      - a derived class inherits the protected members of its base class, irrespective of the packages in which they're defined
      - a derived class in a separate package can't access protected members of its base using reference variables (? another object instance)
        = a derived class can access protected members only by inheritance and not by reference (accessing members by using dot operator on an object)
      - applies to:
        - class variables and methods
        - instance variables and methods
        (usable on members)
    - private [-]:
      - class members are not accessible outside the class they're defined (visible only within its own class)
      - ignores package or inheritance relations
      - applies to:
        - class variables and methods
        - instance variables and methods
        (usable on members)

## Nonaccess modifiers
    - change the default behaviour of a class and its members
    - abstract, static, final, synchronized, native, strictfp, transient, volatile
    - abstract:
      - can be added to classes, interfaces or methods to change their default behavior
      - it doesn't affect the accessibility of the above constructs
      - class:
        - an abstract class cannot be instantiated, leads to compilation failure
        - an abstract class may or may not define an abstract method
        - a concrete class cannot define an abstract method
      - interface:
        - is abstract by default
        - the java compiler ads the abstract keyword to the definition of an interface
        - adding the keyword abstract to the definition of an interface is redundant
      - method:
        - doesn't have a body and usually it is implemented by a derived class
        - one with an empty body isn't abstract
      - variables:
        - none of the different types (instance, static, local and method parameters) can be defined as abstract
        - won't compile
    - final:
      - keyword which can be used with the declaration of a class, variable or method. it cannot be used with the declaration of an interface.
      - class:
        - it cannot be extended by another class (won't compile)
      - variable:
        - a value can be assigned only once, it cannot be reassigned (won't compile)
        - in reference variable, object methods can be invoked, still another value cannot be reassigned
      - method:
        - cannot be overriden by a derived class (overriden method = method in derived class with the same signature as the one in base class)
    - static:
      - can be applied to declarations of variables, methods, classes and interfaces
      - static variables and methods can be accessed using a null reference
      - variable:
        - belong to a class, are common for all instaces and aren't unique to any class instance
        - static attributes exist independently of any instances of a class and may be accessed even when no instaces have been created
        - its shared by all instaces of a class
        - a class and an interface may declare static variables
        - not advisable to use object reference variables to access static members
        - static final = constants, this way they are shared between objects and classes
      - method:
        - aren't associated with objects and cannot use the instance variables of a class
        - access and manipulate static variables
        - static members aren't involved in runtime polimorphism
        - cannot be overriden in a derived class, but can be redefined
        - cannot access nonstatic members
      - class and interface:
        - may not be assigned for top-level
        -
    - synchronized: a synchronized method can't be accessed by multiple threads concurrently;   Classes, interfaces or variables cannot be marked with this modifier
    - native: a native method calls and makes use of libraries and methods implemented in other programming languages, such as C or C++. Classes, interfaces or variables cannot be marked with this modifier
    - transient: a transient variable isn't serialized when the corresponding object is serialized. Classes, interfaces or methods cannot be marked with this modifier
    - volatile: a volatile variables value can be safely modified by different threads. Classes, interfaces or methods cannot be marked with this modifier
    - strictfp: classes, interfaces and methods defined using this keyword ensure that calculations using floating-point numbers are identical on all platforms.

## Parameter immutability:
    - parameters are passed by making a copy of the value (known as passing 'by-value')
    - new memory is allocated for inner method scope
    - changes made to passed value are not visible outside of method
    - changes made to members of passed class instances are visible outside of method

## Overloading
    - constructor must have class name
    - a class may have multiple versions of its constructor or methods
    - each constructor and method must have a unique signature(number, type and order of parameters, name)
    - overloaded methods cannot be defined by only changing their return type or access modifiers or both (not part of method signature)
    - widening conversion: invocation with different type args are converted to parameter type

## Variable parameters
    - a method can be declared to accept a varying number of parameter values (varargs)
    - place an ellipsis after parameter type
    - can have only one parameter of this type and must be the last one in the list
    - method receives values as an array

## Object's life cycle
    - objects are created using the `new` keyword
    - String objects can also be created using literal values, still it might not always create a new String object, since the literal value are polled in a String pool by JVM
    - once created an object can be accessed using its reference variable
    - the object remains accessible until it goes out of scope, or its reference variable is explicitly set to null, or dereferenced by reassignment
    - a garbage collection is a low-priority thread and marks the objects eligible for garbage collection int the JVM and then clears the memory of these objects
    - the execution os the garbage collector cannot be controlled or determined
    - using System.gc() or Runtimr.getRuntime().gc() the execution can be started, still this doesn't guarantee when it will run, since the call can be ignored by the JVM
    - the garbage collection reclaims memory for unreferenced objects, but also for referenced objects which for an island of isolation

## Inheritance
    - a class can be declared to inherit (a.k.a. derive) from another class (use 'extends' keyword)
    - derived class has characteristics of the base class and can add specialization

### Member hiding and overriding
    - can be assigned to base class typed references
    - fields hide base class fields with same name
      !!!!! dangerous: methods in base class that use fields will take the values from the base class
    - methods override base class methods with same signature
      ! @Override annotation notifies compiler to perform check regarding method signature match between base and subclass

### The Object Class / Object References
    - the Object class is the root of the Java class hierarchy
    - every class has the characteristics of the Object Class
    - useful for declaring variables, fields and parameters that can reference any class or array instance
    - defines a number of methods that are inherited by all objects
    - every class inherits directly or indirectly from the Object class
    ex: because array are classes we can assign an array to a variable of type object
    - object class methods:
      - clone, hashCode, getClass, finalize, toString, equals

### Object equality
    - equal ... it depends
    - override object class "equals" method and perform comparison based on state

### Special reference: 'super' keyword
    - similar to 'this', super is an implicit reference to the current object
    - super treats the object as if it is an instance of its base class
    - useful for accessing base class members that have been overriden

### Final and abstract
    - controlling inheritance and overriding
    - by default all classes can be extended and derived classes have the option to use or override inherited methods
    - a class can change these defaults
    - final => to prevent inheriting and/or overriding
    - abstract => to require inheriting and/or overriding
    - marking a method as abstract requires marking the class as abstract

### Inheritance and constructors
    - constructors are not inherited
    - a base class constructor must always be called
    - by default, base class' no-argument constructor is called
    - can explicitly call a base class constructor using the 'super' followed by parameter list (must be first line of constructor)


# Data Types
    - Java is a stong typed language, meaning that a variable must be defined together with its type before assignning a value to it
    - variables are categorized in two types: primitive variables and reference variables

## Primitive variables
    - [8]: char, byte, short, int, long, float, double, boolean
    - store the actual value
    - Booleam
      - category with only one data type: boolean
      - boolean variable can store only true/false (boolean literal)
      - 'literal' is a fixed value that doesn't need further calculations
    - Signed Numeric
      - has two subcategories: integers and decimals (floating-point)
      - integers:
        - byte, 8 bits, -128 to 127, inclusive
        - short, 16 bits, -32768 to 32767, inclusive
        - int, 32 bits, -2147483648 to *7, inclusive
        - long, 64 bits, ~10^12, should use 'L|l' at the end of literal value
      - int is the default type of a nondecimal number
      - literal values come in 4 representations: binary, decimal, octal, hexadecimal
      - rules for underscores in numeric literal values:
        - place an underscore right after the prefix 0, used to define an octal value
        - cannot start or end a literal value with an underscore
        - cannot place an underscore right after the prefixes 0b, 0B, 0x, and 0X, which are used to define binary and hexedecimal literal values
        - cannot place an underscore prior to an L suffix (the L suffix is used to mark a literal value as long)
        - you can't use an underscore in positions where a string of digits is expected
      - floating-point numbers:
        - float, 32 bits, +/-1.4E-45 to +/-3.4E38, +/- infinity, NaN
        - double 64 bits, +/-4.9E-324 to +/-1.79E+308, +/-infinity, NaN
    - Character (unsigned integer)
      - char, 16 bits Unicode character
      - values from \u0000 (0) to maximum value of \uffff (65535)
      - never use double quotes for assigning a letter to a char, use single-quotes
      - double-quotes are used to assign a value to a variable of type String
      - internally, value is stored as unsigned integer, therefore its acceptable to assign a positive integer value to a char
      - assigning negative integers to a char variable might result in storage of unexpected values, bacause there's no space allocated for integers' sign, which will be stored as part of the integer value
    - Casting:
      - is a forceful conversion of one data type to another data type
      - casting a bigger value to a data type that has a smaller range, meabd chopping off extra bits that may not fit into a smaller variable
      - should be used with caution, since it may not always give the correct converted values

## Identifiers
    - are names of packages, classes, interfaces, methods and variables
    - properties:
      - unlimited length
      - starts with a letter (a-z, upper or lowercase), a currency sign, or an underscore
      - can use a digit (not at starting point), or underscore or currency sign (any position)
      - not allowed special characters besides the ones mentioned
      - cannot use Java keyworods or reserved words

## Object reference variables (object references)
    - variable name evaluates to the address of the location in memory wher the object is referenced by the variables is stored
    - an object reference is, in fact, a memory address that points to a memory area where the object's data is located
    - default value of all types of object reference variables is null

## Operators
    - asignment, arithmetic, relational, logical
    - unary increment/decrement operators should be used with variables, not with literal values
    - applying the addition operator to char values, their corresponding ASCII values are added and subsctracted
    - implicit widening of data types
      - byte, short, char values are automatically wided to int when used as operands for aritmetic operations
      - in case of a long value, int is wided to long
    - expression evaluation starts from left to right
    - relational ops can work with all types of numbers, both integers (including char) and floating point
    - cannot compare incomparable value (eg. boolean with int, char, floating-point) => compilation error

## String class
    - the String class stores a sequence of Unicode characters:
      - are immutable
      - stored using UTF-16 encoding
      - literals are enclosed in double quotes ""
      - values can be concatenated using + and +=
      - string objects are immutable
    - methods:
      - length: length
      - string for non-string: valueOf
      - create new string from existing: concat, replace, toLowerCase, toUpperCase, trim, split
      - formatting: format
      - extract substring: charAt, substring
      - test substring: contains, endsWith, startsWith, indexOf, lastIndexOf
      - comparison: compareTo, compareToIgnoreCase, isEmpty, equals, equalsIgnoreCase
      - [intern]: returns a canonicalized reference of a string value
        - always return back the exact same string object for a string value
        - ensures that two strings with the same value will reference the exact same object
    - converting non-string types to string
      - String.valueOf provides overrides to handle most types
      - conversions often happen implicitly
      - Class conversions controlled by the class' toString method

### StringBuilder class
    - provides mutable string buffer
    - for best performance pre-size buffer, it will grow automatically if needed
    - most common methods: append and insert
    - use toString to extract resulting string

## Primitive wrapper classes
    - provide class capabilities and overhead
    - don't support a no argument constructor
    - immutable (don't allow changes to the state of their instances after initialization)
    - Boolean, Number(Byte, Short, Integer, Long, Float, Double), Character
    - conversion between wrapper classes and primitives done automatically (autoboxing), assigning a primitive to a wrapper class variable
    - autoboxing and .valueOf use caching, the constructor always creates new objects
    - explicit conversion using boxing('valueOf')/unboxing('xxxValue')
    - string conversion ('parseXxx'/'valueOf'), throw NumberFormatException for invalid format, except parseBoolean
    - no value == null references
    - equality: boxing conversions always return the same wrapper class instance for:
      int, short, byte (-128 ... 127), char ('\u0000' to '\u00ff'), boolean (true,false) [caches objects]
    - comparison:
      .equals() compares the primitive value stored
      == compares object references

### Classes vs. Primitives
    - Classes provide convenience:
      - common interaction through Object class
      - fields and methods specific to the type
      - incurs an overhead cost
    - Primitives provide efficiency
      - cannot be treated as Object
      - cannot expose fields or methods
      - lightweight

## Final fields
    - marking a field as final prevents it from being changed once assigned
    - a simple final field must be set during creation of an object instance with field initializer, initialization block or constructor
    - adding the static modifier makes a final field a named constant, that cannot be set by an object instance

## Enumeration types
    - useful for defining a type with a finite list of valid values
      - declare with 'enum' keyword
      - provide a comma-separated value list

# Exceptions and Error Handling

## Role of exceptions
    - Error handling needs to be implicit in application development. The traditional approach of checking error codes/flags is too intrusive
    - Exceptions provide a non-intrusive way to signal errors
    - try/catch/finally provides a structured way to handle exceptions
    - Catch should be made for more specific type to least specific

## The try/catch/finally statement
    - the try block contains "normal" code to execute, which runs to completion unless a exception is thrown
    - the catch block contains the error handling code, which executes only if matching exception is thrown
    - the finally block contains cleanup code if needed, which runs in all cases following try or catch block
    - exceptions can be handled by type
    - each exception type can have a separate catch block
    - each catch is tested in order from top to bottom
    - first assignable catch is selected
    - start catch block with most specific exception types

## Exception Class Hierarchy
    - Object -> Throwable
      -> Error
        *Virtual machine related errors (treated as unchecked)
        -> LinkageError
        -> ...
      -> Exception
        -> RuntimeExceptions
        *Unchecked exceptions
          -> NullPointerException
          -> ...
        -> Other
        *Checked exceptions
          -> IOException
          -> ...

## Exceptions crossing method boundaries
    - exceptions propagate up the call stack and can cross method boundaries
    - exceptions are part of a method's contract, meaning that a method is responsible for any checked exceptions that might occur
      - catch the exception
      - document that the exception might occur using the 'throws clause'
    - exceptions and method overriding:
      - the throws clause of an overriding method must be compatible with the throws clause of the overriden method
      - the overriding method can:
        - exclude exceptions
        - have the same exception
        - have a derived exception

## Throwing exceptions
    - can throw exceptions using the throw keyword
    - must create exception instance before throwing (provide meaningful detail)
    - most exception classes provide a constructor that accepts a String message or other detail
    - when caused by another exception, include originating exception
      - all exception classes support initCase method
      - many provide a constructor that accepts the originating exception
    - creating custom exception type
      - in most cases its better to use existing exception type
      - normally inherit directly from Exception class, makes them checked exceptions
        - constructors are often their only members
        - most required functionality is inherited
        - constructor that accepts required detail
        - constructor that accepts required detail and originating exception

# Packages

## Definition and scope
    - is a group of related types, that creates a namespace, provides an access boundary and acts as unit of distribution
    - each source file identifies the associated package by using the package keyword

    - applies to all types within that source file
    - a class can be explicitly defined in a named package; otherwise, it becomes part of a default package
    - classes and interfaces in the same package can use each other without prefixing their names with the package name
    - classed from other packages should use their fully qualified name

    - packages create a namespace
      - package name is part of the type name
      - convention creates unique package name, which follows reverse domain name structure
      - type name is qualified by package name

    - rules:
      - names should be all lowercase
      - package and subpackage names are separated by '.'
      - name must be a valid identifier in Java
      - package declaration(statement) must appear in source file before any type declarations (except comments); otherwise code won't compile
      - the 'package' statement if present must appear only once in a class file

## Determining a Type's Package
    - compiler needs to know each type's package (explicitly qualifying each type is impractical)
    - alternatives to explicitly qualifying types (allows use of a type's simple name in code)
      - types in current package do not need to be qualified
      - types in the java.lang package do not need to be qualified (Object, primitive wrapper classes, String, StringBuilder, many more)
      - use type imports

### Type imports
    - guide the compiler to map simple names to qualified names (use import keyword followed by qualified name)
    - single type import, provides mapping for a single type
      - preferred way to import types
      - most moder IDEs will add automatically
    - import on demand, provides mapping for all types in a package
      - use with caution
      - exposes code to potential breakage from changes in referenced packages

## Limiting access to package content
    - packages can serve as an access boundary (often referred to as package private)
    - useful for creating types and features to support functionality provided by the package (types and features are not meant to be used stand-alone)
    - can apply to a type, which is inaccessible outside of the package
    - can apply to type members, specific members of an otherwise accessible type are inaccessible outside of the package

### Packages Provide a Unit of Distribution
    - provide a predictable software structure (simplifies distribution)
    - class files organized in hierarchical folders reflecting the package name
      - each part of the package name is a separate folder
    - archive files
      - package folder structure can be placed into an archive file (known as a jar file)
      - places folder structure into a single file (supports compressing content)
      - optionally includes a manifest (provides information regarding archive content)
        - list of name-value pairs
        - commonly used to define startup class
      - create:
        - JDK provides a utility for creating archive files (jar command utility)
        - capability included with many other tools (IDEs)
        - build automation systems (known as build managers: Gradle/Maven)

## Static imports
    - allows import of static class members by using 'import static'
    - this way there's no need to prefix the static member with the class name

# Interface (Abstract Relationships)

## Interface
    - specifies a contract for the classes to implement and provides no implementation
    - some interfaces require additional type information (concept known as generics)
    - implicitly abstract (prior to SE8)
    - can define a default implementation
    - can define static methods
    - classes implement interfaces, which express that the class conforms to the contract
    - classes are free to implement multiple interfaces
    - classes and interfaces can be defined in any order of occurence in a Java source code file
    - do not limit other aspects of the class' implementation

## Declaring an interface
    - declaring an interface is similar to declaring a class (interface keyword)
    - supports a subset of the features available to classes:
      - methods
        (name, parameters and return type)
        [implicitly public]
      - constants
        (typed named values)
        [implicitly public, final, static]
      - extending interfaces
        (an interface can extend another interface)
        [implementing extended interface implies implementation of base]

## Static members
    - static members are shared class-wide, not associated with an individual instance
    - declared using the static keyword, accessible using the class name
    - field:
      - a value not associated with a specific instance
      - all instances access the same value
    - method:
      - performs an action not tied to a specific instance
      - can access static fields only
    - static import
      - provides short hand for accesing static members

## Static initialization blocks
    - perform one-time type initialization, executed before type's first use
    - statements enclosed in brackets outside of any method or constructor, prededed with static keyword
      - cannot access instance members
      - must handle all checked exceptions

## Nested types
    - is a type declared inside another type:
      - classes can be declared within classes and interfaces
      - interfaces can be declared within classes and interaces
    - are members of the enclosing type
    - private members of the enclosing type are visible to the nested type
    - support all member access modifiers (public, package private, protected, private)

### Static classes
    - purpose: structure and scoping
    - no relationship between instances of nested and enclosing type
      - nested within classes
      - all classes nested within interfaces
      - all nested interfaces

### Inner classes
    - each instance of the nested class is associated with an instanceof the enclosing class
    - non-static classes nested within classes

### Anonymous classes
    - are declared as part of their creation (useful for simple interface implementations or class extensions)
    - are inner classes and the anonymous instance is associated with the containing class instance
    - create if constructing an instance of the interface or base class
      - place opening&closing brackets after the interface or base class
      - place implementation code within the brackets



# Java Features

## Platform independent
  - code can be executed on multiple systems without recompilation
  - code is compiled to bytecode, to be executed by a virtual machine (JVM)
  - the JVM interprets bytecode to machine-specific instructions for execution
  - the JVM implementation is machine-dependent and may differ across platform, but all interpret the same bytecode in asimilar manner
  - C/C++ compile their code to a host system, which has to be recompiled for separate platforms

## Object orientation
  - emulates real-life state and behavior, which are tied to an object

## Abstraction
  - allows abstract objects that include only required properties and behavior

## Encapsulation
  - throughout classes the state and behavior of an object is encapsulated and protected from unwanted access or manipulation
  - the level of access and modification can be controlled

## Inheritance
  - classes are enabled to inherit other classes and implement interfaces
  - interfaces can inherit from other

## Polymorphism
  - java enables instaces of its classes to exhibit multiple behavior for the same method call

## Type safety
  - the data type of a variable must be declared before its used
  - compile-time checks that ensure that a value is not assigned to a variable of wrong type

## Automatic memory management
  - uses garbage collections for automatic memory management, which reclaim memory from objects that are no longer in use. This frees developers from managing the memory themselves and also prevents memory leaks

## Multithreading and concurrency
  - support since its first release
  - supported by classes and interfaces in its core API

## Security
  - multiple built-in security features to control access to resources and program execution
    - it provides secure class loading and verification ensures execution of legitimate java code
    - the platform defines multiple APIs, including cryptography and public key infrastructure
    - programs tha trun under a security manager control access to resources, like file reading through a policy file
    - enables definition of digital signatures, certificates and key-stores to secure code and file exchanges. Signed code is distributed for execution.

### NOT single-threaded
    - java supports multithreading programming with inbuilt classes and interfaces
    - single threads can be created and used, aside Java executes its own process for garbage collection in separate threads

