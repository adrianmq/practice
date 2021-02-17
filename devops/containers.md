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

"Docker can package an application and its dependencies in a virtual container that runs on any Linux server. This enables applications to run in a variety of locations, such as on-premises, in a public cloud, and/or in a private cloud. Docker uses the resource isolation features of the Linux kernel (such as cgroups and kernel namespaces) and a union-capable file system (such as OverlayFS) to allow containers to run within a single Linux instance, avoiding the overhead of starting and maintaining virtual machines." — Wikipedia

- note os: kernel interacts with underlying hardware, custom software(UI, drivers, compilers, file managers, etc.) that differentiates operating systems
- container technology (LXC type, standardized): completely isolated environments(processes, network or mounts, just that they share the os kernel (not meant to virtualize and run different os on hardware)
- can run any type of os on top of the host as log as it relies on the same kernel
- is lightweight(minimal os), boots faster, safer to deploy and use, and can be run on essentially any operating system
- built on cgroups and namespacing provided by the Linux kernel and Windows
- the container is made up of layers of images (binaries packed together into a single package)
- the base image contains the container's OS (can be different from the host OS), which is not a full OS, containing the file system and OS binaries (without the kernel)
- has union file system, which keeps only the layers that are different between images
- images are identified using hashes and share common layers
- when container is booted, the image and parent images are downloaded from the repo, the cgroup and namespaces are created, and the image is used to create a virtual environment
- posibility to share file systems between containers (volumes)
- common paradigm is for each container to run a single web server, a single database shard
- each container should be given a fixed number of resources
- makes it easier to define container networking, volumes for file system or resource configuration

###Container:
- docker exec <c_name> cat /etc/hosts # execute command in container
- docker attach <c_id_5d> # attach to container stdout
- docker run -i <c_name> # inputs: map stdin of host and terminal to container; (by default docker doesn't listen to stdin)
- docker run -p <h_port>:<c_port> <i_name> # map docker host port to container port (otherwise use container ip with port to access app)
- docker run -v <h_path>:<c_path> <i_name> # mount host path to container (volume)
- docker run -e <env_name>=<en_var_value> <i_name> # config env vars

###Build:
- the image is build after a layered architecture
- each line of instruction creates a new layer, which stores the changes from the previous layer
- only the layers above the updated layer needs to be re-built
- docker build ./dockerfile_dir -t repo_name/tag_name
- docker build builds an image from a Dockerfile and a context (is the set o files at a specified location PATH / URL, processed recursively)
- the build is run by the docker Daemon, not by the CLI, and first sends the entire context to the daemon
    !!! it's best to start with an empty directory as context with Dockerfile in it, having only the files needed for building the image

###Networking:
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

###Storage:
- /var/lib/docker [containers, image, volumes]
- Docker uses layered architecture and each layer stores the changes from the previous layer
- image layers are read-only and can be changed with a new build
- container layer created on top of image layers (read-write), destroyed once the container is removed
- container image layer files can be modified, but they are copied in the container layer(copy+write mechanism)
- volume|bind mounting (volume|directory)
- use '--mount type=bind,source=/data/mysql,target=/var/lib/mysql'
- docker choses storage drivers based on host os

### Dockerfile:
- a docker file must begin with a from instruction (which can be after parser directives, or comments, or globally scoped ARGs)
- line starting with # is treated as a comment, which is removed before the Dockerfile instruction is executed
- parser directives are optional, and effect the way subsequent lines in a dockefile are handled (don't add layers, and aren't shown as build steps, they should be at the top of a Dockerfile)
- ephemeral containers: the container can be stopped and destroyed, then rebuilt and replaced with absolute minimum set up and configuration (twelve factor app methodology - stateless containers)
- the current working directory is called build context, and by default the dockerfile is assumed to be located there. All recursive contents of files and directories in the current dir are sent to the docker daemon as build context. Inadvertently including files that are not necessary for building an image results in a larger build context and larger image size
- build sequence (multi-stage builds:
    - install tools needed for building the application
    - install or update library dependencies
    - generate your application
- don't install unnecessary packages
- decouple applications (one process per container is a good rule of thumb)
- minimize number of layers in images to ensure they are performant
    - only RUN, ADD, COPY create layers, other instructions create temporary intermediate images and don't increase the image size
    - use multi-stage builds and only copy artifacts needed in the final stage
- sort multi-line arguments alphanumerically to avoid duplication of packages and make the list much easier to update
- leverage build cache
    - each instruction is compared against child images derived from that base image to see if one of them was built using the exact same instruction
    - in most cases, simply comparing the instruction in the Dockerfile is sufficient, however certain instructions require more examination
    - for ADD and COPY instructions, the contents of the files in the image are examined and the checksum is calculated for each file (last modified/accessed aren't considered)
    - aside ADD/COPY commands, cache checking does not look at the files in the container to determine a cache match. E.G. RUN apt-get -y update changed files aren't examined, but just the command string itself is used to find a match
- FROM:
    - use official images as basis, best based on Alpine (tightly controlled and small in size)
- LABEL:
    - can be used to help organize images, record licesing information, to aid in automation, etc.
- RUN:
    - split long and complex statements on multiple lines separated with backslashes for readability, understandability, and maintainability
    - installing OS packages gotchas:
        - apt-get upgrade or dist-upgrade, as many of the 'essential' packages from parent images cannot upgrade inside unpriviledged container
        - combine apt-get upgrade with apt-get install in the same RUN statement, otherwise subsequent apt-get install instructions might fail, due to upgrade instruction caching
        - use version pinning to force build to retrieve a particular version regardless of what's in the cache
        - perform clean up after install, unless handled automatically by base images
    - when using pipes, ensure 'RUN set -o pipefail &&' is set for failing command at any stage in the pipe
- CMD:
    - should be used to run software contained in the image, along with arguments
    - should be used with the exec form  `CMD ["executable", "param1", "param2"]`, `CMD ["/bin/sh", "-c", "while true; do sleep 5; done"]`
    - should be given an interactive shell, e.g. `CMD ["perl", "-de0"]`, this way, when running the container in interactive mode, a usable shell would be dropped into
- ENTRYPOINT:
    - best used for setting the image's main command, allowing the image to be run as though it was that command (and use `CMD` for default flags)
    - can be used in combination with a helper script, in this case the app should be configured as PID 1, using the exec Bash command, so that the application receives Unix signals sent to the container
    - lastly it could be used to start a totally different tool such as Bash
- CMD vs ENTRYPOINT:
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
- VOLUME:
    - should be used to expose any database storage area, configuration storage area, configuration storage, or files/folders created by the docker container
    - it's strongly encouraged to use for any mutable and/or user-serviceable parts of the image
- USER: 
    - it a service can run without priviledges, use USER to change to non-root user
    - the user and group should be created in the Dockerfile
        - debian
            `RUN groupadd -r postgres && useradd --no-log-init -r -g postgres postgres`
            `RUN groupadd -r groupname -g 5001 && useradd -mr -g groupname -u 1001 -s /bin/bash username`
        - alpine - create group and user with home dir and shell login
            `RUN addgroup -g 5001 groupname && adduser -u 1001 -G groupname -s /bin/bash -D username`
    - avoid installing sudo, as it has unpredictable TTY and signal-forwarding behavior that can cause problems, though in case 'sudo' functionality is needed, such as initializing daemon as root but running as non-root, consider using 'gosu'
    - avoid switching USER back and forth frequently
- WROKDIR:
    - for clarity and readability it should always be used

### Engine:
- docker daemon + rest api + cli(perform actions)
- cli can work with a remote docker host (-H=remote-docker-engine:port)
- namespaces for isolation: network, pid, unix timesharing, interProcess, mount
    - linux system: PID:1 (root process)
    - container processes are in fact host processes
- cgroups to control amount of resources allocated to containers
    `docker run --cpu=.5 ubuntu`
    `docker run --memory=100m ubuntu`

### Docker hub/registry:
- tag || latest atached to image version
- docker.io/userAccount/imageRepository
- private(login)/public registry
- container registry

### Docker compose:
- 





## Kubernetes

"Kubernetes defines a set of building blocks ("primitives"), which collectively provide mechanisms that deploy, maintain and scale applications based on CPU, memory or custom metrics. Kubernetes is loosely coupled and extensible to meet different workloads. This extensibility is provided in large part by the Kubernetes API, which is used by internal components as well as extensions and containers that run on Kubernetes. The platform exerts its control over compute and storage resources by defining resources as Objects, which can then be managed as such." — Wikipedia

"In short, Kubernetes manages multiple hosts and deploys containers to them. The most used container technology to run containers on these hosts is Docker."

- container orchestration technology
- requirements:
  - actually take a specification and assign containers to machines (scheduling)
  - actually boot the specified containers on the machines through Docker
  - deal with upgrades/rollbacks/the constantly changing nature of the system
  - respond to failures like container crashes
  - create cluster resources like service discovery, inter VM networking, cluster ingress/egress, etc.

## OpenShift

### Resources:

- https://docs.docker.com
- https://medium.freecodecamp.org/demystifying-containers-101-a-deep-dive-into-container-technology-for-beginners-d7b60d8511c1
- https://www.youtube.com/watch?v=fqMOX6JJhGo&list=PLeJ9lLLvIjuZopMta5hHHl6B9rmLOQ5tR&index=17
- https://www.freecodecamp.org/news/kubernetes-vs-docker-whats-the-difference-explained-with-examples/
