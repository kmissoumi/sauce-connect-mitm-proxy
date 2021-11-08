
# mitmproxy for Sauce Labs




Sauce Connect can route traffic through additional proxies. Both internal and external proxies are supported.

Use this guide to use [mitmproxy](https://mitmproxy.org/) for the Sauce Labs Real Device Cloud.


Guides already exist for
[Charles](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/additional-proxies/#charles-proxy-configuration) proxy
and [WonderProxy](https://wonderproxy.com/docs/devs/guides/globalize-your-testing-with-sauce).




#### Install & Configure

```sh
# install Sauce Connect proxy
brew install --cask sauce-connect

# install mitmproxy
brew install mitmproxy

# sync container image to latest
docker pull mitmproxy/mitmproxy

# set environment variables
SAUCE_USERNAME=
SAUCE_ACCESS_KEY=
```


##### Start mitmproxy and Sauce Connect


```
# open a separate terminal session
# mitmproxy with our certificates mounted
docker run --rm -it \
  -v ~/.mitmproxy:/home/mitmproxy/.mitmproxy \
  -p 8180:8080 \
  -p 8181:8081 \
  mitmproxy/mitmproxy \
  mitmdump --tcp-hosts '.*'

# update proxy.yml with absolute paths to pac and pem files.
# atom proxy.yml

# start sauce connect
sc --config-file proxy.yml
```

##### Start Live Device Session
```
# open chrome to the sauce labs dashboard
open -a 'Google Chrome' https://app.saucelabs.com/live/web-testing
```

  - select the tunnel from the _SAUCE CONNECT PROXY_ drop down menu
    - select a device and then the blue _Start Test_ button
  - open the device browser to `http://mitm.it`
    - download and then install the self signed certificate


##### Notes
[Sauce Connect Proxy Authentication ](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/#--pac-auth)  
[Sauce Connect CLI Reference](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/)  
[Sauce Connect API Methods](https://docs.saucelabs.com/dev/api/connect/)  
[Sauce Connect SSL Bumping](https://docs.saucelabs.com/secure-connections/sauce-connect/troubleshooting/#ssl-bumping)
