from distutils.core import setup

setup(
    name='nmapui-d3.js',
    version='0.0.1',
    author='Quan Heng/Ronald Bister',
    author_email='limquanheng@gmail.com/mini.pelle@gmail.com',
    packages=['nmapui', 'nmapui.test'],
    url='http://pypi.python.org/pypi/nmapui/',
    license='LICENSE.txt',
    description='A small web interface for nmap to enable you to run scans, parse and compare the results in your browser or via a Restful API',
    long_description=open('README.md').read(),
)
