package com.mmx.bridge;

public interface FormRenderer {
    String renderForm();
    String renderField(String name, String type);
}

class HtmlFormRenderer implements FormRenderer {
    @Override
    public String renderForm() {
        return "<form method='post'>";
    }
    
    @Override
    public String renderField(String name, String type) {
        return "<input type='" + type + "' name='" + name + "' />";
    }
}

class WidgetFormRenderer implements FormRenderer {
    @Override
    public String renderForm() {
        return "WidgetForm()";
    }
    
    @Override
    public String renderField(String name, String type) {
        return "WidgetField(name='" + name + "', type='" + type + "')";
    }
}

abstract class Form {
    protected FormRenderer renderer;
    
    public Form(FormRenderer renderer) {
        this.renderer = renderer;
    }
    
    public abstract String render();
}

class CommandeForm extends Form {
    public CommandeForm(FormRenderer renderer) {
        super(renderer);
    }
    
    @Override
    public String render() {
        StringBuilder sb = new StringBuilder();
        sb.append(renderer.renderForm());
        sb.append(renderer.renderField("client", "text"));
        sb.append(renderer.renderField("vehicule", "select"));
        sb.append(renderer.renderField("montant", "number"));
        sb.append("</form>" + (renderer instanceof HtmlFormRenderer ? "" : ""));
        return sb.toString();
    }
}
