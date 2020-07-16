# Containerization

## OS & Kernel

- the kernel software component that servers as the bridge between the hardware and the rest of the system. It schedules processes, manages devices (reading/writing addresses on disk/memory), etc
- rest of OS serves to boot and manage user space, where processes run and interact with the kernel
- cgroups: linux kernel feature that isolates and controls the resource usage for user processes

## Virtual machine

- is comprised of some level of harware and kernel virtualization on which runs a guest operating system
- the hypervisor is responsible for creating the virtualized hardware(virtual disk, virtual network interface, wirtual CPU)
- the hypervisor can be hosted (meaning it runs on the Host OS), or it can run directly on the machine hardware (replacing the OS)
- the hypervisor is considered a heavy component, as it requires virtualization of multiple, if not all of the hardware and kernel

### Comparison

- hosted hypervisor VM: application, bins/libs, guest OS, hypervisor, host OS, hardware
- bare metal hypervisor VM: application, bin/libs, guest OS, hypervisor, hardware
- container: application, bin/libs, minimal guest OS, container engine, host OS, hardware
- VMs require hardware virtualization for machine level isolation, whereas containers operate on isolation within the same OS
- VMs have own os and complete isolation from each other (containers: less isolation since resources are shared between containers (kernel))

#### Advantages:

- containers serve as a self isolated unit that can run anywhere that supports it
- acts as a standardized unit of work
- reasons:
    - compatibility/dependency
    - long setup time
    - different dev/test/prod environment
- run each service with its own dependecies in separate containers

## Docker

- note os: kernel interacts with underlying hardware, custom software(UI, drivers, compilers, file managers, etc.) that differentiates operating systems
- container technology (LXC type, standardized): completely isolated environments(processes, network or mounts, just that they share the os kernel (not meant to virtualize and run different os on hardware)
- can run any type of os on top of the host as log as it relies on the same kernel
- is lightweight(minimal os), boots faster, safer to deploy and use, and can be run on essentially any operating system
- built on cgroups and namespacing provided by the Linux kernel and Windows
- the container is made up of layers of images (binaries packed together into a single package)
- the base image contains the container's OS (can be different from the host OS), which is not a full OS, containing the file system and OS binaries (without the kernel)
- has union file system, which keeps only the layers that are different between images
- images are identified using hashes and share common layers
- when container is booted, the image and parent images are downloaded from the repo, the cgroup and namespaces are created, and th eimage is used to create a virtual environment
- posibility to share file systems between containers (volumes)
- common paradigm is for each container to run a single web server, a single database shard
- each container should be given a fixed number of resources
- makes it easier to define container networking, volumes for file system or resource configuration

Container:
- docker exec <c_name> cat /etc/hosts # execute command in container
- docker attach <c_id_5d> # attach to container stdout
- docker run -i <c_name> # inputs: map stdin of host and terminal to container; (by default docker doesn't listen to stdin)
- docker run -p <h_port>:<c_port> <i_name> # map docker host port to container port (otherwise use container ip with port to access app)
- docker run -v <h_path>:<c_path> <i_name> # mount host path to container (volume)
- docker run -e <env_name>=<en_var_value> <i_name> # config env vars

Build:
- the image is build after a layered architecture
- each line of instruction creates a new layer, which stores the changes from the previous layer
- only the layers above the updated layer needs to be re-built
- docker build ./dockerfile_dir -t repo_name/tag_name

Networking:
- docker has a built-in DNS server to help containers resolve names
- uses network namespaces that create a separate namespace for each container 
- docker builds 3 networks automatically:
    - bridge:
        - `docker run ubuntu`
        - private, internal network created by docker on the host
        - containers can see each other using internal IPs (172.17.*)
        - containers can be accessed externally by mapping the container port to the docker host
    - none:
        - `docker run ubuntu --network=none`
        - containers run in an isolated network
    - host:
        - `docker run ubuntu --network=host`
        - this takes out any network isolation between host and container
        - the web container is using the hosts network
    `docker network create --driver bridge --subnet 172.18.0.0/16 custom-isolated-network`
    `docker network ls`
    `docker inspect <c_name>` # look for networks settings
- windows, connect between containers:
    1. on the same network (--net=same), port forwarding: TARGET 1, CLIENT 1/0:
        a. use container IP address (e.g. "IPAddress": "172.23.0.3")
        b. use container network gateway IP (e.g. "Gateway": "172.23.0.1")
        c. use host.docker.internal special DNS name
    2. on the same network (--net=same), port forwarding: TARGET 0, CLIENT 1:
        a. use container IP address (e.g. "IPAddress": "172.23.0.3")
        c. use host.docker.internal special DNS name (DOESN't work, routed to host internal IP)
    3. on different networks, without port-forwarding
        a. ??? // no solution found yet
    4. on different networks, with ports forwarded to host
        a. use container network gateway IP (e.g. "Gateway": "172.23.0.1")
        b. use host.docker.internal special DNS name

Storage:
- /var/lib/docker [containers, image, volumes]
- Docker uses layered architecture and each layer stores the changes from the previous layer
- image layers are read-only and can be changed with a new build
- container layer created on top of image layers (read-write), destroyed once the container is removed
- container image layer files can be modified, but they are copied in the container layer(copy+write mechanism)
- volume|bind mounting (volume|directory)
- use '--mount type=bind,source=/data/mysql,target=/var/lib/mysql'
- docker choses storage drivers based on host os

Dockerfile:
CMD vs ENTRYPOINT:
- container lives only while the process inside it runs
- json/array ["sleep", "5"] vs cli ('sleep 5') format
- append command to docker run <img> [COMMAND] (docker run ubuntu sleep 5) for overwrite
- with 'ENTRYPINT' all the CLI parameters are passed to the command 
- with 'CMD' mentioned after the 'ENTRYPOINT' in the Dockerfile, the CMD json args are passed to the entrypoint command, still these canbe overwritten through the CLI
    ENTRYPOINT ["sleep"]
    CMD ["5"]
- overwrite entrypoint instruction using '--entrypoint sleep2.0' option

    Examples:
    ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run --host=0.0.0.0

Engine:
- docker daemon + rest api + cli(perform actions)
- cli can work with a remote docker host (-H=remote-docker-engine:port)
- namespaces for isolation: network, pid, unix timesharing, interProcess, mount
    - linux system: PID:1 (root process)
    - container processes are in fact host processes
- cgroups to control amount of resources allocated to containers
    `docker run --cpu=.5 ubuntu`
    `docker run --memory=100m ubuntu`

Docker hub/registry:
- tag || latest atached to image version
- docker.io/userAccount/imageRepository
- private(login)/public registry

## Kubernetes

- container orchestration technology
- requirements:
  - actually take a specification and assign containers to machines (scheduling)
  - actually boot the specified containers on the machines through Docker
  - deal with upgrades/rollbacks/the constantly changing nature of the system
  - respond to failures like container crashes
  - create cluster resources like service discovery, inter VM networking, cluster ingress/egress, etc.

## OpenShift

### Resources:

- https://medium.freecodecamp.org/demystifying-containers-101-a-deep-dive-into-container-technology-for-beginners-d7b60d8511c1
https://www.youtube.com/watch?v=fqMOX6JJhGo&list=PLeJ9lLLvIjuZopMta5hHHl6B9rmLOQ5tR&index=17
