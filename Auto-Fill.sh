# /bin/bash

# Install brew
if ! command -v brew &> /dev/null
then
  echo 'Installing homebrew'
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
fi

# Install git
if ! command -v git &> /dev/null
then
  echo 'Installing git'
  brew install git
fi

# Install node
if ! command -v node &> /dev/null
then
  echo 'Installing node'
  brew install node
fi

# Install chromedriver
if ! command -v chromedriver &> /dev/null
then
  echo 'Installing chromedriver'
  brew install chromedriver
fi

# Upgrade to latest chromedriver
echo 'Updating chromedriver'
brew upgrade --cask chromedriver            

cd "`dirname $0`"

git pull

cd bin

npm i
node ./index.js