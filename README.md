# Plutonium [vanilla-background-image-switch]
A vanilla JavaScript component that animates and switches a target background image when hovering elements / links.
   * Add to any existing element with a custom tag attribute
   * Child elements act as image switches when hovered
   * Target any container with your switch images (default is body)
   * Animate with custom CSS transition settings
   * Add custom CSS directly to the switch image attribute (perfect for WordPress / other CMS)
   * Custom CSS can style the container, switch links, and image elements
   * Specify optional default image and sticky properties
   * Images are preloaded by default


### Links

* [BG Image Switch Home](https://plutonium.dev/wp/libraries/vanilla-background-image-switch)
   * [Documentation](https://plutonium.dev/wp/libraries/vanilla-background-image-switch/documentation)
   * [API](https://plutonium.dev/wp/libraries/vanilla-background-image-switch/api)


### Bookmarks
* [Install](#install)
* [Import](#import)
   * [Module](#Module)
   * [CDN Script Tags](#CDN-Script-Tags)
* [Instantiate](#instantiate)
* [License](#license)


### <a id="install"></a>Install
```
> npm install @plutonium-js/vanilla-background-image-switch
```

**[:arrow_up_small:](#bookmarks)**	


### <a id="import" style="color:yellow;"></a>Import

* <a id="Module"></a>**Module**
   
   ES6...
   ```javascript
   import '@plutonium-js/vanilla-background-image-switch';
   ```
   CommonJS...
   ```javascript
   require('@plutonium-js/vanilla-background-image-switch');
   ```
    
* <a id="CDN-Script-Tags"></a>**CDN Script Tag**
   
    Add the component directly to a web page.
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@plutonium-js/vanilla-background-image-switch@1/dist/bundle.js"></script>
   ```
   
**[:arrow_up_small:](#bookmarks)**	


### <a id="instantiate"></a>Instantiate
To create a new background image switch instance add the <strong>data-pu-background-image-switch</strong> attribute with the components custom JSON settings to an element in your HTML...
```html
<div data-pu-background-image-switch='{
   "name":"myImageSwitch",
   "image":"assets/default.jpg",
   "target":{
      "querySelector":"body",
      "sticky":false
   },
   "animate":{
      "opacity":{"from":0, "to":1},
      "props":{
         "duration":"1s",
         "timing":"ease",
         "delay":".25s"
      }
   },
   "css":[
      ".pu-background-image-switch-comp {height:100%;color:white;font-size:4vmin;text-shadow:-1px -1px 10px #111,1px -1px 10px #111,-1px 1px 10px #111,1px 1px 10px #111;}",
      ".pu-background-image-switch-comp .link {display:inline-block;color:white;text-decoration:none;padding:10px 30px 10px 30px;cursor:pointer;border:solid 2px #666;background-color:#333;margin:20px;border-radius:5px;}",
      ".pu-background-image-switch-comp .link:hover {background-color:#999;}",
      ".pu-background-image-switch-image {background:no-repeat center/contain;pointer-events:none;z-index:-1;}",
      ".pu-background-image-switch-image-myImageSwitch {}",
      ".pu-background-image-switch-image-myImage1 {}"
   ]
}'>
   <a class="link" href="https://plutonium.dev" data-pu-link='{"name":"myImage1", "image":"assets/bg1.jpg"}'}">Link 1</a></br>
   <a class="link" href="https://plutonium.dev" data-pu-link='{"name":"myImage2", "image":"assets/bg2.jpg"}'}">Link 2</a></br>
   <a class="link" href="https://plutonium.dev" data-pu-link='{"name":"myImage3", "image":"assets/bg3.jpg"}'}">Link 3</a></br>
   <a class="link" href="https://plutonium.dev" data-pu-link='{"name":"myImage4", "image":"assets/bg4.jpg"}'}">Link 4</a>
</div>
```
The attribute data must be properly formatted JSON data with double quotes surrounding the key names as shown above.

Additional documentation covering the properties and API is available at...

   * [https://plutonium.dev/wp/libraries/vanilla-background-image-switch](https://plutonium.dev/wp/libraries/vanilla-background-image-switch)

**[:arrow_up_small:](#bookmarks)**	


### <a id="License"></a>License

Released under the [MIT license](LICENSE.md)

Author: Jesse Dalessio / [Plutonium.dev](https://plutonium.dev)

**[:arrow_up_small:](#bookmarks)**	