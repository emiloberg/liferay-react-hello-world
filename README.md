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