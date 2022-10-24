
# mitmproxy for Sauce Labs




Use Sauce Connect Forward Proxy with additional proxies. Both internal and external proxies are supported.

This guide uses [mitmproxy](https://mitmproxy.org/).


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
export SAUCE_USERNAME=
export SAUCE_ACCESS_KEY=
```


##### Start mitmproxy and Sauce Connect


```
# open a separate terminal session
# mitmproxy with our certificates mounted
docker run --rm -it \
  -v ~/.mitmproxy:/home/mitmproxy/.mitmproxy \
  -p 8180:8080 \
  -p 3000:3000 \
  mitmproxy/mitmproxy \
  mitmweb --web-host 0.0.0.0 --web-port 3000


# start sauce connect
# 
# note the URI to a local pac file must be absolute
# please validate the path printed to screen is correct before executing the output
echo sc --config-file proxy.yml --pac file://${PWD}/proxy.pac
```

##### Start Live Device Session
```
# open chrome to local mitmweb
open -a 'Google Chrome' http://localhost:3000

# open chrome to the sauce labs dashboard
open -a 'Google Chrome' https://app.saucelabs.com/live/web-testing
```

  - select the tunnel from the _SAUCE CONNECT PROXY_ drop down menu
    - select a device and then the blue _Start Test_ button
  - open the device browser to `http://mitm.it`
    - download and then install the self-signed certificate


##### Notes
[Sauce Connect Proxy Authentication ](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/#--pac-auth)  
[Sauce Connect CLI Reference](https://docs.saucelabs.com/dev/cli/sauce-connect-proxy/)  
[Sauce Connect API Methods](https://docs.saucelabs.com/dev/api/connect/)  
[Sauce Connect SSL Bumping](https://docs.saucelabs.com/secure-connections/sauce-connect/troubleshooting/#ssl-bumping)  
[Proxy PAC Configuration Examples](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file)  