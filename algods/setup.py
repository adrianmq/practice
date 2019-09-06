from setuptools import setup, find_packages

from version import __version__


test_requirements = [
    'pytest==5.1.2',
    'coverage==4.5.4',
    'pytest-cov==2.7.1'
]

setup(
    name='algorithms-data-structures-ref',
    description='Algorithms and Data Structures practice',
    author='Adrian Matei',
    packages=find_packages(exclude=["notebooks*", "tests*"]),
    package_data={'': ['run.py'], 'src': '*.*'},
    extras_require={'test': test_requirements},
    author_email='adrianmqit@gmail.com',
    entry_points={
        'console_scripts': ['run-all=src.cli:run']
    },
    version=__version__,
    url='https://pypi.example.com',
    python_requires='>=3',
    license='MIT'
)
