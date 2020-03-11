#!/bin/bash

# Bash file to generate csv files to populate the database with
# usage ./generate [(optional) # of users to generate] [(optional) # of campaigns per users to generate]
# TODO: Generate password hash

MAX_USERS=${1:-10}
MAX_CAMPAIGNS_PER_USER=${2:-10}

echo "Generating users.csv"
echo "Generating User 0"
# user_id(PK), username, hashed_password, description
echo "0,username0,hashedPassword,Name0,Description0" > ./users.csv

echo "Generating campaigns.csv"
echo "Generating Campaign 0"
# campaign_id(PK), user_id, name, description
echo "0,0,Name0,Description0" > ./campaigns.csv

for i in `seq $MAX_USERS`
do
  echo "Generating User ${i}"
  # user_id, username, hashed_password, description
  echo "${i},username${j},hashedPassword,Name${i},Description${i}" >> ./users.csv
  for j in `seq $MAX_CAMPAIGNS_PER_USER`
    do
      echo "Generating Campaign ${j}"
      # campaign_id, user_id, name, description
      echo "${i}${j},${i},${i}Name${j},Description${j}" >> ./campaigns.csv
    done
done

echo -e "\nDone\n\nPopulate database by importing generated csv files\n"