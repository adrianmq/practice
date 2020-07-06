// Java 11 Oracle certification - OCP
// Reference: OCP - Java SE 11 Programmer study guide, Jeanne Boyarsky and Scott Selikoff

#ch1 - welcome to java
## JDK, JRE
  - minimum software required for development
  - compiler (javac), which converts .java files to .class files
    - generates instructions in a special format that the java command can run (bytecode)
  - launcher (java), which creates the JVM and executes the program
  - archiver (jar), which packages files together
  - api documentation (javadoc) command for generating documentation
  - JRE is a subset of the jdk, that was used for running a program, but could not compile one

## Benefits of Java
  - object oriented: having all code defined in classes, that can be instantiated into objects (functional prog allowed within a class).
  - encapsulation: support for access modifiers, to protect data from unintended access and modification.
  - platform independent: interpreted language that gets compiled to bytecode, that can be compiled once and run on different os. Portability allows to easily share pre-compiled pieces of software.
  - robust: it prevents memory leaks, managing memory on its own and performing garbage collection automatically
  - simple: eliminates pointers, operator overloading
  - secure: runs inside jvm, thus creating a sandbox that makes it hard for java code to do evil things to the computer it is running on
  - multithreaded: designed to run multiple pieces of code at te same time
  - backward compatible: programs written in old versions of java should work with later versions

## Class structure
  - classes are basic building blocks, with parts and characteristics (members = methods || procedures + fields || variables)
  - objects are runtime instances of a class in memory, representing a single representation of a class
  - reference is a variable that points to an object
  - other building blocks: interfaces and enums
  - the method name and the parameter types are called the method signature
  - the method declaration contains the signature, plus the return type
  - comments // single-line, /* */ multi-line, /** */ javadoc with specific structure
  - class vs file: when multiple classes defined in the same file, most one is allowed to be public (with the name matching the filename)
  - each file can contain only one public class
  - the filename must match the class name, including case, and have a .java extension

## Writing a main() method
  - java begins execution with its main()[entry point] method, which is a gateway between the startup of a java process, which is managed by JVM, and the begining of the programmer's code
  - jvm calls the underlying system to allocate memory and CPU time, access files, etc
  - the class name must match the filename; the compilation is done using the javac, yielding bytecode, which consists of instructions that the JVM knows how to execute; when executing the compiled file, the .class extension must be omitted
  - public static void main(String[] args)
  - the JVM looks first for a main method in the class name, unless the method exists, the process throws an error and terminates
  - an exception is thrown if the static keyword is missing
  - a method that returns no data returns control to the caller silently
  - in general, it's a good pratice to use void for methods that change an object's state
  - the main() method changes the program state from started to finished
  - the main() method parameter list is represented as an array of java.lang.String objects
    - String[] args || String args[] || String ...args
    - this list contains values that were read in (arguments) when the JVM started
    - the '...' characters are called varargs, variable argument list
    - any valid variable name can be used instead of 'args': String[] options, String options[], String ...options
  - java 11, a program can be run without compiling it first (javac), though the extension is required
    - launching single-file source-code programs, but only for one file programs, having one class
    - can only import code that came with the JDk
    - compilation is done "in memory", invalid syntax would yield a compilation error
    - no file with .class extension is created, however, in advance compilation will result in faster run time
    - java SingleFileZoo.java a b

## Understanding package declarations and imports
  - classes are put packages, which are logical groupings
  - un-imported types cannot be resolved, and cause compilation errors
    "Random cannot be resolved to a type" (either type name is mispelled, or the package isn't imported)
  - the import statement tells the compiler which package to look for classes
  - package names are hierarchical, having packages starting with 'java' or 'javax' coming from JDK
  - the rule for package names: letters|numbers separated by '.'
  - wildcard import \*, classes in the same package are imported together
    - matches only class names, and only one is allowed at the end
    - making all classes available ar start of compilation
    - it doesn't import child packages, fields or methods, only classes
    - the static import takes other types
    - importing all classes doesn't slow down execution, since the compiler decides which ones are required
  - the java.lang is a special package, that is automatically imported
  - java automatically looks in the current package for classes
  - class name conflicts cause compilation errors "error: reference to Date is ambiguous"
  - explicit class name import takes precedence over any wildcard import
  - for using two classes with the same name, the second one shouldn't be imported and make use of the fully qualified name
  - all code written alongside main entry point is part of the default package, which should be used only for throwaway code
  - compilation for multiple files can be done in one line with the files listed
    - wildcards can be used for compiling all files from one package, though it cannot be used for compiling subdirectories
  - for running the compiled version the extension .class must e omitted
  - by default javac command places the compiled classes in the same directory as the source code, but it also provides an option to place the class files in a different directory, using'-d', for target directory
    - Note: java options are case sensitive, which means that you cannot pass -D instead of -d
    - this will create another directory with the provided name, containing the folders with the corresponding package names with the compiled class files
    - to run the program, the class path must be specified
      - java -cp|-classpath|--class-path <Location of classes needed to run the program>
      - javac -cp|-classpath|--class-path <Location of classes needed to compile the program>
      - javac -d <Directory to place generated class files>
  - compiling with jar files (java archive - like a zip file of java classes)
    - java -cp ".;C:\temp\someOtherLocation;C:\temp\myJar.jar" myPackage.MyClass
    - java -cp ".:/tmp/someOtherLocation:/tmp/myJar.jar" myPackage.MyClass
    - the period (.) indicates you want to include the current directory in the classpath
    - windows uses semicolons (;) to separate parts of the class path, whereas linux uses colons (:)
    - wildcards can be used for matching all jar files in a directory, but it won't include subdirectories
  - creating a jar file
    - jar -cvf myNewFile.jar .
    - jar --create --verbose --file myNewFile.jar .
    - jar -cvf myNewFile.jar -C dirName . // specifying a directory, instead of current directory
  - running with compiled jar file and class
    - jar -cvf pcka.jar -C ./pcka . // pcka can contain only the compiled class .class
    - java -cp ".\pcka;.\classes\cb" pckb/ClassB // \classes\cb contains the pckb ClassB.class

## Ordering Elements in a Class
  - order of declaring a class
    - package declaration [not required][first line in the file]
    - import statements [not required][immediately after the package]
    - class declaration [required][immediately after import]
    - field declrations [not required][any top-level element in a class]
    - method declaration [not required][any top-level element in a class]
  - multiple classes can be defined in a file, but only on is alloed to be public, which has to match the class name
  - a file is allowed to have neither class be public

# RQ: 

## CH1:
  A1: 1-b,e | 2-b,c,d | 3-c,d | 4-c,d | 5-a,c,d,e | 6-
  C: 

## CH4:
  A1: 1-a,b,c,e,f | 2-f | 3-c | 4-c,e | 5-b,d,e | 6-b,e | 7-f | 8-c | 9-d | 10-b,d,e |
      11-f | 12-a,b,d | 13-b,d | 14-f | 15-a,b,d | 16-e | 17-d | 18-a,d,c,f | 19-d | 20-?
  C: 
  - multiple elem declaration, but data type must be present only once
  - syntax check first, loop termination condition update
  - Iterator no-values returns Object in case of var
  - do/while, variable declared inside do block is out of scope in while
  - the right side of a foreach statement must be a primitive array or any class that implements java.lang.Iterable (Srt, int[], Collection)

## CH5:

## CH6:
  A1: 1-a | 2-c | 3-a,d,f | 4-a,f | 5-b,d,e | 6-e | 7-a,b,e,f | 8-a,c,f | 9-c | 10-c | 11-b | 12-c,d,e |
      13-c | 14-c | 15-c | 16-a,d | 17-c | 18-d | 19-a,c | 20-a,c
  R: 1,2,3,4,6,7,8,10,12,14,15,16,17,18,19,20
  C:
  - 5.e - name used in parameter list doesn't match the name in the body
  - 9.a.b.c - since the scope of start/c is within lambda, the variables can ve declared after without issue
  - 11.a - the code correctly sorts in descending order. Since uppercase normally sorts before lowercase, the order is reversed here
    cats.sort((c1, c2) -> -c1.compareTo(c2)); // [leo, Olivia] x 2
  - 13.e - only effectively final variables are accepted, varible j isn't altered in the else block (BLOCK scope),
    being redeclared on each block execution
  N:
  - Method parameters and local variables are effectively final if they aren’t changed after initialization
  - Lambda parameters are not allowed to use the same name as another variable in the same scope

## CH7:
  A1: 1-b,c | 2-a,d | 3-a,c,d | 4-a,b,e,f | 5-d,f | 6-d | 7-b,c,d,f | 8-a,b,e | 9-b,c,d,f | 10-b |
      11-f | 12-d | 13-c | 14-b | 15-e | 16-b | 17-b,d,e | 18-c,e | 19-a | 20-a,b,c,e,f | 21-a
  R: 1,2,3,5,6,7,8,10,12,14,15,16,17
  C:
    - 4.e '...' for varargs must be after the type not before it
    - 9.c 'var' is not a valid return type. Var can only be used for local variables
    - 11.b.e static methods aren't allowed to call instance methods, and can be invoked on a null reference variable (with correct type)
    - 13.e static final variables must be set exactly once, and it must be in the declaration line or in a static initialization block
    - 18.b both instance and static initializers are able to access static variables
    - 19.e pay attention
    - 20.b.e the 'var' type cannot be a method parameter && variable name with reserved word 'long'
    - 21.a.b.c 'private' provides encapsulation for instance fields
  N:

## CH8:
  
