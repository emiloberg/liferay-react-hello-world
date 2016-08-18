package com.monator.react;

import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.util.bridges.mvc.MVCPortlet;

import javax.portlet.PortletException;
import javax.portlet.PortletPreferences;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;

/**
 *
 */
public class ReactHelloWorld extends MVCPortlet {

    @Override
    public void doView(RenderRequest request, RenderResponse response)
        throws IOException, PortletException {

        PortletPreferences preferences = request.getPreferences();

        String helloMsg = preferences.getValue("helloMsg", "");
        request.setAttribute("helloMsg", helloMsg);

        super.doView(request, response);
    }
}
