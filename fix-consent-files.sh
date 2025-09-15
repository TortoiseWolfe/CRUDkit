#!/bin/bash

# Remove files created with root ownership
echo "Removing files created with root ownership..."
sudo rm -rf /home/turtle_wolfe/repos/000/src/app/cookies
sudo rm -rf /home/turtle_wolfe/repos/000/src/app/privacy
sudo rm -rf /home/turtle_wolfe/repos/000/src/app/privacy-controls
sudo rm -f /home/turtle_wolfe/repos/000/src/tests/consent-a11y.test.tsx
sudo rm -f /home/turtle_wolfe/repos/000/src/tests/consent-integration.test.tsx

echo "Files removed. Please run the script again to recreate them properly."