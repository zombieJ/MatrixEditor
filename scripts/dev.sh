#!/usr/bin/env bash

taskkill /f /im node.exe

if [ "$1" != "stop" ]; then
	npm run devSrv & npm run devApp
fi
