> This is custom web extension to reveal hidden elements of a web in order to resolve a pentesting challenge provided by shift3. [Challenge](https://github.com/Shift3/penetration-testing-challenge)

# Remove hidden class

This browser extension removes the "hidden" class from web elements

## Installation

### Chrome

1. Download or clone this repository to your computer.
2. Open the Chrome browser and navigate to chrome://extensions/.
3. Turn on "Developer mode" in the upper right corner.
4. Click on "Load unpacked" and select the folder containing the downloaded repository.
5. The extension should now be installed and will execute the script on each page load of the targeted website.

### Firefox

1. Download or clone this repository to your computer.
2. Open the Firefox browser and navigate to about:debugging#/runtime/this-firefox.
3. Click "Load Temporary Add-on" and select the manifest.json file in the downloaded repository.
4. The extension should now be installed and will execute the script on each page load of the targeted website.

Note that you may need to modify the manifest.json file to match your specific use case, such as changing the URL of the targeted website. Also, be sure to test the extension thoroughly before using it in a production environment.
