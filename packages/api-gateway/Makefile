P := "\\033[32m[+]\\033[0m"

help:
	@echo "$(P) make build - Transpile typescript files"

build-dist:
	@echo "$(P) Transpile typescript files"
	yarn tsc

dev-server:
	@echo "$(P) Start dev server"
	yarn tsc && NODE_ENV=development node dist/server

dev:
	yarn nodemon -e ts --exec make dev-server

start: build-dist
	@echo "$(P) Start production server"
	NODE_ENV=production node dist/server

build: clean build-dist

lint:
	@echo "$(p) Start linting"
	yarn eslint src --fix

clean:
	@echo "$(P) Clean dist/"
	rm -rf dist/

.PHONY: build clean build-dist
