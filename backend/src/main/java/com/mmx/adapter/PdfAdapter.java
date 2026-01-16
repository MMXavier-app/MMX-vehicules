package com.mmx.adapter;

public interface PdfAdapter {
    String genererPdf(String contenu);
    String lirePdf(String fichier);
}

class PdfLibrary {
    public String createPdfDocument(String content) {
        return "PDF créé avec contenu: " + content.substring(0, Math.min(50, content.length())) + "...";
    }
    
    public String readPdfFile(String filename) {
        return "Contenu PDF lu depuis: " + filename;
    }
}

class PdfAdapterImpl implements PdfAdapter {
    private PdfLibrary pdfLibrary;
    
    public PdfAdapterImpl() {
        this.pdfLibrary = new PdfLibrary();
    }
    
    @Override
    public String genererPdf(String contenu) {
        return pdfLibrary.createPdfDocument(contenu);
    }
    
    @Override
    public String lirePdf(String fichier) {
        return pdfLibrary.readPdfFile(fichier);
    }
}
