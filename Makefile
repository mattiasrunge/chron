SRC = index.js
DEPS := deps

all: test lint style compile

tests: test lint style

deps:
	npm set progress=false
	npm install

test: $(DEPS)
	./node_modules/.bin/mocha --reporter spec --ui tdd --recursive test

lint: $(DEPS)
	./node_modules/.bin/jshint --verbose $(SRC)

style: $(DEPS)
	./node_modules/.bin/jscs $(SRC)

compile: $(DEPS)
	mkdir -p browser
	./node_modules/.bin/babel index.js --plugins transform-es2015-modules-amd,babel-plugin-transform-es2015-arrow-functions,babel-plugin-transform-es2015-block-scoping --out-file browser/index.js

.PHONY: all deps test lint style compile
