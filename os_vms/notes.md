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

#### Advantages:

- containers serve as a self isolated unit that can runa nywhere that supports it
- acts as a standardized unit of work

## Docker

- container technology
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
