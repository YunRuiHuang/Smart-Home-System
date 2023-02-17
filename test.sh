#!/bin/bash
file="./testdata/"+$(date +%d-%b-%H-%M)
curl "192.168.1.188:3000/dataport/2" > "./testdata/"+$(date +%d-%b-%H-%M)
