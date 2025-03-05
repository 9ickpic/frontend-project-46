install: deps-install
	npm install

deps-install:
	npm ci

lint:
	npx eslint .

hooks:
	npx simple-git-hooks

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npx jest --coverage --coverageProvider=v8


publish:
	npm publish

.PHONY: test install link deps-install
