#!/usr/bin/env bash
# Usage: ./run_notebook.sh -p 8889 -b
port=
build_image=
image_name='algods-notebook'
container_name='algods'
container_port=8888
container_mount_path='/home/jovyan'

while [ $# -gt 0 ]
do
	case "$1" in
		-p|--port)
			port=$2; shift;	;;
		-b|--build)
			build_image=1;	;;
		-h|--help)
			echo '# Usage:'
			echo '# ./run.sh'
			echo '# Options:'
			echo '# -p, --port: Specify host port'
			echo '# -b, --build: Build docker image'
			exit 1; ;;
	esac
	shift
done

if [ -z $port ]; then
  port=$container_port
fi

if [ ! -z $build_image ]; then
  docker build -t $image_name .
fi

current_dir=$(pwd)
docker_run_cmd="
	docker run --rm -d \
		-p $port:$container_port \
		--name $container_name \
"

if [ $OSTYPE == "msys" ]; then
    # Lightweight shell and GNU utilities compiled for Windows
    # (part of MinGW)
    # windows to posix
    mount_dir=$(echo "/$current_dir" | sed -e 's/\\/\//g' -e 's/://')
else
    mount_dir=$current_dir
fi

docker_run_cmd="$docker_run_cmd \
    -v '$mount_dir':$container_mount_path
"

if [ $(docker ps -q -f "name=$container_name") ]; then
	docker stop $container_name
fi

docker_run=$(echo "$docker_run_cmd" | awk '$1=$1')
docker_run_cmd="$docker_run $image_name"
echo $docker_run
eval $docker_run_cmd

exit 0
