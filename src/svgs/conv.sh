#/bin/bash

set -e
action=$1

function svgTotsx() {
    for i in *.svg; do
        # echo "Processing $i"
        name=$(echo $i | cut -d'.' -f1)
        name_upper=$(echo $name | tr '[:lower:]' '[:upper:]')
        echo "$name_upper"
        # insert "export const $name_upper = () => (" at the beginning of the file
        sed -i "1s/^/export const $name_upper = () => (\n/" $i
        # insert ");" at the end of the file
        echo ");" >>$i
        # rename the file to .tsx
        mv $i $name.tsx
    done
}

function index() {
    echo "//" > index.ts
    for i in *.tsx; do
        name=$(echo $i | cut -d'.' -f1)
        if [ "$name" == "index" ]; then
            continue
        fi
        echo "export * from './$name';" >>index.ts
    done
}

case $action in
"svgTotsx")
    svgTotsx
    ;;
"index")
    index
    ;;
*)
    echo "Invalid action , please use svgTotsx or index"
    ;;
esac
