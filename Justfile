# 06_content-pipeline — Remotion renders

default:
    @just --list

# List registered compositions
compositions:
    npx ts-node scripts/render.ts --help

# Render one composition
render id:
    npx remotion render src/index.ts "{{id}}" "out/{{id}}.mp4"