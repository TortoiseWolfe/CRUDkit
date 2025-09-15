#!/bin/bash

# Fix ownership of all files to match the current user
echo "Fixing file ownership..."

# Get current user and group
USER_ID=$(id -u)
GROUP_ID=$(id -g)

echo "Setting ownership to $USER_ID:$GROUP_ID"

# Fix ownership of created files
sudo chown -R $USER_ID:$GROUP_ID /home/turtle_wolfe/repos/000/src/app/privacy*
sudo chown -R $USER_ID:$GROUP_ID /home/turtle_wolfe/repos/000/src/app/cookies
sudo chown -R $USER_ID:$GROUP_ID /home/turtle_wolfe/repos/000/src/tests/*.tsx
sudo chown -R $USER_ID:$GROUP_ID /home/turtle_wolfe/repos/000/specs/007-cookie-consent/

echo "Ownership fixed! Now you can commit the changes."