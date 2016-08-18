<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>

<portlet:defineObjects />
<liferay-portlet:actionURL portletConfiguration="true" var="configurationURL" />

<%
String helloMsg = portletPreferences.getValue("helloMsg", "");
%>


<aui:form action="${configurationURL}" method="post" name="fm">
	<aui:input name="cmd" type="hidden" value="update" />
	<aui:input name="preferences--helloMsg--" type="text" value="<%= helloMsg %>" />
	<aui:button-row>
		<aui:button type="submit" />
	</aui:button-row>
</aui:form>