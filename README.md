# monator-liferay-react-hello-world

### Installation
```
# Make sure you've a somewhat new Node version
# Clone
# cd into /react
npm install
```

### Development mode
In Dev mode, Hot Module Replacement is active, when you update the source file the changes are instantaneously shown in the web browser. 

```
npm start
# open web browser to localhost:3000
```

### Build the portlet
Build webpack and then the portlet itself to generate a .war file

```
npm run build
```

### Gotchas
When building, the directory `portlet/src/main/webapp/static` is cleaned from all files named `gen.*` or `bundle.*`.

## The Portlet

### Changing `artifactId`

The `artifactId` (specified in the `pom.xml`) is used as a namespace for the React component. Therefor, when you change it, you also need to change the view which is rendering the component (`src/main/webapp/html/view.jsp`)

The artifactId is also used by Liferay asthe base URL for any files in the portlet. E.g: If you add an image to the project, it will be available at `server.com/my-artifact-id/static/gen.c9a5ddd9d2.jpg` 

Webpack reads the pom.xml and takes care of adding "/{artifactId}/static/" to all URLs automagically.

* To change the artifactId name (is `monator-liferay-react-hello-world-portlet`):
	* `pom.xml` change `<artifactId>`	
	* `src/main/webapp/html/view.jsp` change in `... window.reactComponents['monator-liferay-react-hello-world-portlet'].reactComponent ...`

### Changing the URLs (`friendly-url-mapping`)

The `friendly-url-mapping` is used to create URLs. As React is in charge of creating URLs we need to create something that Liferay understands.

Looking at an url such as this:

```
http://example.com/en_US/web/guest/react-example-page/-/hello-world/12345
```

The `http://example.com/en_US/web/guest/react-example-page` part is the URL to the actual page with the portlet on it. The `/-/hello-world/12345` says that portlet with `friendly-url-mapping` `hello-world` should be given the parameter `12345`.

Therefor we need to pass on the `friendly-url-mapping` to React. This is done automagically. Webpack reads `<friendly-url-mapping>` from `portlet/src/main/webapp/WEB-INF/liferay-portlet.xml` where you can change it.

### Other things which you might want to change

Nothing special at all, any portlet developer already know this.

* Change portlet class (is `ReactHelloWorld`)
	* `src/main/java/com/monator/react/ReactHelloWorld.java` change the file name itself
	* `src/main/java/com/monator/react/ReactHelloWorld.java` change `public class`
	* `src/main/webapp/WEB-INF/portlet.xml` change `portlet-class`

* Change the namespace:
	* Create folder(s) and move `src/main/java/com/monator/react/ReactHelloWorld.java` to the desired namespace
	* `src/main/webapp/WEB-INF/portlet.xml` change `<portlet-class>`
	* `src/main/java/com/monator/react/ReactHelloWorld.java` change `package com.monator.react`

* Change the portlet name (is `monator-liferay-react-hello-world`):
	*  `src/main/webapp/WEB-INF/portlet.xml` change `<portlet-name>`.
	*  `src/main/webapp/WEB-INF/liferay-portlet.xml` change `<portlet-name>` and `<css-class-wrapper>`
	*  `src/main/webapp/WEB-INF/liferay-display.xml` change `<portlet id="monator-liferay-react-hello-world" />`

* Change the portlet display name (is `Monator Liferay React Hello World`):
	* `src/main/webapp/WEB-INF/portlet.xml` change `<display-name>`, `<title>`, and `<short-title>`

* Change the portlet category (is `Monator`):
	*  `src/main/webapp/WEB-INF/liferay-display.xml` change `<category name="Monator">`

* Change the project name (is `Monator Liferay React Hello World Portlet`)
	* `pom.xml` change `<name>`

* Change the project groupId (is `com.monator.react`)
	* `pom.xml` change `<groupId>`

* Change liferay-plugin-package.properties (is `react-hello-world`)
	* `src/main/webapp/WEB-INF/liferay-plugin-package.properties` change `name` (and whatever else you want).

	
## React

### Hot Reload

This is using version `3.0.0-beta.2` of `react-hot-loader` to enable hot loading of stateless components ([read more on GitHub](https://github.com/gaearon/react-hot-boilerplate/pull/61)).

Currently, when using React router it will log an error in the developer console. There's [an open issue on this](https://github.com/reactjs/react-router/issues/2182). However, you can just disregard the error. Or even filter it away if you're running Chrome. Just add:

```
^((?!You cannot change <Router (routes|history)>).)+$
```

to the console log filter:

![Screenshot of Chrome Dev Tools](https://cloud.githubusercontent.com/assets/992008/17159866/8a4b36e0-5355-11e6-8a51-35f581d4d606.png)
