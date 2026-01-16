package com.mmx.pdf;

/**
 * Builder Pattern pour configurer la génération PDF (classe publique)
 */
public class PDFGeneratorBuilder {
    private boolean includeLogo = false;
    private boolean includeQRCode = false;
    private String footerText = "MMX Véhicules - Votre partenaire automobile";
    private String watermark = null;
    
    public PDFGeneratorBuilder withLogo(boolean includeLogo) {
        this.includeLogo = includeLogo;
        return this;
    }
    
    public PDFGeneratorBuilder withQRCode(boolean includeQRCode) {
        this.includeQRCode = includeQRCode;
        return this;
    }
    
    public PDFGeneratorBuilder withFooterText(String footerText) {
        this.footerText = footerText;
        return this;
    }
    
    public PDFGeneratorBuilder withWatermark(String watermark) {
        this.watermark = watermark;
        return this;
    }
    
    public InvoicePDFService build() {
        // Pour l'instant retourne l'adapteur PDFBox
        return new PDFBoxAdapter();
    }
}
