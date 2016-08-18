<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>

<div id="<portlet:namespace/>componentContainer"></div>

<liferay-util:html-bottom>
    <script>
    (function(){
        var initProps = {
            helloMsg: '${helloMsg}'
        };

        ReactDOM.render(React.createElement(window.reactComponents['monator-liferay-react-hello-world-portlet'].reactComponent, initProps),
                            document.getElementById('<portlet:namespace/>componentContainer'));
    })();
    </script>
</liferay-util:html-bottom>

