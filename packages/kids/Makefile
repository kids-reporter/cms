P := "\\033[32m[+]\\033[0m"

help:
	@echo "$(P) make build-deps - build core, draft-editor and draft-renderer"

build-deps:
	@echo "$(P) build core, draft-editor and draft-renderer"
	@cd ../core; make build;
	@cd ../draft-editor; make build;
	@cd ../draft-renderer; make build;

.PHONY: build-deps
